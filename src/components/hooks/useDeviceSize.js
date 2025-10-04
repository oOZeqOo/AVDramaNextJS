'use client';

import { useState, useEffect } from 'react';

export default function useDeviceSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    window.innerWidth !== width && setWidth(window.innerWidth);
    window.innerHeight !== height && setHeight(window.innerHeight);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  return [width, height];
}
