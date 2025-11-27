
import React, { useState } from 'react';
import { Search, Filter, Mail, Copy, CheckCircle2, AlertTriangle, Truck, Phone } from 'lucide-react';
import { Supplier, Product } from '../types';

// Mock Data for Suppliers
const mockSuppliers: Supplier[] = [
  { id: 'SUP-001', name: 'Luna Footwear', contactName: 'Maria Silva', categories: ["Women's Shoes"], leadTime: 10, email: 'orders@lunafootwear.com', status: 'Active' },
  { id: 'SUP-002', name: 'Atlas Footwear', contactName: 'John Doe', categories: ["Men's Shoes"], leadTime: 14, email: 'sales@atlasshoes.com', status: 'Active' },
  { id: 'SUP-003', name: 'YoungSteps', contactName: 'Sarah Smith', categories: ["Kids' Shoes"], leadTime: 7, email: 'wholesale@youngsteps.com', status: 'Active' },
  { id: 'SUP-004', name: 'Moda Fabrics', contactName: 'Elena G.', categories: ["Dresses"], leadTime: 21, email: 'b2b@modafabrics.com', status: 'On Hold' },
];

// Mock Products linked to Suppliers (for risk calculation and restock list)
const linkedProducts: Product[] = [
  { id: '001', name: "Women's Classic White Sneaker", category: "Women's Shoes", stockStatus: 'Low Stock', lastMovement: '', supplier: 'Luna Footwear', imageUrl: '', quantity: 12, costPrice: 0, sellingPrice: 0, location: '' },
  { id: '006', name: "Canvas Slip-Ons", category: "Women's Shoes", stockStatus: 'Out of Stock', lastMovement: '', supplier: 'Luna Footwear', imageUrl: '', quantity: 0, costPrice: 0, sellingPrice: 0, location: '' },
  { id: '002', name: "Men's Mesh Runner", category: "Men's Shoes", stockStatus: 'In Stock', lastMovement: '', supplier: 'Atlas Footwear', imageUrl: '', quantity: 120, costPrice: 0, sellingPrice: 0, location: '' },
  { id: '005', name: "Leather Loafers", category: "Men's Shoes", stockStatus: 'Low Stock', lastMovement: '', supplier: 'Atlas Footwear', imageUrl: '', quantity: 5, costPrice: 0, sellingPrice: 0, location: '' },
  { id: '003', name: "Kids' Everyday Runner", category: "Kids' Shoes", stockStatus: 'Out of Stock', lastMovement: '', supplier: 'YoungSteps', imageUrl: '', quantity: 0, costPrice: 0, sellingPrice: 0, location: '' },
  { id: '004', name: "Summer Floral Dress", category: "Dresses", stockStatus: 'In Stock', lastMovement: '', supplier: 'Moda Fabrics', imageUrl: '', quantity: 85, costPrice: 0, sellingPrice: 0, location: '' },
];

// Simple Icon component for reuse
const ClockIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

