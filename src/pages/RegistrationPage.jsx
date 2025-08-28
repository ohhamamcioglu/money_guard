import RegistrationForm from '../components/RegistrationForm';
import styles from './RegistrationPage.module.css';

// Registration background images
import bgRegisterDesk1x from '../images/registerimg/bg-register-desk@1x.webp';
import bgRegisterDesk2x from '../images/registerimg/bg-register-desk@2x.webp';
import bgRegisterTab1x from '../images/registerimg/bg-register-tab@1x.webp';
import bgRegisterTab2x from '../images/registerimg/bg-register-tab@2x.webp';

const RegistrationPage = () => {
  return (
    <div className={styles.registrationPage}>
      {/* Background Images */}
      <div className={styles.backgroundWrapper}>
        <picture>
          <source 
            media="(min-width: 1280px)" 
            srcSet={`${bgRegisterDesk1x} 1x, ${bgRegisterDesk2x} 2x`}
          />
          <source 
            media="(min-width: 768px)" 
            srcSet={`${bgRegisterTab1x} 1x, ${bgRegisterTab2x} 2x`}
          />
          <img 
            src={bgRegisterDesk1x} 
            alt="Background" 
            className={styles.backgroundImage}
          />
        </picture>
      </div>

      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>Money Guard</h1>
          <p className={styles.tagline}>Take good care of your finances</p>
        </div>
        <div className={styles.formSection}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
