
import React from 'react';
import { Search, Filter, Download, Package } from 'lucide-react';
import { Product } from '../types';

const products: Product[] = [
  { 
    id: '001', 
    name: 'Women\'s Classic White Sneaker', 
    category: 'Women\'s Shoes', 
    stockStatus: 'Low Stock', 
    lastMovement: '2025-05-21', 
    supplier: 'Luna Footwear', 
    imageUrl: 'https://picsum.photos/40/40?10',
    quantity: 12,
    costPrice: 45.00,
    sellingPrice: 89.00,
    location: 'Store A1'
  },
  { 
    id: '002', 
    name: 'Men\'s Mesh Runner', 
    category: 'Men\'s Shoes', 
    stockStatus: 'In Stock', 
    lastMovement: '2025-05-20', 
    supplier: 'Atlas Footwear', 
    imageUrl: 'https://picsum.photos/40/40?11',
    quantity: 120,
    costPrice: 55.00,
    sellingPrice: 110.00,
    location: 'Warehouse B'
  },
  { 
    id: '003', 
    name: 'Kids\' Everyday Runner', 
    category: 'Kids\' Shoes', 
    stockStatus: 'Out of Stock', 
    lastMovement: '2025-05-10', 
    supplier: 'YoungSteps', 
    imageUrl: 'https://picsum.photos/40/40?12',
    quantity: 0,
    costPrice: 35.00,
    sellingPrice: 45.00,
    location: 'Store A2'
  },
  { 
    id: '004', 
    name: 'Summer Floral Dress', 
    category: 'Dresses', 
    stockStatus: 'In Stock', 
    lastMovement: '2025-05-18', 
    supplier: 'Moda Fabrics', 
    imageUrl: 'https://picsum.photos/40/40?13',
    quantity: 85,
    costPrice: 30.00,
    sellingPrice: 75.00,
    location: 'Store A1'
  },
  { 
    id: '005', 
    name: 'Leather Loafers', 
    category: 'Men\'s Shoes', 
    stockStatus: 'In Stock', 
    lastMovement: '2025-05-15', 
    supplier: 'Atlas Footwear', 
    imageUrl: 'https://picsum.photos/40/40?14',
    quantity: 15,
    costPrice: 70.00,
    sellingPrice: 145.00,
    location: 'Store A3'
  },
  { 
    id: '006', 
    name: 'Canvas Slip-Ons', 
    category: 'Women\'s Shoes', 
    stockStatus: 'Low Stock', 
    lastMovement: '2025-04-30', 
    supplier: 'Luna Footwear', 
    imageUrl: 'https://picsum.photos/40/40?15',
    quantity: 200,
    costPrice: 20.00,
    sellingPrice: 55.00,
    location: 'Warehouse B'
  },
];

const getStockStatusStyles = (status: string) => {
    switch(status) {
        case 'In Stock': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
        case 'Low Stock': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
        case 'Out of Stock': return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
        default: return 'bg-zinc-800 text-zinc-400';
    }
};

const getSupplierStyles = (supplier: string) => {
    // Consistent styling for suppliers, could be randomized or mapped
    const styles = [
        'bg-indigo-500/20 text-indigo-400',
        'bg-blue-500/20 text-blue-400',
        'bg-purple-500/20 text-purple-400',
        'bg-fuchsia-500/20 text-fuchsia-400',
    ];
    // Simple hash to pick a color based on string length/char
    const index = supplier.length % styles.length;
    return styles[index];
}

export const InventoryTable = () => {
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Inventory Overview</h2>
      
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                    type="text" 
                    placeholder="Search for a product" 
                    className="w-full bg-dark-800 border border-dark-700 text-white pl-10 pr-12 py-2 rounded-lg text-sm focus:outline-none focus:border-dark-600 placeholder:text-zinc-600"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 border border-dark-600 px-1 rounded bg-dark-700 font-mono">⌘K</span>
            </div>
            <button className="px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-400 rounded-lg text-sm hover:text-white flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Last Movement
            </button>
            <button className="hidden sm:flex px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-400 rounded-lg text-sm hover:text-white items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Supplier
            </button>
             <button className="hidden sm:flex px-3 py-2 bg-dark-800 border border-dark-700 text-zinc-400 rounded-lg text-sm hover:text-white items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                Stock Status
            </button>
        </div>

        <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-dark-800 hover:bg-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Filter size={14} /> Filter
            </button>
            <button className="px-3 py-2 bg-dark-800 hover:bg-dark-700 text-zinc-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Download size={14} /> Export Inventory
            </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-zinc-300 uppercase tracking-wider pb-4 border-b border-dark-800 pl-4">
        <div className="col-span-1 flex items-center gap-2">
             <div className="w-4 h-4 border border-zinc-600 rounded"></div>
             ID
        </div>
        <div className="col-span-3 flex items-center gap-2"><Package size={12}/> Product Name</div>
        <div className="col-span-2 flex items-center gap-2">Category</div>
        <div className="col-span-2 flex items-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Stock Status</div>
        <div className="col-span-2 flex items-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Last Movement</div>
        <div className="col-span-2 flex items-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Supplier</div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {products.map((product, idx) => (
            <div key={product.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-dark-800 pl-4 hover:bg-dark-800/30 transition-colors text-sm text-zinc-300">
                <div className="col-span-1 flex items-center gap-3">
                    <div className="w-4 h-4 border border-zinc-600 rounded cursor-pointer hover:border-zinc-400"></div>
                    {product.id}
                </div>
                <div className="col-span-3 flex items-center gap-3">
                    <img src={product.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover bg-dark-800" />
                    <span className="truncate pr-2 font-medium text-white">{product.name}</span>
                </div>
                <div className="col-span-2 text-zinc-400">{product.category}</div>
                <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStockStatusStyles(product.stockStatus)}`}>
                        {product.stockStatus}
                    </span>
                </div>
                <div className="col-span-2 text-zinc-400 font-mono text-xs">{product.lastMovement}</div>
                <div className="col-span-2">
                     <span className={`px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap ${getSupplierStyles(product.supplier)}`}>
                        {product.supplier}
                     </span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
