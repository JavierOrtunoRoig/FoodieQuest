import { Place } from '@/types';
import styles from './CardPlace.module.css';

export default function CardPlace (props: Place) {
  const { name, address, thumbnail, url, placeFound } = props;

  const finalImage = placeFound ? thumbnail : 'https://api.dicebear.com/6.x/shapes/svg';

  return (
    <div className={styles.card}>
      <div className={styles['card-thumbnail']}>
        <img src={finalImage} alt={name}/>
      </div>
      <div className={styles['card-content']}>
        <h2 className={styles.title}>{name}</h2>
        <p>{address}</p>
        {
          placeFound
            ? <a href={url}>url</a>
            : <p>There was multiple places that match with this name in the desired city</p>
        }
      </div>
      <div className={`${styles.status} ${placeFound ? styles.checked : styles['not-checked']}`}>

      </div>
    </div>
  );
}
