import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Cpu, 
  Smartphone, 
  LogOut,
  CheckCircle2
} from 'lucide-react';

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-primary-500' : 'bg-dark-700'}`}
  >
    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notification, setNotification] = useState<string | null>(null);

  // Mock State
  const [settings, setSettings] = useState({
    storeName: 'StepForward Shoes',
    email: 'AgoraERP@mail.com',
    currency: 'USD',
    lowStockAlerts: true,
    emailNotifications: true,
    aiVoiceEnabled: true,
    aiAutoRestock: false,
  });

  const handleSave = () => {
    setNotification("Settings saved successfully.");
    setTimeout(() => setNotification(null), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'ai', label: 'Agora AI', icon: Cpu },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-dark-800 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
           <p className="text-sm text-zinc-400">Manage your store preferences and account details.</p>
        </div>
        <button 
            onClick={handleSave}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-400 text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary-500/20"
        >
            Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Left Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-2 flex flex-col gap-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                isActive 
                                ? 'bg-dark-800 text-white shadow-sm' 
                                : 'text-zinc-400 hover:text-white hover:bg-dark-800/50'
                            }`}
                        >
                            <Icon size={18} className={isActive ? 'text-primary-400' : 'text-zinc-500'} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 bg-dark-900 border border-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                        ND
                    </div>
                    <div>
                        <div className="text-white text-sm font-medium">Agora ERP</div>
                        <div className="text-zinc-500 text-xs">Admin</div>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 border border-dark-700 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-dark-800 transition-colors">
                    <LogOut size={14} /> Sign Out
                </button>
            </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-dark-900 border border-dark-800 rounded-xl p-8 overflow-y-auto">
            {activeTab === 'general' && (
                <div className="max-w-2xl space-y-8">
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Store Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Store Name</label>
                                <input 
                                    type="text" 
                                    value={settings.storeName}
                                    onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                                    className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Contact Email</label>
                                <input 
                                    type="email" 
                                    value={settings.email}
                                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                                    className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                />
                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Regional Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Currency</label>
                                <select 
                                    value={settings.currency}
                                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                                    className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Timezone</label>
                                <select className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500">
                                    <option>(GMT-05:00) Eastern Time</option>
                                    <option>(GMT+00:00) UTC</option>
                                    <option>(GMT+01:00) Central European Time</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'notifications' && (
                 <div className="max-w-2xl space-y-8">
                     <section>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Inventory Alerts</h3>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="text-sm font-medium text-white">Low Stock Alerts</div>
                                <div className="text-xs text-zinc-500">Get notified when products fall below reorder point.</div>
                            </div>
                            <Toggle enabled={settings.lowStockAlerts} onToggle={() => setSettings({...settings, lowStockAlerts: !settings.lowStockAlerts})} />
                        </div>
                        <div className="flex items-center justify-between py-3 border-t border-dark-800/50">
                            <div>
                                <div className="text-sm font-medium text-white">Out of Stock Alerts</div>
                                <div className="text-xs text-zinc-500">Immediate notification when inventory hits zero.</div>
                            </div>
                            <Toggle enabled={true} onToggle={() => {}} />
                        </div>
                     </section>
                     
                     <section>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Sales & Activity</h3>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="text-sm font-medium text-white">Email Confirmations</div>
                                <div className="text-xs text-zinc-500">Receive a daily digest of all sales.</div>
                            </div>
                            <Toggle enabled={settings.emailNotifications} onToggle={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})} />
                        </div>
                     </section>
                 </div>
            )}

            {activeTab === 'integrations' && (
                <div className="max-w-3xl space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Connected Services</h3>
                    
                    <div className="bg-dark-950 border border-dark-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968382.png" alt="Stripe" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Stripe Payments</div>
                                <div className="text-xs text-emerald-400 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Connected
                                </div>
                            </div>
                        </div>
                        <button className="px-4 py-2 border border-dark-700 text-zinc-300 rounded-lg text-xs font-medium hover:bg-dark-800">Configure</button>
                    </div>

                    <div className="bg-dark-950 border border-dark-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-[#95BF47] rounded-lg flex items-center justify-center p-2">
                                <span className="text-white font-bold text-xs">Shopify</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">Shopify Sync</div>
                                <div className="text-xs text-zinc-500">Sync inventory and orders automatically.</div>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-dark-800 text-white rounded-lg text-xs font-medium hover:bg-dark-700">Connect</button>
                    </div>

                    <div className="bg-dark-950 border border-dark-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-[#4A154B] rounded-lg flex items-center justify-center p-2">
                                <span className="text-white font-bold text-xs">Slack</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">Slack Notifications</div>
                                <div className="text-xs text-zinc-500">Send team alerts to a channel.</div>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-dark-800 text-white rounded-lg text-xs font-medium hover:bg-dark-700">Connect</button>
                    </div>
                </div>
            )}

            {activeTab === 'ai' && (
                <div className="max-w-2xl space-y-8">
                     <div className="p-4 bg-gradient-to-r from-primary-900/20 to-indigo-900/20 border border-primary-500/20 rounded-xl flex items-start gap-4">
                        <div className="p-2 bg-primary-500/20 rounded-lg">
                            <Cpu size={20} className="text-primary-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">Agora Intelligence</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Customize how the AI interacts with your data. Enabling more features allows Agora to provide deeper insights and automate mundane tasks.
                            </p>
                        </div>
                     </div>

                     <section>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Voice Assistant</h3>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="text-sm font-medium text-white">Voice Commands</div>
                                <div className="text-xs text-zinc-500">Allow microphone access for creating orders and searching.</div>
                            </div>
                            <Toggle enabled={settings.aiVoiceEnabled} onToggle={() => setSettings({...settings, aiVoiceEnabled: !settings.aiVoiceEnabled})} />
                        </div>
                     </section>

                     <section>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Automation</h3>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="text-sm font-medium text-white">Auto-Draft Restock Emails</div>
                                <div className="text-xs text-zinc-500">AI will prepare draft emails when suppliers are low on stock.</div>
                            </div>
                            <Toggle enabled={settings.aiAutoRestock} onToggle={() => setSettings({...settings, aiAutoRestock: !settings.aiAutoRestock})} />
                        </div>
                         <div className="flex items-center justify-between py-3 border-t border-dark-800/50">
                            <div>
                                <div className="text-sm font-medium text-white">Smart Invoice Scanning</div>
                                <div className="text-xs text-zinc-500">Automatically categorize products from uploaded receipt images.</div>
                            </div>
                            <Toggle enabled={true} onToggle={() => {}} />
                        </div>
                     </section>
                </div>
            )}

             {activeTab === 'billing' && (
                <div className="max-w-2xl space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-dark-800">Current Plan</h3>
                    
                    <div className="bg-dark-950 border border-dark-800 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Pro Plan</h2>
                                <p className="text-sm text-zinc-400">Perfect for growing retail stores.</p>
                            </div>
                            <span className="px-3 py-1 bg-primary-500/10 text-primary-400 border border-primary-500/20 rounded-full text-xs font-bold">ACTIVE</span>
                        </div>
                        
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-bold text-white">$49</span>
                            <span className="text-zinc-500">/ month</span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-zinc-300">
                                <CheckCircle2 size={16} className="text-emerald-400" /> Unlimited Products
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-300">
                                <CheckCircle2 size={16} className="text-emerald-400" /> AI Voice Assistant
                            </div>
                             <div className="flex items-center gap-2 text-sm text-zinc-300">
                                <CheckCircle2 size={16} className="text-emerald-400" /> Advanced Analytics
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white text-dark-950 font-medium rounded-lg text-sm hover:bg-zinc-200 transition-colors">Manage Subscription</button>
                            <button className="px-4 py-2 border border-dark-700 text-zinc-300 font-medium rounded-lg text-sm hover:bg-dark-800 transition-colors">View Invoices</button>
                        </div>
                    </div>
                </div>
             )}
        </div>
      </div>
    </div>
  );
};