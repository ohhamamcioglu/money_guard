import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Balance from '../components/Balance';
import CurrencyTab from '../components/CurrencyTab';
import styles from './DashboardPage.module.css';

// Background images import
import backgroundMob from '../images/dashboardimg/background-mob.png';
import backgroundTab from '../images/dashboardimg/background-tab.png';
import backgroundDesk from '../images/dashboardimg/background-desk.png';

const DashboardPage = () => {
  return (
    <div className={styles.container}>
      {/* Responsive Background Images */}
      <div className={styles.backgroundWrapper}>
        <img 
          src={backgroundMob} 
          alt="Mobile Background" 
          className={`${styles.backgroundImage} ${styles.mobileBg}`}
        />
        <img 
          src={backgroundTab} 
          alt="Tablet Background" 
          className={`${styles.backgroundImage} ${styles.tabletBg}`}
        />
        <img 
          src={backgroundDesk} 
          alt="Desktop Background" 
          className={`${styles.backgroundImage} ${styles.desktopBg}`}
        />
      </div>

      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContainerTabAndBalance}>
            {/* Navigation Tabs */}
            <div className={styles.leftContainerTabs}>
              <Navigation />
            </div>
            
            {/* Balance Section */}
            <div className={styles.leftContainerBalance}>
              <Balance />
            </div>
            
            {/* Currency Section */}
            <div className={styles.leftContainerCurrency}>
              <CurrencyTab />
            </div>
          </div>
        </div>
        
        <div className={styles.rightContainer}>
          {/* Dynamic Content Area */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
