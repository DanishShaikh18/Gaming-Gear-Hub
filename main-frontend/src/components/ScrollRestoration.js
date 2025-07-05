// src/components/ScrollRestoration.jsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map();

const ScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousKey = useRef(null);

  // Save scroll position before navigating away
  useEffect(() => {
    return () => {
      if (previousKey.current) {
        scrollPositions.set(previousKey.current, window.scrollY);
      }
    };
  }, []);

  useEffect(() => {
    previousKey.current = location.key;

    if (navigationType === "POP") {
      // Back/forward button
      const savedY = scrollPositions.get(location.key);
      if (savedY !== undefined) {
        window.scrollTo(0, savedY);
      }
    } else {
      // Normal navigation: scroll to top
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  return null;
};

export default ScrollRestoration;
