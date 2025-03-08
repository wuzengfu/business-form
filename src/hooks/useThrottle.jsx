import { useCallback, useRef } from 'react'

export default (callback, limit = 300) => {
  const lastCallRef = useRef(0);
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCallRef.current >= limit) {
      lastCallRef.current = now;
      callback(...args);
    }
  }, [callback, limit]);
};
