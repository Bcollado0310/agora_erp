
import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, CheckCircle2, MoreHorizontal, X, Mic, ShoppingCart, Truck, Calendar, DollarSign, Package } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderItem } from '../types';

// Mock Data
const initialOrders: PurchaseOrder[] = [
  { 
    id: 'PO-1001', 
    supplier: 'Luna Footwear', 
    date: '2025-10-15', 
    itemsCount: 24, 
    totalAmount: 1200.00, 
    status: 'Received', 
    expectedDelivery: '2025-10-18',
    items: [
      { productName: "Women's Classic White Sneaker", quantity: 24, unitCost: 50.00, total: 1200.00 }
    ]
  },
  { 
    id: 'PO-1002', 
    supplier: 'Atlas Footwear', 
    date: '2025-10-16', 
    itemsCount: 10, 
    totalAmount: 550.00, 
    status: 'Pending', 
    expectedDelivery: '2025-10-22',
    items: [
       { productName: "Men's Mesh Runner", quantity: 10, unitCost: 55.00, total: 550.00 }
    ]
  },
  { 
    id: 'PO-1003', 
    supplier: 'YoungSteps', 
    date: '2025-10-18', 
    itemsCount: 50, 
    totalAmount: 1800.00, 
    status: 'Pending', 
    expectedDelivery: '2025-10-20',
    items: [
      { productName: "Kids' Everyday Runner", quantity: 50, unitCost: 36.00, total: 1800.00 }
    ]
  },
  { 
    id: 'PO-1004', 
    supplier: 'Moda Fabrics', 
    date: '2025-10-10', 
    itemsCount: 15, 
    totalAmount: 450.00, 
    status: 'Cancelled', 
    expectedDelivery: '-',
    items: [
      { productName: "Summer Floral Dress", quantity: 15, unitCost: 30.00, total: 450.00 }
    ]
  },
  { 
    id: 'PO-1005', 
    supplier: 'Luna Footwear', 
    date: '2025-10-20', 
    itemsCount: 30, 
    totalAmount: 1500.00, 
    status: 'Pending', 
    expectedDelivery: '2025-10-25',
    items: [
      { productName: "Canvas Slip-Ons", quantity: 30, unitCost: 50.00, total: 1500.00 }
    ]
  },
];

