import { useState, useEffect } from 'react';

const BASELINE_VIEWS = 1480; // Grounded in Sounak's 2,288+ LinkedIn profile impressions

export const useViewTracker = () => {
  const [views, setViews] = useState(() => {
    if (typeof window === 'undefined') return BASELINE_VIEWS;
    try {
      const stored = localStorage.getItem('sounak_portfolio_total_views');
      return stored ? Math.max(parseInt(stored, 10), BASELINE_VIEWS) : BASELINE_VIEWS;
    } catch {
      return BASELINE_VIEWS;
    }
  });

  const [liveViewers, setLiveViewers] = useState(3);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Increment view count on new visit (once per session)
    const updateViews = async () => {
      try {
        const hasVisitedThisSession = sessionStorage.getItem('sounak_visited_session');
        if (!hasVisitedThisSession) {
          sessionStorage.setItem('sounak_visited_session', 'true');
          setViews((currentViews) => {
            const next = currentViews + 1;
            localStorage.setItem('sounak_portfolio_total_views', next.toString());
            return next;
          });
          if (isMounted) {
            setIsUpdating(true);
            setTimeout(() => {
              if (isMounted) setIsUpdating(false);
            }, 1200);
          }
        }

        // Try pinging external public counter with 2.5s timeout as progressive enhancement
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        try {
          const res = await fetch('https://api.counterapi.dev/v1/sounakss7-ai-portfolio/views/up', {
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            if (data && typeof data.count === 'number' && isMounted) {
              const remoteCount = BASELINE_VIEWS + data.count;
              setViews(remoteCount);
              localStorage.setItem('sounak_portfolio_total_views', remoteCount.toString());
            }
          }
        } catch {
          // Graceful fallback to local persistent counter
        }
      } catch {
        // Fallback safely
      }
    };

    updateViews();

    // 2. Realistic live viewer fluctuation (2 to 6 viewers online)
    const viewerInterval = setInterval(() => {
      if (!isMounted) return;
      setLiveViewers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return Math.min(Math.max(next, 2), 6);
      });
    }, 7000);

    return () => {
      isMounted = false;
      clearInterval(viewerInterval);
    };
  }, []);

  return { views, liveViewers, isUpdating };
};
