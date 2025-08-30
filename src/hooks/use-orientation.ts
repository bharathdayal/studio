
"use client";

import { useState, useEffect } from 'react';

export type Orientation = 'portrait-primary' | 'landscape-primary' | 'portrait-secondary' | 'landscape-secondary';

const getOrientationType = (): Orientation | null => {
  if (typeof window === 'undefined' || !window.screen || !window.screen.orientation) {
    // Fallback for server-side rendering or older browsers
    return null; 
  }
  return window.screen.orientation.type;
};

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    const getOrientation = (): Orientation => {
        if (window.screen?.orientation?.type) {
            return window.screen.orientation.type;
        }
        // Fallback for browsers that don't support screen.orientation.type
        return window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary';
    }

    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };
    
    handleOrientationChange(); // Set initial orientation

    const orientationApi = window.screen?.orientation;
    if (orientationApi && 'addEventListener' in orientationApi) {
      orientationApi.addEventListener('change', handleOrientationChange);
    } else {
      // Fallback for older devices
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);
    }

    return () => {
      if (orientationApi && 'removeEventListener' in orientationApi) {
        orientationApi.removeEventListener('change', handleOrientationChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('resize', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
}
