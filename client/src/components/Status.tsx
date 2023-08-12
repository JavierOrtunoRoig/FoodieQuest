'use client';

import { useRef } from 'react';
import styles from './Status.module.css';
import { Place } from '@/types';

function Status (props: Place) {
  const place: Place = { ...props };
  const statusRef = useRef<HTMLDivElement>(null);
  const status = `${styles.status} ${place.visited && styles.checked}`;

  const handleChangeStatus = () => {
    statusRef.current?.classList.toggle(styles.checked);
    place.visited = !place.visited;
    const allPlaces = (JSON.parse(localStorage.getItem('places') || '[]') as Place[]);
    allPlaces.forEach((p, i) => {
      if (p.name === place.name) {
        allPlaces[i] = place;
      }
    });
    localStorage.setItem('places', JSON.stringify(allPlaces));
  };
  return (
    <div ref={statusRef} className={status} onDoubleClick={handleChangeStatus}></div>
  );
}

export default Status;
