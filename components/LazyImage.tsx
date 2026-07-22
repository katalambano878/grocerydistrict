'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectFit?: 'cover' | 'contain';
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  sizes?: string;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  objectFit = 'contain',
  width,
  height,
  priority = false,
  onLoad,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    onLoad?.();
  };

  const resolvedSrc =
    !src || src.includes('via.placeholder.com')
      ? '/placeholder-product.svg'
      : src;

  const useNativeImg =
    resolvedSrc.startsWith('/storage/') ||
    resolvedSrc.startsWith('/placeholder') ||
    resolvedSrc.endsWith('.svg');

  if (!resolvedSrc || hasError) {
    return (
      <div className={`relative overflow-hidden bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-400 text-xs">No Image</span>
      </div>
    );
  }

  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
      )}
      {useNativeImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full ${fitClass} object-center transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={`${fitClass} object-center transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          quality={75}
          unoptimized={/^https?:\/\//.test(resolvedSrc)}
        />
      )}
    </div>
  );
}
