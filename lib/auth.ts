import { supabaseAdmin } from './supabase-admin';

/**
 * Shared server-side authentication utilities.
 * Use these in API routes and server actions to verify callers.
 */

export interface AuthResult {
    authenticated: boolean;
    user?: any;
    role?: string;
    error?: string;
}

/**
 * Verify that the request has a valid Supabase session
 * and optionally check for admin/staff role.
 */
/**
 * Access token from `Authorization: Bearer`, the admin `sb-access-token`
 * cookie, or a Supabase `sb-*-auth-token` cookie.
 */
export function getAccessToken(request: Request): string | null {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7).trim() || null;

    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/(?:^|;\s*)sb-access-token=([^;]+)/);
    if (match) return decodeURIComponent(match[1].trim()) || null;

    const authCookie = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('sb-') && c.split('=')[0].endsWith('-auth-token'));
    if (!authCookie) return null;

    const decoded = decodeURIComponent(authCookie.split('=').slice(1).join('=').trim());
    try {
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed) && parsed[0]) return parsed[0];
        if (parsed?.access_token) return parsed.access_token;
        if (typeof parsed === 'string') return parsed;
    } catch {
        return decoded || null;
    }
    return null;
}

/**
 * Guard for staff-only API routes. Returns null when the caller is admin or
 * staff, otherwise the 401/403 response to send back.
 */
export async function requireStaff(request: Request): Promise<Response | null> {
    const auth = await verifyAuth(request, { requireAdmin: true });
    if (auth.authenticated) return null;
    const status = auth.error === 'Admin access required' ? 403 : 401;
    return Response.json({ error: auth.error || 'Unauthorized' }, { status });
}

export async function verifyAuth(
    request: Request,
    options: { requireAdmin?: boolean } = {}
): Promise<AuthResult> {
    const token = getAccessToken(request);

    if (!token) {
        return { authenticated: false, error: 'Missing authorization token' };
    }

    try {
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return { authenticated: false, error: 'Invalid or expired token' };
        }

        if (options.requireAdmin) {
            const { data: profile, error: profileError } = await supabaseAdmin
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileError || !profile) {
                return { authenticated: false, error: 'Could not verify user role' };
            }

            if (profile.role !== 'admin' && profile.role !== 'staff') {
                return { authenticated: false, error: 'Admin access required' };
            }

            return { authenticated: true, user, role: profile.role };
        }

        return { authenticated: true, user };
    } catch (err: any) {
        return { authenticated: false, error: err.message || 'Auth verification failed' };
    }
}

/**
 * Verify admin auth for server actions.
 * Requires passing the auth token from the client.
 */
export async function verifyAdminToken(token: string): Promise<AuthResult> {
    if (!token) {
        return { authenticated: false, error: 'Missing token' };
    }

    try {
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return { authenticated: false, error: 'Invalid or expired token' };
        }

        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return { authenticated: false, error: 'Could not verify role' };
        }

        if (profile.role !== 'admin' && profile.role !== 'staff') {
            return { authenticated: false, error: 'Admin access required' };
        }

        return { authenticated: true, user, role: profile.role };
    } catch (err: any) {
        return { authenticated: false, error: err.message || 'Auth failed' };
    }
}
