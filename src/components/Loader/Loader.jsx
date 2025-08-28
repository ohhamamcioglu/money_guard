import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
