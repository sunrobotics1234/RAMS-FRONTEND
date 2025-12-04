import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export const LazyImage = ({ src, alt, className = "", loading = "lazy" }: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === "eager") {
      setImageSrc(src);
      return;
    }

    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src, loading]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      onLoad={() => setIsLoaded(true)}
      loading={loading}
    />
  );
};
