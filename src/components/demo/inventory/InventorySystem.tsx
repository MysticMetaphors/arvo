"use client"

import { useState } from "react";
import { DeviceMode } from "@/app/demo/inventory/page";
import { DashboardCharts } from "./DashboardCharts";
import { BranchTable, CustomerTable, KanbanBoard, ProductTable, UserTable } from "./ManagementTables";
import { BrandingSettings, CampaignManager, CustomGenericPage, PayrollSystem, PosSystem, ReportGenerator, SecurityHub } from "./FeatureModules";

export type ViewState = 'login' | 'dashboard' | 'inventory' | 'pos' | 'crm' | 'payroll' | 'kanban' | 'marketing' | 'security' | 'users' | 'reports' | 'branches' | 'branding' | 'custom1' | 'custom2';

export default function InventorySystem({ deviceMode }: { deviceMode: DeviceMode }) {
  const [view, setView] = useState<ViewState>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Auth State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const isMobile = deviceMode === 'mobile';
  const isTablet = deviceMode === 'tablet';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'demo123') {
       setView('dashboard');
       setAuthError('');
    } else {
       setAuthError('Invalid credentials. Hint: Check the demo box.');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard': return <DashboardCharts deviceMode={deviceMode} />;
      case 'inventory': return <ProductTable isMobile={isMobile} />;
      case 'branches': return <BranchTable isMobile={isMobile} />;
      case 'users': return <UserTable isMobile={isMobile} />;
      case 'reports': return <ReportGenerator />;
      case 'crm': return <CustomerTable isMobile={isMobile} />;
      case 'kanban': return <KanbanBoard isMobile={isMobile} />;
      case 'payroll': return <PayrollSystem isMobile={isMobile} />;
      case 'pos': return <PosSystem isMobile={isMobile} />;
      case 'marketing': return <CampaignManager isMobile={isMobile} />;
      case 'security': return <SecurityHub isMobile={isMobile} />;
      case 'branding': return <BrandingSettings />;
      case 'custom1': return <CustomGenericPage title="Vendor Portal" />;
      case 'custom2': return <CustomGenericPage title="Audit History" />;
      default: return <DashboardCharts deviceMode={deviceMode} />;
    }
  };

  const NavItem = ({ id, icon, label }: { id: ViewState, icon: string, label: string }) => (
    <button 
      onClick={() => { setView(id); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${view === id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      <i className={`fa-solid ${icon} w-5 text-center`}></i>
      {(!isTablet || isMobile) && <span>{label}</span>}
    </button>
  );

  if (view === 'login') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 pattern-grid-lg text-slate-800 relative">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-cubes-stacked"></i>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Nexus Inventory</h1>
            <p className="text-slate-500 text-sm">Enterprise Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter username" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter password" 
              />
            </div>
            
            {authError && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{authError}</p>}
            
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
            <p className="text-xs font-bold text-blue-800 uppercase mb-1">Demo Credentials</p>
            <p className="text-sm text-blue-600">User: <span className="font-mono font-bold">admin</span> &nbsp;|&nbsp; Pass: <span className="font-mono font-bold">demo123</span></p>
          </div>
        </div>
        <p className="mt-8 text-slate-400 text-xs">© 2026 Nexus Systems Inc. Secure Login.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full text-slate-800 bg-slate-50 relative">
      
      {/* SIDEBAR (Desktop/Tablet) */}
      {!isMobile && (
        <aside className={`${isTablet ? 'w-20' : 'w-64'} bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-all duration-300 border-r border-slate-800`}>
          <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800 h-16">
             <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center shrink-0"><i className="fa-solid fa-cube"></i></div>
             {!isTablet && <span className="font-bold text-lg tracking-tight">Nexus</span>}
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {!isTablet && <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 mt-2">Main</p>}
            <NavItem id="dashboard" icon="fa-chart-pie" label="Dashboard" />
            <NavItem id="pos" icon="fa-cash-register" label="POS System" />
            <NavItem id="kanban" icon="fa-list-check" label="Tasks" />
            
            {!isTablet && <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 mt-6">Management</p>}
            <NavItem id="inventory" icon="fa-boxes-stacked" label="Inventory" />
            <NavItem id="branches" icon="fa-building" label="Branches" />
            <NavItem id="crm" icon="fa-users" label="CRM" />
            <NavItem id="payroll" icon="fa-money-bill-wave" label="Payroll" />
            
            {!isTablet && <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 mt-6">Admin</p>}
            <NavItem id="users" icon="fa-users-gear" label="Admin Users" />
            <NavItem id="reports" icon="fa-file-invoice" label="Reports" />
            <NavItem id="marketing" icon="fa-bullhorn" label="Marketing" />
            <NavItem id="security" icon="fa-shield-halved" label="Security" />
            <NavItem id="branding" icon="fa-palette" label="Branding" />

            {!isTablet && <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 mt-6">Custom</p>}
            <NavItem id="custom1" icon="fa-plug" label="Vendors" />
            <NavItem id="custom2" icon="fa-file-contract" label="Audits" />
          </nav>

          <div className="p-4 border-t border-slate-800">
             <button onClick={() => setView('login')} className="flex items-center gap-3 text-sm text-red-400 hover:text-red-300 px-3 py-2 w-full rounded hover:bg-slate-800 transition-colors">
                <i className="fa-solid fa-right-from-bracket w-5 text-center"></i> {!isTablet && "Logout"}
             </button>
          </div>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* Header */}
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0 z-10">
          <div className="flex items-center gap-4">
             {isMobile && (
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 text-xl">
                 <i className="fa-solid fa-bars"></i>
               </button>
             )}
             <h2 className="text-xl font-bold capitalize text-slate-800">{view.replace('_', ' ')}</h2>
          </div>
          
          {/* Global Command/Search (Desktop) */}
          {!isMobile && (
            <div className="flex-1 max-w-md mx-6 relative hidden md:block">
               <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
               <input type="text" placeholder="Search system..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fa-solid fa-bell text-lg"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
               <div className="text-right hidden md:block">
                 <div className="text-sm font-bold">Admin User</div>
                 <div className="text-xs text-slate-500">Super Admin</div>
               </div>
               <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500"><i className="fa-solid fa-user"></i></div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {renderContent()}
        </div>

        {/* MOBILE OVERLAY MENU */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute inset-0 bg-slate-900 z-50 flex flex-col animate-in slide-in-from-left duration-200">
             <div className="p-4 flex justify-between items-center border-b border-slate-800">
                <span className="font-bold text-white text-lg">Nexus Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
             </div>
             <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                <NavItem id="dashboard" icon="fa-chart-pie" label="Dashboard" />
                <NavItem id="pos" icon="fa-cash-register" label="Point of Sale" />
                <NavItem id="inventory" icon="fa-boxes-stacked" label="Inventory" />
                <NavItem id="branches" icon="fa-building" label="Branches" />
                <NavItem id="users" icon="fa-users-gear" label="Admin Users" />
                <NavItem id="crm" icon="fa-users" label="CRM" />
                <NavItem id="payroll" icon="fa-money-bill-wave" label="Payroll" />
                <NavItem id="marketing" icon="fa-bullhorn" label="Marketing" />
                <button onClick={() => setView('login')} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-red-400 bg-slate-800 mt-4">
                  <i className="fa-solid fa-right-from-bracket w-5 text-center"></i> Logout
                </button>
             </nav>
          </div>
        )}
      </div>
    </div>
  );
}