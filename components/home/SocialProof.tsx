import AnimatedSection from "@/components/ui/AnimatedSection";
import restaurant from "@/config/restaurant.config";

interface SocialProofProps {
  locale: string;
  title: string;
  subtitle: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? "#C9A84C" : "#D8D2C8"}
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SourceLogo({ source }: { source: string }) {
  if (source === "google") {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#00AF87" aria-label="TripAdvisor">
      <circle cx="7" cy="12" r="4" fill="#00AF87"/>
      <circle cx="17" cy="12" r="4" fill="#00AF87"/>
      <circle cx="12" cy="8" r="2" fill="#00AF87"/>
    </svg>
  );
}

export default function SocialProof({ locale, title, subtitle }: SocialProofProps) {
  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl mb-4">{title}</h2>
          <div className="gold-divider mb-4" />
          <p className="text-[var(--color-muted)] text-sm">{subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurant.reviews.map((review, i) => {
            const text = locale === "ar" && review.textAr ? review.textAr : review.text;
            return (
              <AnimatedSection key={i} delay={i * 0.1} direction="up">
                <blockquote className="card-hover bg-white/80 backdrop-blur-sm p-7 h-full flex flex-col" style={{ boxShadow: "0 4px 20px rgba(28,28,28,0.06)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={review.rating} />
                    <SourceLogo source={review.source} />
                  </div>
                  <p className="text-sm text-[var(--color-text)] leading-relaxed flex-1 italic mb-5">
                    &ldquo;{text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "var(--color-accent)" }}
                      aria-hidden="true"
                    >
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-semibold">{review.author}</cite>
                      {review.date && (
                        <p className="text-xs text-[var(--color-muted)]">{review.date}</p>
                      )}
                    </div>
                  </footer>
                </blockquote>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