export const SuppliersPage = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(mockSuppliers[0].id);
  const [toast, setToast] = useState<string | null>(null);

  const selectedSupplier = mockSuppliers.find(s => s.id === selectedSupplierId) || mockSuppliers[0];
  
  // Filter products for the selected supplier
  const supplierProducts = linkedProducts.filter(p => p.supplier === selectedSupplier.name);
  
  // Products to restock (Low or Out of stock)
  const restockItems = supplierProducts.filter(p => p.stockStatus !== 'In Stock');

  // Analytics
  const totalSuppliers = mockSuppliers.length;
  const avgLeadTime = Math.round(mockSuppliers.reduce((acc, s) => acc + s.leadTime, 0) / totalSuppliers);
  const globalRiskCount = linkedProducts.filter(p => p.stockStatus !== 'In Stock').length;

  const handleCopyEmail = () => {
    // In a real app, this would copy to clipboard
    setToast("Email text copied to clipboard.");
    setTimeout(() => setToast(null), 3000);
  };

  // Generate Email Body
  const emailBody = `Subject: Restock Request – Agora Shoes

Hi ${selectedSupplier.contactName},

We'd like to place a restock order for the following products:

${restockItems.map(p => `• ${p.name} (Current: ${p.quantity} units) - Requesting: 50 units`).join('\n')}

Please confirm availability and expected delivery date.

Best regards,
Agora Purchasing Team`;

  return (
    <div className="flex flex-col h-full gap-6">
       {/* Toast */}
       {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-dark-800 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* TOP ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Truck size={24} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{totalSuppliers}</div>
                <div className="text-sm text-zinc-400">Active Suppliers</div>
            </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                <ClockIcon size={24} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{avgLeadTime} Days</div>
                <div className="text-sm text-zinc-400">Avg. Lead Time</div>
            </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-rose-500/10 rounded-lg text-rose-400">
                <AlertTriangle size={24} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{globalRiskCount} Items</div>
                <div className="text-sm text-zinc-400">At Risk (Low/Out)</div>
            </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        {/* LEFT: Suppliers Table (65%) */}
        <div className="flex-1 bg-dark-900 border border-dark-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-dark-800">
                <h2 className="text-lg font-semibold text-white mb-4">Suppliers Overview</h2>
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input 
                            type="text" 
                            placeholder="Search for a supplier..." 
                            className="w-full bg-dark-950 border border-dark-800 text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 placeholder:text-zinc-600 transition-colors"
                        />
                    </div>
                    <button className="px-3 py-2.5 bg-dark-800 border border-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 hover:bg-dark-700 hover:text-white transition-colors">
                        <Filter size={14} /> Filter
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-dark-950 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Supplier Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Categories</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Lead Time</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Risks</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-800">
                        {mockSuppliers.map((supplier) => {
                            // Calculate specific risks for this supplier
                            const sProducts = linkedProducts.filter(p => p.supplier === supplier.name);
                            const riskCount = sProducts.filter(p => p.stockStatus !== 'In Stock').length;

                            return (
                                <tr 
                                    key={supplier.id} 
                                    onClick={() => setSelectedSupplierId(supplier.id)}
                                    className={`cursor-pointer transition-colors ${selectedSupplierId === supplier.id ? 'bg-indigo-500/10 border-l-2 border-indigo-500' : 'hover:bg-dark-800/50 border-l-2 border-transparent'}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{supplier.name}</div>
                                        <div className="text-xs text-zinc-500">{supplier.contactName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {supplier.categories.map(cat => (
                                                <span key={cat} className="px-1.5 py-0.5 bg-dark-800 rounded text-[10px] text-zinc-400 border border-dark-700">{cat}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-300">{supplier.leadTime} Days</td>
                                    <td className="px-6 py-4">
                                        {riskCount > 0 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                {riskCount} Warnings
                                            </span>
                                        ) : (
                                            <span className="text-xs text-zinc-500">All Good</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                                            supplier.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                                        }`}>
                                            {supplier.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        {/* RIGHT: Detail & Restock Panel (35%) */}
        <div className="w-full xl:w-[420px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Supplier Summary Card */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">{selectedSupplier.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Mail size={14} /> {selectedSupplier.email}
                        </div>
                    </div>
                    <div className="p-2 bg-dark-800 rounded-lg">
                        <Phone size={18} className="text-zinc-400" />
                    </div>
                </div>
                
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Products Supplied</h3>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                    {supplierProducts.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 bg-dark-950 rounded-lg border border-dark-800">
                            <div className="text-sm text-zinc-300 truncate w-32">{p.name}</div>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                p.stockStatus === 'In Stock' ? 'text-emerald-400 bg-emerald-500/10' :
                                p.stockStatus === 'Low Stock' ? 'text-orange-400 bg-orange-500/10' :
                                'text-rose-400 bg-rose-500/10'
                            }`}>
                                {p.stockStatus}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restock Email Generator */}
            <div className="flex-1 bg-dark-900 border border-dark-800 rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-dark-800 bg-indigo-500/5">
                    <h3 className="text-sm font-semibold text-indigo-200 flex items-center gap-2">
                        <Mail size={16} /> Request Restock
                    </h3>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                    {restockItems.length > 0 ? (
                        <>
                            <div className="text-xs text-zinc-400 mb-3">
                                Suggested email based on <span className="text-white font-medium">{restockItems.length} low-stock items</span>.
                            </div>
                            <textarea 
                                readOnly
                                className="flex-1 w-full bg-dark-950 border border-dark-800 rounded-lg p-3 text-sm text-zinc-300 font-mono resize-none focus:outline-none mb-4"
                                value={emailBody}
                            />
                            <button 
                                onClick={handleCopyEmail}
                                className="w-full bg-white text-dark-950 hover:bg-zinc-200 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Copy size={16} /> Copy Email to Clipboard
                            </button>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                                <CheckCircle2 size={24} className="text-emerald-400" />
                            </div>
                            <p className="text-sm text-white font-medium">No Restock Needed</p>
                            <p className="text-xs text-zinc-500 mt-1">All products from this supplier are in stock.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
