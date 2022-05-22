import { useEffect, useRef } from 'react';

export const useClickOutsideToClose = (onClick: any) => {
  const areaRef = useRef<any>(null);
  useEffect(() => {
    const handler = (event: any) => {
      if (areaRef?.current && !areaRef?.current?.contains(event.target)) {
        onClick();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, [onClick]);

  return areaRef;
};
