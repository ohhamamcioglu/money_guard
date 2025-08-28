import React, { useState } from 'react';
import GlassCard from '../components/DesignSystem/GlassCard';
import MenuDropdown from '../components/DesignSystem/MenuDropdown';
import LogoutConfirmModal from '../components/DesignSystem/LogoutConfirmModal';
import PrimaryButton from '../components/DesignSystem/PrimaryButton';

const Sidebar = () => (
  <div style={{width: 220}}>
    <div className="glass-card" style={{padding: 12, marginBottom: 12}}>
      <nav style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <a className="glass-card" style={{padding:10}}>Home</a>
        <a style={{padding:10}}>Statistics</a>
      </nav>
    </div>
  </div>
);

const DonutPanel = () => (
  <div className="glass-card" style={{padding: 18, width: 320}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 12}}>
      <div style={{fontWeight:700}}>Spending</div>
      <div>
        <MenuDropdown items={[{label:'June 2025', value:'2025-06'},{label:'May 2025', value:'2025-05'}]} selected={'2025-06'} />
      </div>
    </div>
    <div style={{height:160, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)'}}>Donut chart placeholder</div>
  </div>
);

const TransactionsTable = () => (
  <div className="glass-card" style={{padding: 12}}>
    <table style={{width:'100%', color:'var(--muted)'}}>
      <thead>
        <tr style={{textAlign:'left'}}>
          <th>Date</th><th>Type</th><th>Category</th><th>Comment</th><th style={{textAlign:'right'}}>Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-06-20</td>
          <td>Income</td>
          <td>Salary</td>
          <td>June salary</td>
          <td style={{textAlign:'right', color:'var(--income)'}}>+ 5,000</td>
        </tr>
        <tr>
          <td>2025-06-21</td>
          <td>Expense</td>
          <td>Food</td>
          <td>Groceries</td>
          <td style={{textAlign:'right', color:'var(--expense)'}}>- 120</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function DSDashboardExample(){
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <div style={{display:'flex', gap: 18, padding: 24}}>
      <Sidebar />

      <div style={{flex:1, display:'flex', flexDirection:'column', gap: 18}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{color:'var(--text)', fontFamily:'var(--heading-family)'}}>Dashboard</h2>
          <div style={{display:'flex', gap:12}}>
            <PrimaryButton onClick={()=>setOpenLogout(true)}>Logout</PrimaryButton>
          </div>
        </div>

        <div style={{display:'flex', gap: 18}}>
          <DonutPanel />
          <div style={{flex:1}}>
            <TransactionsTable />
          </div>
        </div>
      </div>

      <LogoutConfirmModal open={openLogout} onClose={()=>setOpenLogout(false)} onConfirm={()=>{
        setOpenLogout(false);
        // placeholder for logout
      }} />
    </div>
  );
}
