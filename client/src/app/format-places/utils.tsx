import { SetStateAction } from 'react';

export const fetchPlaces = (city: string, places: string, setIsLoading: (value: SetStateAction<boolean>) => void) => {
  setIsLoading(true);
  fetch('http://localhost:4000/api/places', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city, places })
  })
    .then(res => res.json())
    .then(res => {
      setIsLoading(false);
      localStorage.setItem('places', JSON.stringify(res));
    });
};
