import { useState, useEffect } from "react";

const options = {
  threshold: 1.0,
//   rootMargin: "-80px",
};

const useOnScreen = (ref: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref instanceof HTMLElement ? ref : ref?.current;

    if (!element) return;

    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      console.log(
        "OBSERVER TRIGGERED",
        process.env.NODE_ENV,
        entry.target,
        entry.isIntersecting
      );
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isVisible;
};

export default useOnScreen;