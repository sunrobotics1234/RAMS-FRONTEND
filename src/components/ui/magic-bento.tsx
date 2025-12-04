import React, { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';

interface MagicBentoCardProps {
  children: ReactNode;
  className?: string;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

export const MagicBentoCard: React.FC<MagicBentoCardProps> = ({
  children,
  className = '',
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = 300,
  particleCount = 12,
  enableTilt = false,
  glowColor = '180, 100%, 50%',
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);
  const [isInView, setIsInView] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shouldAnimate = !disableAnimations && !isMobile && isInView;

  // Intersection Observer for lazy animation
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldAnimate || !enableStars) return;

    const newParticles = Array.from({ length: Math.min(particleCount, 6) }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [shouldAnimate, enableStars, particleCount]);

  useEffect(() => {
    if (!shouldAnimate || !cardRef.current) return;

    const card = cardRef.current;
    const content = contentRef.current;
    const spotlight = spotlightRef.current;
    const border = borderRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight effect
      if (enableSpotlight && spotlight) {
        gsap.to(spotlight, {
          x: x - spotlightRadius / 2,
          y: y - spotlightRadius / 2,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Border glow effect
      if (enableBorderGlow && border) {
        gsap.to(border, {
          '--x': `${x}px`,
          '--y': `${y}px`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Magnetism effect
      if (enableMagnetism && content) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        gsap.to(content, {
          x: deltaX * 10,
          y: deltaY * 10,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      // Tilt effect
      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseEnter = () => {
      if (textAutoHide && content) {
        gsap.to(content.querySelector('.magic-bento-text'), {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (textAutoHide && content) {
        gsap.to(content.querySelector('.magic-bento-text'), {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (enableMagnetism && content) {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      if (enableTilt) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.className = 'magic-bento-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      card.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.8 },
        {
          scale: 4,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);
    };
  }, [
    shouldAnimate,
    textAutoHide,
    enableSpotlight,
    enableBorderGlow,
    enableMagnetism,
    enableTilt,
    clickEffect,
    spotlightRadius,
  ]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card relative overflow-hidden rounded-[2rem] bg-card/40 backdrop-blur-md border border-border/30 shadow-xl ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Spotlight Effect */}
      {shouldAnimate && enableSpotlight && (
        <div
          ref={spotlightRef}
          className="magic-bento-spotlight absolute pointer-events-none rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            width: `${spotlightRadius}px`,
            height: `${spotlightRadius}px`,
            background: `radial-gradient(circle, hsl(${glowColor} / 0.15), transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Border Glow Effect */}
      {shouldAnimate && enableBorderGlow && (
        <div
          ref={borderRef}
          className="magic-bento-border absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), hsl(${glowColor} / 0.3), transparent 50%)`,
          }}
        />
      )}

      {/* Stars Effect */}
      {shouldAnimate && enableStars && (
        <div ref={starsRef} className="magic-bento-stars absolute inset-0 pointer-events-none">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div ref={contentRef} className="relative z-10 p-6">
        {children}
      </div>

      <style>{`
        .magic-bento-ripple {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(${glowColor} / 0.5), transparent);
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};
