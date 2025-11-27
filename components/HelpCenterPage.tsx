
import React, { useState } from 'react';
import { Search, Book, ShoppingBag, Package, Truck, MessageCircle, FileText, ChevronRight, PlayCircle, ExternalLink } from 'lucide-react';

const CategoryCard = ({ icon: Icon, title, desc, articles }: { icon: any, title: string, desc: string, articles: number }) => (
  <div className="bg-dark-900 border border-dark-800 hover:border-dark-700 rounded-xl p-6 cursor-pointer transition-all hover:bg-dark-800/30 group">
    <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
      <Icon size={24} className="text-zinc-400 group-hover:text-primary-400 transition-colors" />
    </div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-sm text-zinc-400 mb-4 h-10">{desc}</p>
    <div className="flex items-center text-xs font-medium text-primary-400">
      {articles} articles <ChevronRight size={14} className="ml-1" />
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-dark-800">
      <button 
        className="w-full py-4 flex items-center justify-between text-left hover:text-white transition-colors text-zinc-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <ChevronRight size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-zinc-400 leading-relaxed animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
};

export const HelpCenterPage = () => {
  return (
    <div className="flex flex-col h-full gap-8 overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-dark-900 to-dark-950 border border-dark-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500"></div>
        <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[200%] bg-primary-500/5 blur-3xl rounded-full transform rotate-12 pointer-events-none"></div>
        
        <h1 className="text-3xl font-bold text-white mb-4 relative z-10">How can we help you today?</h1>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">Search our knowledge base for answers to common questions, or browse the categories below.</p>
        
        <div className="max-w-xl mx-auto relative z-10">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search for articles, e.g. 'How to add inventory'" 
            className="w-full bg-dark-950/80 backdrop-blur-md border border-dark-700 text-white pl-12 pr-4 py-4 rounded-xl shadow-lg focus:outline-none focus:border-primary-500 transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CategoryCard 
            icon={Book} 
            title="Getting Started" 
            desc="Learn the basics of Agora ERP, account setup, and importing your initial data."
            articles={8}
          />
          <CategoryCard 
            icon={Package} 
            title="Inventory Management" 
            desc="Everything about adding products, stock adjustments, and categories."
            articles={14}
          />
          <CategoryCard 
            icon={ShoppingBag} 
            title="Sales & POS" 
            desc="How to process sales, handle returns, and use the voice assistant."
            articles={12}
          />
          <CategoryCard 
            icon={Truck} 
            title="Suppliers & Ordering" 
            desc="Managing suppliers, purchase orders, and lead time analytics."
            articles={9}
          />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* FAQs */}
        <section className="flex-1 bg-dark-900 border border-dark-800 rounded-xl p-6">
           <h2 className="text-lg font-semibold text-white mb-2">Frequently Asked Questions</h2>
           <p className="text-sm text-zinc-500 mb-6">Quick answers to the most common questions.</p>
           
           <div className="flex flex-col">
             <FAQItem 
               question="How do I use the AI Voice Assistant?" 
               answer="Click the microphone icon in the 'Add Sale' or 'New Purchase' panels. Speak clearly, describing the product and quantity. For example, 'Sold 2 pairs of White Sneakers'. Agora will parse this into a transaction automatically." 
             />
             <FAQItem 
               question="Can I import inventory from Excel/CSV?" 
               answer="Yes. Go to Inventory > Manage Inventory > Import. We support standard CSV formats. You can download a template from that page to ensure your data is formatted correctly." 
             />
             <FAQItem 
               question="How are low stock alerts calculated?" 
               answer="You can set a 'Reorder Point' for each product. By default, any item with less than 10 units is considered 'Low Stock'. You can customize this in Settings > Inventory Alerts." 
             />
             <FAQItem 
               question="How do I add a new supplier?" 
               answer="Navigate to the Suppliers page and click 'New Supplier' in the top right. You'll need to provide a name and contact email at minimum. Lead times update automatically based on purchase history." 
             />
             <FAQItem 
               question="What happens if I lose internet connection?" 
               answer="Agora ERP has an offline mode for sales. You can continue adding sales to the cart. They will sync to the cloud automatically once your connection is restored." 
             />
           </div>
        </section>

        {/* Contact / Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
             <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400">
                <PlayCircle size={20} />
             </div>
             <h3 className="text-white font-semibold mb-1">Video Tutorials</h3>
             <p className="text-sm text-zinc-400 mb-4">Watch step-by-step guides on how to master Agora features.</p>
             <button className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center gap-1">
                Visit Video Library <ExternalLink size={12} />
             </button>
          </div>

          <div className="bg-gradient-to-b from-dark-800 to-dark-900 border border-dark-700 rounded-xl p-6 text-center">
             <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <MessageCircle size={24} />
             </div>
             <h3 className="text-white font-semibold mb-2">Still need help?</h3>
             <p className="text-sm text-zinc-400 mb-6">Our support team is available 24/7 to assist you with any issues.</p>
             <div className="flex flex-col gap-3">
               <button className="w-full py-2.5 bg-white text-dark-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                  Chat with Support
               </button>
               <button className="w-full py-2.5 bg-dark-800 text-white border border-dark-700 font-medium rounded-lg hover:bg-dark-700 transition-colors">
                  Send an Email
               </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
