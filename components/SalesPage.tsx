
import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, Mic, Upload, CheckCircle2, Trash2, ShoppingCart } from 'lucide-react';
import { Sale } from '../types';

// Mock initial data
const initialSales: Sale[] = [
  { id: 'ORD-7829', dateTime: '2025-10-18 14:30', product: "Women's Classic White Sneaker", category: "Women's Shoes", quantity: 1, totalAmount: 89.00, channel: 'In-store', status: 'Completed' },
  { id: 'ORD-7830', dateTime: '2025-10-18 15:12', product: "Men's Mesh Runner", category: "Men's Shoes", quantity: 1, totalAmount: 110.00, channel: 'Online', status: 'Completed' },
  { id: 'ORD-7831', dateTime: '2025-10-18 16:05', product: "Kids' Everyday Runner", category: "Kids' Shoes", quantity: 2, totalAmount: 90.00, channel: 'In-store', status: 'Completed' },
  { id: 'ORD-7832', dateTime: '2025-10-18 16:45', product: "Leather Loafers", category: "Men's Shoes", quantity: 1, totalAmount: 145.00, channel: 'Online', status: 'Completed' },
  { id: 'ORD-7833', dateTime: '2025-10-18 17:20', product: "Summer Floral Dress", category: "Dresses", quantity: 1, totalAmount: 75.00, channel: 'In-store', status: 'Refunded' },
  { id: 'ORD-7834', dateTime: '2025-10-18 18:00', product: "Canvas Slip-Ons", category: "Women's Shoes", quantity: 1, totalAmount: 55.00, channel: 'Online', status: 'Completed' },
  { id: 'ORD-7835', dateTime: '2025-10-18 18:30', product: "Men's Mesh Runner", category: "Men's Shoes", quantity: 1, totalAmount: 110.00, channel: 'In-store', status: 'Completed' },
  { id: 'ORD-7836', dateTime: '2025-10-18 19:15', product: "Women's Classic White Sneaker", category: "Women's Shoes", quantity: 2, totalAmount: 178.00, channel: 'Online', status: 'Completed' },
];

// Helper type for items in the cart before they become full Sales
type CartItem = Omit<Sale, 'id' | 'dateTime' | 'status'>;

