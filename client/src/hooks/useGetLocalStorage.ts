'use client';

import { useEffect, useState } from 'react';

export const useGetLocalStorage = <T>(key: string): T | T[] | null => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem(key);
    console.log('object');
    if (localStorageData) {
      setData(JSON.parse(localStorageData));
    }
  }, [key]);

  return data;
};
