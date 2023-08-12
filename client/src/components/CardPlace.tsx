import { Place } from '@/types';
import Status from './Status';
import styles from './CardPlace.module.css';

export default function CardPlace (props: Place) {
  const { name, address, thumbnail, url } = props;

  return (
    <div className={styles.card}>
      <div className={styles['card-thumbnail']}>
        <img src={thumbnail} alt={name}/>
      </div>
      <div className={styles['card-content']}>
        <h2 className={styles.title}>{name}</h2>
        <p>{address}</p>
        <a href={url} style={{ color: 'blue', textDecoration: 'underline' }}>Google URL</a>
      </div>
      <Status {...props}/>
    </div>
  );
}
