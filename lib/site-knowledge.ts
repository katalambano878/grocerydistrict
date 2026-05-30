/**
 * Site Knowledge Base — curated facts used by the AI chat assistant.
 */

export interface SiteKnowledgeEntry {
  id: string;
  title: string;
  path: string;
  category: string;
  content: string;
  keywords: string[];
}

export const SITE_KNOWLEDGE: SiteKnowledgeEntry[] = [
  {
    id: "business-overview",
    title: "About Grocery District",
    path: "/about",
    category: "company",
    content: `Grocery District is a supermarket and imported-goods retailer & wholesaler based in Ashongman Estate, Accra, Ghana.

We stock UK and USA groceries, baby groceries (baby food, formula and more), detergent and household products, and skincare.

We serve both wholesale and retail customers, and we offer delivery across Accra and nationwide in Ghana — or you can shop in-store.

Vision: To make trusted UK & USA groceries and everyday essentials easy to find in Accra, at fair prices.
Mission: To be Accra's go-to store for imported groceries, baby care, household and skincare — with genuine products, dependable delivery and friendly service.

Open 7 days a week. Monday–Saturday: 8:30am – 8:00pm.`,
    keywords: ["grocery district", "supermarket", "uk groceries", "usa groceries", "imported", "baby food", "formula", "household", "detergent", "skincare", "wholesale", "retail", "about", "accra", "ghana"],
  },
  {
    id: "contact-info",
    title: "Contact Information",
    path: "/contact",
    category: "contact",
    content: `Contact Grocery District:

Phone/WhatsApp: +233 55 297 1577
Email: hello@grocerydistrict.shop
Instagram: @grocery_district1
TikTok: @grocery_district
Snapchat: sheisprecious15
Address: Ashongman Estate, Accra, Ghana
Hours: Open 7 days a week — Monday to Saturday, 8:30am - 8:00pm`,
    keywords: ["contact", "phone", "whatsapp", "email", "address", "support", "0552971577", "+233552971577", "accra", "ghana", "instagram", "tiktok", "snapchat", "grocery district", "hours"],
  },
  {
    id: "shipping-policy",
    title: "Shipping & Delivery Policy",
    path: "/shipping",
    category: "shipping",
    content: `Grocery District delivers from Ashongman Estate, Accra across Accra and nationwide in Ghana. In-store pickup is also available.

Delivery fees and timelines depend on your location and are shown at checkout.

Customers receive order updates and can track orders using order number and email.`,
    keywords: ["shipping", "delivery", "accra", "ghana", "nationwide", "pickup", "timeline", "tracking", "grocery district"],
  },
  {
    id: "returns-policy",
    title: "Returns & Refunds Policy",
    path: "/returns",
    category: "returns",
    content: `Returns are accepted for eligible unused items in original condition within 30 days of delivery.

Custom or altered items may not be returnable unless there is a quality issue.

Refunds are processed after item inspection.`,
    keywords: ["returns", "refund", "exchange", "worn", "condition", "30 days"],
  },
  {
    id: "payment-methods",
    title: "Payment Methods",
    path: "/checkout",
    category: "payment",
    content: `Secure payments are processed by Paystack. Customers can pay with debit/credit cards (Visa, Mastercard), bank transfer, mobile money, or USSD at checkout.

Cash on Delivery is available for eligible orders within Accra.
Prices and accepted payment methods are confirmed at checkout.`,
    keywords: ["payment", "paystack", "card", "bank transfer", "ussd", "momo", "mobile money", "checkout", "secure", "accra", "ghana"],
  },
  {
    id: "order-tracking-guide",
    title: "How to Track Your Order",
    path: "/order-tracking",
    category: "orders",
    content: `To track an order, go to /order-tracking and provide your order number and email address.

Typical status flow:
Order Placed -> Payment -> Processing -> Packaged -> Dispatched -> Delivered.`,
    keywords: ["track", "order", "status", "order number", "email", "dispatched"],
  },
  {
    id: "faq-summary",
    title: "Frequently Asked Questions",
    path: "/faqs",
    category: "faq",
    content: `FAQs cover orders, shipping, returns, payment, and account support.

Customers can contact support via WhatsApp, email, or support ticket for unresolved issues.`,
    keywords: ["faq", "questions", "support", "orders", "shipping", "returns"],
  },
  {
    id: "legal-summary",
    title: "Privacy & Terms",
    path: "/privacy",
    category: "legal",
    content: `Privacy Policy and Terms explain data handling, order conditions, returns, and user responsibilities.

For legal questions, contact hello@grocerydistrict.shop.`,
    keywords: ["privacy", "terms", "legal", "data", "policy"],
  },
  {
    id: "checkout-guide",
    title: "Checkout Process",
    path: "/checkout",
    category: "shopping",
    content: `Checkout steps:
1. Add products to cart
2. Enter shipping details
3. Choose delivery method
4. Complete payment
5. Receive confirmation and tracking updates`,
    keywords: ["checkout", "cart", "payment", "delivery", "order"],
  },
];

/**
 * Search the site knowledge base for relevant entries
 */
export function searchSiteKnowledge(query: string, maxResults = 3): SiteKnowledgeEntry[] {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 2);

  const scored = SITE_KNOWLEDGE.map(entry => {
    let score = 0;

    // Exact keyword matches (highest priority)
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score += 10;
      for (const word of words) {
        if (kw.includes(word) || word.includes(kw)) score += 3;
      }
    }

    // Title match
    if (entry.title.toLowerCase().includes(lower)) score += 15;
    for (const word of words) {
      if (entry.title.toLowerCase().includes(word)) score += 5;
    }

    // Content match
    const contentLower = entry.content.toLowerCase();
    for (const word of words) {
      if (contentLower.includes(word)) score += 2;
    }

    // Boost FAQ entries slightly (they cover common questions)
    if (entry.category === 'faq') score += 1;

    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(s => s.entry);
}

/**
 * Get all knowledge entries for a specific category
 */
export function getKnowledgeByCategory(category: string): SiteKnowledgeEntry[] {
  return SITE_KNOWLEDGE.filter(e => e.category === category);
}

/**
 * Build a condensed site map for the system prompt
 */
export function getSiteMapSummary(): string {
  return `WEBSITE PAGES (you can reference these to help customers navigate):
- / — Homepage with featured products, categories, and store info
- /shop — Browse all products with filters (category, price, rating, sort)
- /categories — Shop by category
- /product/[slug] — Individual product pages with details, reviews, variants
- /cart — Shopping cart with coupon support
- /checkout — Checkout flow (shipping → delivery → payment)
- /order-tracking — Track orders by order number + email
- /returns — Start a return request (30-day policy)
- /account — Profile, order history, addresses, security settings
- /wishlist — Saved products
- /about — Grocery District story and mission
- /contact — Phone numbers, email, WhatsApp, visit info
- /faqs — 25+ frequently asked questions
- /help — Help center with 50+ articles across 6 categories
- /blog — Shopping tips, product guides, and grocery insights
- /shipping — Detailed shipping & delivery policy
- /privacy — Privacy policy
- /terms — Terms & conditions
- /support/ticket — Create a support ticket
- /support/tickets — View your tickets
- /auth/login — Sign in
- /auth/signup — Create account
- /auth/forgot-password — Reset password`;
}
