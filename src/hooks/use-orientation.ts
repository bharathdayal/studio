"use client";

import { useState, useEffect } from 'react';

export type Orientation = 'portrait-primary' | 'landscape-primary' | 'portrait-secondary' | 'landscape-secondary';

const getOrientation = (): Orientation | null => {
  if (typeof window !== 'undefined' && window.screen && window.screen.orientation) {
    return window.screen.orientation.type;
  }
  return null;
};

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  useEffect(() => {
    // Set initial orientation
    setOrientation(getOrientation());

    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    const orientationApi = window.screen?.orientation;
    if (orientationApi) {
      orientationApi.addEventListener('change', handleOrientationChange);
    }

    return () => {
      if (orientationApi) {
        orientationApi.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
}
