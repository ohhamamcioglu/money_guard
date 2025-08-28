import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, DollarSign } from 'lucide-react';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const tabs = [
    {
      id: 'home',
      path: '/dashboard',
      icon: Home,
      label: 'Home'
    },
    {
      id: 'statistics',
      path: '/statistics',
      icon: BarChart3,
      label: 'Statistics'
    },
    {
      id: 'currency',
      path: '/currency',
      icon: DollarSign,
      label: 'Currency'
    }
  ];

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.path;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
          >
            <Icon size={24} className={styles.tabIcon} />
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
