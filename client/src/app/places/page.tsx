'use client';

import CardPlace from '@/components/CardPlace';
import { useGetLocalStorage } from '@/hooks/useGetLocalStorage';
import { Place } from '@/types';
import React from 'react';

export default function Places () {
  const places = useGetLocalStorage<Place[]>('places') as Place[];

  return (
    <>
      {
        places.map((place: Place, index: number) => (
          <CardPlace
            key={index}
            {...place}
          />
        ))
      }
    </>
  );
}
