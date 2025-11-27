
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle, 
  Zap,
  ChevronDown,
  ChevronsUpDown,
  ShoppingBag,
  Package,
  Truck,
  Receipt
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  pageId,
  active = false, 
  hasSub = false,
  onClick 
}: { 
  icon: any, 
  label: string, 
  pageId?: string,
  active?: boolean, 
  hasSub?: boolean,
  onClick?: () => void
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${active ? 'bg-dark-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-dark-800'}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-white' : 'text-zinc-500 group-hover:text-white'} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {hasSub && <ChevronDown size={14} className="text-zinc-500" />}
  </div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <div className="px-3 mb-2 mt-6 text-xs font-semibold text-zinc-600 uppercase tracking-wider flex items-center justify-between">
    {label}
    {label === "Main Menu" }
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <aside className="w-64 bg-dark-950 border-r border-dark-800 flex flex-col h-screen fixed left-0 top-0 z-20 overflow-y-auto no-scrollbar">
      {/* Logo */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl tracking-tight">
          <Zap className="fill-white" size={24} />
          Agora
        </div>
      </div>

      <div className="flex-1 px-3">
        <SectionLabel label="Main Menu" />
        <div className="flex flex-col gap-1">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activePage === 'dashboard'} 
              onClick={() => onNavigate('dashboard')}
            />
            <SidebarItem 
              icon={ShoppingBag} 
              label="Sales" 
              active={activePage === 'sales'} 
              onClick={() => onNavigate('sales')}
            />
            <SidebarItem 
              icon={Package} 
              label="Inventory" 
              active={activePage === 'inventory'} 
              onClick={() => onNavigate('inventory')}
            />
            <SidebarItem 
              icon={Truck} 
              label="Suppliers" 
              active={activePage === 'suppliers'} 
              onClick={() => onNavigate('suppliers')}
            />
            <SidebarItem 
              icon={Receipt} 
              label="Purchases" 
              active={activePage === 'purchases'} 
              onClick={() => onNavigate('purchases')}
            />
        </div>

        <SectionLabel label="General" />
        <div className="flex flex-col gap-1">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={activePage === 'settings'} 
            onClick={() => onNavigate('settings')} 
          />
          <SidebarItem 
            icon={HelpCircle} 
            label="Help Center" 
            active={activePage === 'help'} 
            onClick={() => onNavigate('help')} 
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-dark-800">
        <div className="flex items-center justify-between p-2 hover:bg-dark-800 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
                <img src="https://picsum.photos/32/32" alt="User" className="w-8 h-8 rounded-full ring-2 ring-dark-700" />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">Agora ERP</span>
                    <span className="text--[10px] text-zinc-500">AgoraERP@mail.com</span>
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
};
