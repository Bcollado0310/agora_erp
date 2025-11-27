
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { RevenueChart } from './components/RevenueChart';
import { LeadSourceChart } from './components/LeadSourceChart';
import { InventoryTable } from './components/SubscribersTable';
import { SalesPage } from './components/SalesPage';
import { InventoryPage } from './components/InventoryPage';
import { SuppliersPage } from './components/SuppliersPage';
import { PurchasesPage } from './components/PurchasesPage';
import { SettingsPage } from './components/SettingsPage';
import { HelpCenterPage } from './components/HelpCenterPage';
import { Search, Plus, Share, Banknote, Package, AlertCircle, Clock } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderDashboard = () => (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
            <div className="p-1 rounded-lg hover:bg-dark-800 cursor-pointer lg:hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-[1px]"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-[1px]"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-[1px]"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-[1px]"></div>
              </div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                  type="text" 
                  placeholder="Search Anything..." 
                  className="w-full bg-dark-900 border border-dark-800 text-white pl-10 pr-12 py-2.5 rounded-lg text-sm focus:outline-none focus:border-dark-700 placeholder:text-zinc-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 border border-dark-700 px-1.5 py-0.5 rounded bg-dark-800 font-mono">⌘K</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-dark-900 hover:bg-dark-800 border border-dark-800 rounded-lg text-sm text-zinc-300 transition-colors">
              Add <Plus size={14} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-dark-900 hover:bg-dark-800 border border-dark-800 rounded-lg text-sm text-zinc-300 transition-colors">
              <Share size={14} className="-scale-x-100" /> Invite
          </button>
        </div>
      </header>

      {/* Date Filters Row */}
      <div className="flex justify-between items-center mb-6">
          <div className="bg-dark-900 p-1 rounded-lg border border-dark-800 flex items-center">
              <button className="px-4 py-1.5 bg-dark-800 text-white text-xs font-medium rounded-md shadow-sm">30 Days</button>
              <button className="px-4 py-1.5 text-zinc-400 hover:text-white text-xs font-medium rounded-md transition-colors">3 Months</button>
              <button className="px-4 py-1.5 text-zinc-400 hover:text-white text-xs font-medium rounded-md transition-colors">1 years</button>
          </div>

          <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-dark-900 hover:bg-dark-800 border border-dark-800 rounded-lg text-sm text-zinc-300 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> 
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 border border-white rounded-lg text-sm font-medium transition-colors">
                  New <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          icon={<Banknote size={20} />} 
          label="Today's Sales" 
          value="$612.10" 
          trend="+20%($223)" 
          trendUp={true} 
          subtext="Last 30 Days"
        />
        <StatsCard 
          icon={<Package size={20} />} 
          label="Total Inventory Value" 
          value="$273,000" 
          trend="+12%(1,456)" 
          trendUp={true} 
          subtext="Last 30 Days"
        />
        <StatsCard 
          icon={<AlertCircle size={20} />} 
          label="Items Needing Restock" 
          value="20" 
          trend="+10%(4)" 
          trendUp={true} 
          subtext="Last 30 Days"
        />
        <StatsCard 
          icon={<Clock size={20} />} 
          label="Supplier Lead Time rate" 
          value="3.2%" 
          trend="-8%(0.4%)" 
          trendUp={false} 
          subtext="Last 30 Days"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[400px]">
        <div className="lg:col-span-2 h-full">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1 h-full">
          <LeadSourceChart />
        </div>
      </div>

      {/* Inventory Table */}
      <InventoryTable />
    </>
  );

  return (
    <div className="flex min-h-screen bg-dark-950 font-sans text-white">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      
      <main className="flex-1 ml-64 p-8">
        {activePage === 'dashboard' ? renderDashboard() : null}
        {activePage === 'sales' ? <SalesPage /> : null}
        {activePage === 'inventory' ? <InventoryPage /> : null}
        {activePage === 'suppliers' ? <SuppliersPage /> : null}
        {activePage === 'purchases' ? <PurchasesPage /> : null}
        {activePage === 'settings' ? <SettingsPage /> : null}
        {activePage === 'help' ? <HelpCenterPage /> : null}
        
        {activePage !== 'dashboard' && activePage !== 'sales' && activePage !== 'inventory' && activePage !== 'suppliers' && activePage !== 'purchases' && activePage !== 'settings' && activePage !== 'help' && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
             <div className="p-4 bg-dark-900 rounded-full mb-4">
                <Package size={32} />
             </div>
             <p className="text-lg font-medium">Coming Soon</p>
             <p className="text-sm">The {activePage} module is under development.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
