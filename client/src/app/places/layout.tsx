import styles from './layout.module.css';

export default function layout ({ children }: {children: React.ReactNode}) {
  return (
    <main className={styles.layout}>
      {children}
    </main>
  );
}