export const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [activeTab, setActiveTab] = useState<'manual' | 'voice' | 'upload'>('manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Cart / Stacking state
  const [pendingItems, setPendingItems] = useState<CartItem[]>([]);

  // Manual form state
  const [product, setProduct] = useState("Women's Classic White Sneaker");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(89.00);
  const [channel, setChannel] = useState<'In-store' | 'Online'>('In-store');

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddItem = () => {
    const newItem: CartItem = {
      product,
      category: product.includes("Women") ? "Women's Shoes" : (product.includes("Kids") ? "Kids' Shoes" : (product.includes("Dress") ? "Dresses" : "Men's Shoes")),
      quantity,
      totalAmount: amount,
      channel,
    };

    setPendingItems([...pendingItems, newItem]);
    
    // Reset fields for next item (keep channel same)
    setQuantity(1);
    setAmount(0);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...pendingItems];
    updated.splice(index, 1);
    setPendingItems(updated);
  };

  const handleCompleteSale = () => {
    if (pendingItems.length === 0) return;

    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const baseId = Math.floor(Math.random() * 10000);

    const newSales: Sale[] = pendingItems.map((item, idx) => ({
      ...item,
      id: `ORD-${baseId}-${idx + 1}`,
      dateTime: timestamp,
      status: 'Completed'
    }));
    
    setSales([...newSales, ...sales]);
    setPendingItems([]);
    showNotification("Sale recorded successfully.");
  };

  const handleSimulatedAI = (mode: 'voice' | 'upload') => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      const newSale: Sale = {
        id: `AI-${Math.floor(Math.random() * 10000)}`,
        dateTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
        product: "Men's Mesh Runner",
        category: "Men's Shoes",
        quantity: 2,
        totalAmount: 220.00,
        channel: 'In-store',
        status: 'Completed'
      };

      setSales([newSale, ...sales]);
      const msg = mode === 'voice' 
        ? "Agora has captured a new sale using your description."
        : "Invoice processed. A new sale has been added.";
      showNotification(msg);
    }, 2000);
  };

  // Calculate total of pending items
  const pendingTotal = pendingItems.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-[calc(110vh-8rem)]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-dark-800 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* LEFT SIDE: Sales Table (70%) */}
      <div className="flex-1 bg-dark-900 border border-dark-800 rounded-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-dark-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg font-semibold text-white">Sales Overview</h2>
            <div className="flex gap-2">
                <button className="px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 hover:bg-dark-700 hover:text-white transition-colors">
                  <Calendar size={14} /> Date
                </button>
                <button className="px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 hover:bg-dark-700 hover:text-white transition-colors">
                  <Filter size={14} /> Filters
                </button>
            </div>
          </div>
          
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search for a product or invoice..." 
              className="w-full bg-dark-950 border border-dark-800 text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary-500 placeholder:text-zinc-600 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-dark-950 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Sale ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-dark-800/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 text-xs font-mono text-zinc-500 group-hover:text-primary-400">{sale.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{sale.dateTime}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{sale.product}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{sale.category}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{sale.quantity}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white">${sale.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${
                      sale.channel === 'Online' 
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>
                      {sale.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      sale.status === 'Completed' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT SIDE: Add Sale Panel (30%) */}
      <div className="w-full xl:w-[380px] flex-shrink-0 bg-dark-900 border border-dark-800 rounded-xl flex flex-col h-full">
        <div className="p-6 border-b border-dark-800 flex-shrink-0">
          <h2 className="text-lg font-semibold text-white mb-2">Add New Sale</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Use this panel to quickly record new sales. You can stack multiple items before completing the sale.
          </p>
        </div>

        {/* Tabs */}
        <div className="p-4 flex-shrink-0">
          <div className="bg-dark-950 p-1 rounded-lg flex">
            <button 
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'manual' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Manual
            </button>
            <button 
              onClick={() => setActiveTab('voice')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'voice' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Voice AI
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'upload' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Upload
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {activeTab === 'manual' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Input Form */}
              <div className="flex flex-col gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Product</label>
                    <select 
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                    >
                    <option>Women's Classic White Sneaker</option>
                    <option>Men's Mesh Runner</option>
                    <option>Kids' Everyday Runner</option>
                    <option>Leather Loafers</option>
                    <option>Summer Floral Dress</option>
                    <option>Canvas Slip-Ons</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-medium text-zinc-400">Quantity</label>
                    <input 
                        type="number" 
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                    />
                    </div>
                    <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-medium text-zinc-400">Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                        <input 
                        type="number" 
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-6 pr-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Channel</label>
                    <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={channel === 'In-store'} onChange={() => setChannel('In-store')} className="accent-primary-500" />
                        <span className="text-sm text-zinc-300">In-store</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={channel === 'Online'} onChange={() => setChannel('Online')} className="accent-primary-500" />
                        <span className="text-sm text-zinc-300">Online</span>
                    </label>
                    </div>
                </div>

                <button 
                    onClick={handleAddItem}
                    className="w-full bg-dark-800 hover:bg-dark-700 text-zinc-200 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 border border-dark-700 mt-2"
                >
                    <Plus size={16} /> Add Item
                </button>
              </div>

              {/* Cart List */}
              {pendingItems.length > 0 && (
                  <div className="bg-dark-950 rounded-xl border border-dark-800 overflow-hidden animate-fade-in-up">
                    <div className="px-4 py-3 bg-dark-800/50 border-b border-dark-800 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                            <ShoppingCart size={14} /> Current Items ({pendingItems.length})
                        </div>
                        <span className="text-sm font-bold text-white">${pendingTotal.toFixed(2)}</span>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto divide-y divide-dark-800">
                        {pendingItems.map((item, idx) => (
                            <div key={idx} className="p-3 flex justify-between items-center hover:bg-dark-800/30">
                                <div className="flex-1 min-w-0 pr-3">
                                    <div className="text-xs text-white font-medium truncate">{item.product}</div>
                                    <div className="text-[10px] text-zinc-500 mt-0.5">Qty: {item.quantity} • {item.channel}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-zinc-300">${item.totalAmount.toFixed(2)}</span>
                                    <button 
                                        onClick={() => handleRemoveItem(idx)}
                                        className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-dark-800">
                        <button 
                        onClick={handleCompleteSale}
                        className="w-full bg-primary-500 hover:bg-primary-400 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                        >
                        <CheckCircle2 size={16} /> Complete Sale
                        </button>
                    </div>
                  </div>
              )}
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in py-12">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all ${isProcessing ? 'bg-primary-500/20 scale-110' : 'bg-dark-800'}`}>
                <Mic size={32} className={isProcessing ? 'text-primary-400 animate-pulse' : 'text-zinc-500'} />
              </div>
              
              <h3 className="text-white font-medium mb-2">Describe Sale to Agora</h3>
              <p className="text-xs text-zinc-500 mb-8 max-w-[240px] leading-relaxed">
                Click the button and say something like:<br/>
                <span className="text-zinc-300 italic">"Sold 2 pairs of Men's Mesh Runner for $220 total in store."</span>
              </p>

              <button 
                onClick={() => handleSimulatedAI('voice')}
                disabled={isProcessing}
                className="w-full bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
              >
                {isProcessing ? 'Listening & Processing...' : 'Start Speaking'}
              </button>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="flex flex-col h-full animate-fade-in pb-4">
               <div 
                  onClick={() => !isProcessing && handleSimulatedAI('upload')}
                  className={`flex-1 border-2 border-dashed border-dark-700 hover:border-dark-600 rounded-xl bg-dark-950/50 flex flex-col items-center justify-center cursor-pointer transition-colors ${isProcessing ? 'opacity-50' : ''}`}
               >
                  <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                    <Upload size={20} className="text-zinc-400" />
                  </div>
                  <p className="text-sm text-zinc-300 font-medium mb-1">Upload Receipt</p>
                  <p className="text-xs text-zinc-500">JPG, PNG or PDF</p>
               </div>

               {isProcessing && (
                 <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400 bg-dark-950 p-3 rounded-lg border border-dark-800">
                    <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    Extracting data from invoice...
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