export const PurchasesPage = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Order Form State
  const [newOrderTab, setNewOrderTab] = useState<'manual' | 'voice'>('manual');
  const [supplier, setSupplier] = useState('Luna Footwear');
  const [draftItems, setDraftItems] = useState<PurchaseOrderItem[]>([]);
  // Temp item input state
  const [newItemProduct, setNewItemProduct] = useState("Women's Classic White Sneaker");
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemCost, setNewItemCost] = useState(0);

  // AI State
  const [isListening, setIsListening] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddItemToDraft = () => {
    const total = newItemQty * newItemCost;
    setDraftItems([...draftItems, { productName: newItemProduct, quantity: newItemQty, unitCost: newItemCost, total }]);
    setNewItemQty(1);
    setNewItemCost(0);
  };

  const handleCreateOrder = () => {
    const totalAmount = draftItems.reduce((acc, item) => acc + item.total, 0);
    const totalItems = draftItems.reduce((acc, item) => acc + item.quantity, 0);
    
    const newOrder: PurchaseOrder = {
      id: `PO-${1000 + orders.length + 1}`,
      supplier,
      date: new Date().toISOString().slice(0, 10),
      itemsCount: totalItems,
      totalAmount,
      status: 'Pending',
      expectedDelivery: '2025-11-01',
      items: draftItems
    };

    setOrders([newOrder, ...orders]);
    setIsNewOrderOpen(false);
    setDraftItems([]);
    showNotification("Purchase Order created successfully.");
  };

  const handleVoiceOrder = () => {
    setIsListening(true);
    setTimeout(() => {
        setIsListening(false);
        // Simulate parsed AI result
        setSupplier('Atlas Footwear');
        setDraftItems([
            { productName: "Men's Mesh Runner", quantity: 50, unitCost: 55.00, total: 2750.00 }
        ]);
        setNewOrderTab('manual'); // Switch to review
        showNotification("AI parsed your order description.");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full gap-6 relative">
      {/* Toast */}
       {notification && (
        <div className="fixed top-6 right-6 z-[60] animate-fade-in bg-dark-800 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
           <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
             <FileText size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-white">{orders.filter(o => o.status === 'Pending').length}</div>
             <div className="text-sm text-zinc-400">Open Orders</div>
           </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
           <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400">
             <DollarSign size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-white">${orders.filter(o => o.status === 'Pending').reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}</div>
             <div className="text-sm text-zinc-400">Pending Value</div>
           </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex items-center gap-4">
           <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
             <Truck size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-white">{orders.filter(o => o.status === 'Received').length}</div>
             <div className="text-sm text-zinc-400">Received This Month</div>
           </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="flex-1 bg-dark-900 border border-dark-800 rounded-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-dark-800">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-white">Purchase Orders</h2>
              <button 
                onClick={() => setIsNewOrderOpen(true)}
                className="bg-primary-500 hover:bg-primary-400 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={16} /> New Order
              </button>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                      type="text" 
                      placeholder="Search orders..." 
                      className="w-full bg-dark-950 border border-dark-800 text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary-500"
                  />
              </div>
              <button className="px-3 py-2.5 bg-dark-800 border border-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 hover:bg-dark-700 transition-colors">
                  <Filter size={14} /> Filter
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-dark-950 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">PO Number</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Items</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Expected</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {orders.map((order) => (
                <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-dark-800/30 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-dark-800 rounded text-zinc-400 group-hover:text-white transition-colors">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{order.supplier}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300 text-right">{order.itemsCount}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white text-right">${order.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      order.status === 'Received' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {order.status === 'Received' && <CheckCircle2 size={12} />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{order.expectedDelivery}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-500 hover:text-white transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ORDER DETAILS MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-dark-900 border border-dark-800 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-dark-800 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-white">{selectedOrder.id}</h2>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                selectedOrder.status === 'Received' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                selectedOrder.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                                {selectedOrder.status}
                            </span>
                        </div>
                        <p className="text-zinc-400 text-sm">Supplier: <span className="text-white">{selectedOrder.supplier}</span></p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Order Items</h3>
                    <div className="bg-dark-950 rounded-lg border border-dark-800 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-dark-800/50 text-xs text-zinc-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Product</th>
                                    <th className="px-4 py-3 font-medium text-right">Qty</th>
                                    <th className="px-4 py-3 font-medium text-right">Cost</th>
                                    <th className="px-4 py-3 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-800 text-sm">
                                {selectedOrder.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-4 py-3 text-white">{item.productName}</td>
                                        <td className="px-4 py-3 text-zinc-300 text-right">{item.quantity}</td>
                                        <td className="px-4 py-3 text-zinc-300 text-right">${item.unitCost.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-white font-medium text-right">${item.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-dark-800/30">
                                <tr>
                                    <td colSpan={3} className="px-4 py-3 text-right text-zinc-400 text-xs uppercase font-semibold">Grand Total</td>
                                    <td className="px-4 py-3 text-right text-emerald-400 font-bold text-base">${selectedOrder.totalAmount.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-dark-950 p-3 rounded-lg border border-dark-800">
                            <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Order Date</div>
                            <div className="text-sm text-white font-medium">{selectedOrder.date}</div>
                        </div>
                        <div className="bg-dark-950 p-3 rounded-lg border border-dark-800">
                            <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Truck size={12}/> Expected Delivery</div>
                            <div className="text-sm text-white font-medium">{selectedOrder.expectedDelivery}</div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-dark-800 bg-dark-900 rounded-b-xl flex justify-end gap-3">
                    <button className="px-4 py-2 bg-dark-800 text-zinc-300 hover:text-white rounded-lg text-sm font-medium transition-colors">Download Invoice</button>
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-lg text-sm font-medium transition-colors">Reorder Items</button>
                </div>
            </div>
        </div>
      )}

      {/* --- NEW ORDER MODAL --- */}
      {isNewOrderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-dark-900 border border-dark-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-dark-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Create Purchase Order</h2>
                        <p className="text-zinc-400 text-xs">Create a new order manually or using Agora AI.</p>
                    </div>
                    <button onClick={() => setIsNewOrderOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 pt-4">
                    <div className="bg-dark-950 p-1 rounded-lg flex">
                        <button 
                            onClick={() => setNewOrderTab('manual')}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${newOrderTab === 'manual' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Manual
                        </button>
                        <button 
                            onClick={() => setNewOrderTab('voice')}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${newOrderTab === 'voice' ? 'bg-dark-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Voice AI
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {newOrderTab === 'manual' && (
                        <div className="flex flex-col gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Supplier</label>
                                <select 
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                >
                                    <option>Luna Footwear</option>
                                    <option>Atlas Footwear</option>
                                    <option>YoungSteps</option>
                                    <option>Moda Fabrics</option>
                                </select>
                            </div>

                            <div className="p-4 bg-dark-950/50 border border-dark-800 rounded-lg space-y-3">
                                <h4 className="text-xs font-semibold text-zinc-300 uppercase">Add Item</h4>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-500">Product</label>
                                    <select 
                                        value={newItemProduct}
                                        onChange={(e) => setNewItemProduct(e.target.value)}
                                        className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                    >
                                        <option>Women's Classic White Sneaker</option>
                                        <option>Men's Mesh Runner</option>
                                        <option>Kids' Everyday Runner</option>
                                        <option>Canvas Slip-Ons</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-1 space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-500">Quantity</label>
                                        <input 
                                            type="number" min="1" 
                                            value={newItemQty}
                                            onChange={(e) => setNewItemQty(Number(e.target.value))}
                                            className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-500">Unit Cost</label>
                                        <input 
                                            type="number" min="0" 
                                            value={newItemCost}
                                            onChange={(e) => setNewItemCost(Number(e.target.value))}
                                            className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={handleAddItemToDraft}
                                    className="w-full border border-dashed border-dark-700 hover:border-dark-500 hover:bg-dark-900 text-zinc-400 hover:text-white py-2 rounded-lg text-sm font-medium transition-all"
                                >
                                    + Add Line Item
                                </button>
                            </div>

                            {/* Draft List */}
                            {draftItems.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-semibold text-zinc-500 uppercase">Order Summary</h4>
                                    <div className="bg-dark-950 rounded-lg border border-dark-800 divide-y divide-dark-800">
                                        {draftItems.map((item, idx) => (
                                            <div key={idx} className="flex justify-between p-3 text-sm">
                                                <div>
                                                    <div className="text-white font-medium">{item.productName}</div>
                                                    <div className="text-xs text-zinc-500">x{item.quantity} @ ${item.unitCost}</div>
                                                </div>
                                                <div className="text-white font-medium">${item.total.toFixed(2)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm text-zinc-400">Total</span>
                                        <span className="text-lg font-bold text-white">${draftItems.reduce((acc, i) => acc + i.total, 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {newOrderTab === 'voice' && (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all ${isListening ? 'bg-primary-500/20 scale-110' : 'bg-dark-950 border border-dark-800'}`}>
                                <Mic size={32} className={isListening ? 'text-primary-400 animate-pulse' : 'text-zinc-500'} />
                            </div>
                            <h3 className="text-white font-medium mb-2">Describe Order to Agora</h3>
                            <p className="text-xs text-zinc-500 mb-8 max-w-[240px] leading-relaxed">
                                <span className="text-zinc-300 italic">"Order 50 units of Men's Mesh Runner from Atlas Footwear at $55 each."</span>
                            </p>
                            <button 
                                onClick={handleVoiceOrder}
                                disabled={isListening}
                                className="w-full bg-primary-500 hover:bg-primary-400 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
                            >
                                {isListening ? 'Processing...' : 'Start Listening'}
                            </button>
                        </div>
                    )}
                </div>

                {newOrderTab === 'manual' && (
                    <div className="p-6 border-t border-dark-800 bg-dark-900 rounded-b-xl">
                        <button 
                            onClick={handleCreateOrder}
                            disabled={draftItems.length === 0}
                            className="w-full bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 size={18} /> Confirm Purchase Order
                        </button>
                    </div>
                )}
             </div>
        </div>
      )}

    </div>
  );
};
