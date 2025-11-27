import React, { useState } from 'react';
import { Search, Filter, Plus, AlertCircle, Package, DollarSign, BarChart3, ArrowUpDown, Mic, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

// Extended Mock Data with Financials & Logistics
const initialProducts: Product[] = [
  { id: 'SKU-001', name: "Women's Classic White Sneaker", category: "Women's Shoes", quantity: 42, costPrice: 45.00, sellingPrice: 89.00, location: 'Store A1', stockStatus: 'Low Stock', lastMovement: '2025-05-21', supplier: 'Luna Footwear', imageUrl: 'https://picsum.photos/40/40?10' },
  { id: 'SKU-002', name: "Men's Mesh Runner", category: "Men's Shoes", quantity: 120, costPrice: 55.00, sellingPrice: 110.00, location: 'Warehouse B', stockStatus: 'In Stock', lastMovement: '2025-05-20', supplier: 'Atlas Footwear', imageUrl: 'https://picsum.photos/40/40?11' },
  { id: 'SKU-003', name: "Kids' Everyday Runner", category: "Kids' Shoes", quantity: 0, costPrice: 35.00, sellingPrice: 45.00, location: 'Store A2', stockStatus: 'Out of Stock', lastMovement: '2025-05-10', supplier: 'YoungSteps', imageUrl: 'https://picsum.photos/40/40?12' },
  { id: 'SKU-004', name: "Summer Floral Dress", category: "Dresses", quantity: 85, costPrice: 30.00, sellingPrice: 75.00, location: 'Store A1', stockStatus: 'In Stock', lastMovement: '2025-05-18', supplier: 'Moda Fabrics', imageUrl: 'https://picsum.photos/40/40?13' },
  { id: 'SKU-005', name: "Leather Loafers", category: "Men's Shoes", quantity: 15, costPrice: 70.00, sellingPrice: 145.00, location: 'Store A3', stockStatus: 'Low Stock', lastMovement: '2025-05-15', supplier: 'Atlas Footwear', imageUrl: 'https://picsum.photos/40/40?14' },
  { id: 'SKU-006', name: "Canvas Slip-Ons", category: "Women's Shoes", quantity: 200, costPrice: 20.00, sellingPrice: 55.00, location: 'Warehouse B', stockStatus: 'In Stock', lastMovement: '2025-04-30', supplier: 'Luna Footwear', imageUrl: 'https://picsum.photos/40/40?15' },
];

export const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeAction, setActiveAction] = useState<'add' | 'adjust' | 'ai'>('add');
  const [notification, setNotification] = useState<string | null>(null);

  // Mock Action State
  const [adjProduct, setAdjProduct] = useState(products[0].id);
  const [adjType, setAdjType] = useState<'add' | 'remove'>('add');
  const [adjQty, setAdjQty] = useState(1);

  // Analytics Calculations
  const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity <= 50).length; // assuming reorder point 50
  const outOfStockCount = products.filter(p => p.quantity === 0).length;
  const totalValue = products.reduce((sum, p) => sum + (p.costPrice * p.quantity), 0);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdjustStock = () => {
    // Mock update
    setProducts(products.map(p => {
        if (p.id === adjProduct) {
            const newQty = adjType === 'add' ? p.quantity + adjQty : Math.max(0, p.quantity - adjQty);
            let status: Product['stockStatus'] = 'In Stock';
            if (newQty === 0) status = 'Out of Stock';
            else if (newQty <= 50) status = 'Low Stock';
            
            return { ...p, quantity: newQty, stockStatus: status, lastMovement: new Date().toISOString().slice(0, 10) };
        }
        return p;
    }));
    showNotification("Inventory updated successfully.");
  };

  const handleAddProduct = () => {
    // Mock add
    const newProduct: Product = {
        id: `SKU-${Math.floor(Math.random() * 1000)}`,
        name: "New Product Demo",
        category: "Women's Shoes",
        quantity: 100,
        costPrice: 50,
        sellingPrice: 100,
        location: 'Warehouse',
        stockStatus: 'In Stock',
        lastMovement: new Date().toISOString().slice(0, 10),
        supplier: 'Luna Footwear',
        imageUrl: `https://picsum.photos/40/40?${Math.random()}`
    };
    setProducts([newProduct, ...products]);
    showNotification("New product added to inventory.");
  };

  const handleAIUpdate = () => {
    showNotification("Agora has applied your inventory update.");
  };

  return (
    <div className="flex flex-col h-full gap-6">
       {/* Toast */}
       {notification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-dark-800 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* TOP SECTION: Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400">
                <AlertCircle size={24} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{lowStockCount}</div>
                <div className="text-sm text-zinc-400">Items Low on Stock</div>
            </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-rose-500/10 rounded-lg text-rose-400">
                <Package size={24} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{outOfStockCount}</div>
                <div className="text-sm text-zinc-400">Items Out of Stock</div>
            </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                <DollarSign size={24} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">€{totalValue.toLocaleString()}</div>
                <div className="text-sm text-zinc-400">Total Inventory Value</div>
            </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        {/* MAIN SECTION: Inventory Table */}
        <div className="flex-1 bg-dark-900 border border-dark-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-dark-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h2 className="text-lg font-semibold text-white">Inventory Overview</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 hover:bg-dark-700 hover:text-white transition-colors">
                            <Filter size={14} /> Filter
                        </button>
                        <button className="px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 hover:bg-dark-700 hover:text-white transition-colors">
                            <ArrowUpDown size={14} /> Sort
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                    type="text" 
                    placeholder="Search for a product..." 
                    className="w-full bg-dark-950 border border-dark-800 text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary-500 placeholder:text-zinc-600 transition-colors"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-dark-950 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Qty</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Cost</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Price</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Supplier</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-800">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-dark-800/50 transition-colors cursor-pointer group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">{product.name}</span>
                                            <span className="text-[10px] text-zinc-500 font-mono">{product.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-400">{product.category}</td>
                                <td className="px-6 py-4 text-sm text-white font-medium text-right">{product.quantity}</td>
                                <td className="px-6 py-4 text-sm text-zinc-400 text-right">€{product.costPrice}</td>
                                <td className="px-6 py-4 text-sm text-white font-medium text-right">€{product.sellingPrice}</td>
                                <td className="px-6 py-4 text-sm text-zinc-400">{product.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${
                                        product.stockStatus === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        product.stockStatus === 'Low Stock' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    }`}>
                                        {product.stockStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                        {product.supplier}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* RIGHT PANEL: Actions */}
        <div className="w-full xl:w-[320px] flex-shrink-0 bg-dark-900 border border-dark-800 rounded-xl flex flex-col">
             <div className="p-6 border-b border-dark-800">
                <h2 className="text-lg font-semibold text-white">Manage Inventory</h2>
             </div>
             
             {/* Tabs */}
             <div className="p-4">
                <div className="bg-dark-950 p-1 rounded-lg flex">
                    <button onClick={() => setActiveAction('add')} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeAction === 'add' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>Add</button>
                    <button onClick={() => setActiveAction('adjust')} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeAction === 'adjust' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>Adjust</button>
                    <button onClick={() => setActiveAction('ai')} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeAction === 'ai' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>AI Assistant</button>
                </div>
             </div>

             <div className="flex-1 p-6 overflow-y-auto">
                 {activeAction === 'add' && (
                     <div className="flex flex-col gap-4 animate-fade-in">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Product Name</label>
                            <input type="text" className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500" placeholder="e.g. Red High Heels" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Category</label>
                            <select className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500">
                                <option>Women's Shoes</option>
                                <option>Men's Shoes</option>
                                <option>Kids' Shoes</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Cost Price</label>
                                <input type="number" className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500" placeholder="0.00" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Selling Price</label>
                                <input type="number" className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Initial Quantity</label>
                            <input type="number" className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500" placeholder="0" />
                        </div>
                        <button onClick={handleAddProduct} className="w-full bg-primary-500 hover:bg-primary-400 text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
                            Save Product
                        </button>
                     </div>
                 )}

                 {activeAction === 'adjust' && (
                     <div className="flex flex-col gap-4 animate-fade-in">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Product</label>
                            <select 
                                value={adjProduct} 
                                onChange={(e) => setAdjProduct(e.target.value)}
                                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                            >
                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Adjustment Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" checked={adjType === 'add'} onChange={() => setAdjType('add')} className="accent-emerald-500" />
                                    <span className="text-sm text-zinc-300">Add Stock</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" checked={adjType === 'remove'} onChange={() => setAdjType('remove')} className="accent-rose-500" />
                                    <span className="text-sm text-zinc-300">Remove Stock</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Quantity</label>
                            <input 
                                type="number" 
                                min="1"
                                value={adjQty}
                                onChange={(e) => setAdjQty(Number(e.target.value))}
                                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500" 
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Reason</label>
                            <select className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500">
                                <option>New Shipment</option>
                                <option>Return</option>
                                <option>Damage / Loss</option>
                                <option>Inventory Correction</option>
                            </select>
                        </div>
                        <button onClick={handleAdjustStock} className="w-full bg-dark-800 hover:bg-dark-700 text-white font-medium py-2.5 rounded-lg transition-colors border border-dark-700 mt-2">
                            Apply Adjustment
                        </button>
                     </div>
                 )}

                 {activeAction === 'ai' && (
                     <div className="flex flex-col h-full animate-fade-in text-center justify-center">
                        <div className="w-16 h-16 bg-dark-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-dark-800">
                             <Mic size={24} className="text-primary-400" />
                        </div>
                        <h3 className="text-white font-medium mb-2">Describe Change</h3>
                        <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                            "We received 20 units of Women's Classic White Sneaker in size 38."
                        </p>
                        <button onClick={handleAIUpdate} className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-400 hover:to-indigo-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-primary-500/20">
                            Apply with Agora AI
                        </button>
                     </div>
                 )}
             </div>
        </div>
      </div>
    </div>
  );
};
