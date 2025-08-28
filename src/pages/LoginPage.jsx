import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

// Login background images
import bgLoginDesk1x from '../images/loginimg/bg-login-desk@1x.webp';
import bgLoginDesk2x from '../images/loginimg/bg-login-desk@2x.webp';
import bgLoginTab1x from '../images/loginimg/bg-login-tab@1x.webp';
import bgLoginTab2x from '../images/loginimg/bg-login-tab@2x.webp';

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      {/* Background Images */}
      <div className={styles.backgroundWrapper}>
        <picture>
          <source 
            media="(min-width: 1280px)" 
            srcSet={`${bgLoginDesk1x} 1x, ${bgLoginDesk2x} 2x`}
          />
          <source 
            media="(min-width: 768px)" 
            srcSet={`${bgLoginTab1x} 1x, ${bgLoginTab2x} 2x`}
          />
          <img 
            src={bgLoginDesk1x} 
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
