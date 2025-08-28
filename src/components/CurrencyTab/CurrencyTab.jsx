import { useState, useEffect } from 'react';
import styles from './CurrencyTab.module.css';

const CurrencyTab = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Demo data yükleme simülasyonu
    const loadCurrencies = async () => {
      setIsLoading(true);
      
      // Demo currency data
      const demoCurrencies = [
        { currency: 'USD', sale: '39.90', purchase: '39.40' },
        { currency: 'EUR', sale: '42.30', purchase: '41.50' },
        { currency: 'GBP', sale: '48.20', purchase: '47.80' },
        { currency: 'JPY', sale: '0.26', purchase: '0.24' },
        { currency: 'CHF', sale: '43.50', purchase: '42.90' },
      ];
      
      // Gerçek API çağrısı buraya gelecek
      setTimeout(() => {
        setCurrencies(demoCurrencies);
        setIsLoading(false);
      }, 1000);
    };

    loadCurrencies();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Currency</h2>
        <div className={styles.loading}>Loading currencies...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Currency</h2>
      <div className={styles.currencyTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Currency</div>
          <div className={styles.headerCell}>Purchase</div>
          <div className={styles.headerCell}>Sale</div>
        </div>
        
        {currencies.map((currency, index) => (
          <div key={index} className={styles.currencyRow}>
            <div className={styles.currencyCell}>
              <span className={styles.currencyCode}>{currency.currency}</span>
            </div>
            <div className={styles.currencyCell}>
              <span className={styles.rate}>{currency.purchase}</span>
            </div>
            <div className={styles.currencyCell}>
              <span className={styles.rate}>{currency.sale}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.disclaimer}>
        <p>*Currency rates are updated every hour</p>
      </div>
    </div>
  );
};

export default CurrencyTab;
