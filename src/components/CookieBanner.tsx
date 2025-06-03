"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg animate-slideUp">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {isArabic ? (
              <p>
                يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك. باستخدام
                موقعنا، فإنك توافق على استخدامنا لملفات تعريف الارتباط.
              </p>
            ) : (
              <p>
                This site uses cookies for a better experience. By using our
                site, you consent to our use of cookies.
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              {isArabic ? "موافق" : "Accept"}
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label={isArabic ? "إغلاق" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
