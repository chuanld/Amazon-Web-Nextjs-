import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export default function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            onLoadMore();
          }, 2000); // delay 1s để tránh load liên tục
        }
      },
      {
        rootMargin: "300px", // preload trước khi chạm đáy
      }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading, onLoadMore]);

  return observerRef;
}
