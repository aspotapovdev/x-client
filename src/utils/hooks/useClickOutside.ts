import { useEffect, MutableRefObject } from 'react';

export const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
