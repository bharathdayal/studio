
"use client";

import { useState, useEffect } from 'react';

export type Orientation = 'portrait-primary' | 'landscape-primary' | 'portrait-secondary' | 'landscape-secondary';

const getOrientation = (): Orientation | null => {
  if (typeof window !== 'undefined') {
    if (window.screen?.orientation?.type) {
      return window.screen.orientation.type;
    }
    // Fallback for browsers that don't support screen.orientation.type
    return window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary';
  }
  return null;
};

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };
    
    // Set initial orientation
    handleOrientationChange();

    const orientationApi = window.screen?.orientation;
    if (orientationApi) {
      orientationApi.addEventListener('change', handleOrientationChange);
    } else {
      // Fallback for browsers that don't support the 'change' event
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);
    }

    return () => {
      if (orientationApi) {
        orientationApi.removeEventListener('change', handleOrientationChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('resize', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
}
