'use client';

import React, { useState } from 'react';

interface Item {
  name: string;
  price: number;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stock: number;
}

const MARKET_ITEMS: Item[] = [
  {
    name: "Phoenix Feather",
    price: 500,
    icon: "🪶",
    description: "A rare feather that glows with eternal flame",
    rarity: "epic",
    stock: 3
  },
  {
    name: "Dragon Scale",
    price: 1000,
    icon: "🐉",
    description: "Impervious to normal fire",
    rarity: "legendary",
    stock: 1
  },
  {
    name: "Mana Crystal",
    price: 100,
    icon: "💎",
    description: "Stores pure magical energy",
    rarity: "rare",
    stock: 10
  },
  {
    name: "Healing Herb",
    price: 50,
    icon: "🌿",
    description: "Common but effective healing plant",
    rarity: "common",
    stock: 20
  },
  {
    name: "Enchanted Scroll",
    price: 200,
    icon: "📜",
    description: "Contains ancient magical wisdom",
    rarity: "rare",
    stock: 5
  }
];

const RARITY_COLORS = {
  common: 'border-gray-400 bg-gray-500/20',
  rare: 'border-blue-400 bg-blue-500/20',
  epic: 'border-purple-400 bg-purple-500/20',
  legendary: 'border-orange-400 bg-orange-500/20'
};

const MagicalMarket: React.FC = () => {
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [showCart, setShowCart] = useState<boolean>(false);

  const addToCart = (item: Item) => {
    if ((cart.get(item.name) || 0) < item.stock) {
      setCart(new Map(cart.set(item.name, (cart.get(item.name) || 0) + 1)));
    }
  };

  const removeFromCart = (itemName: string) => {
    const newCart = new Map(cart);
    if (newCart.get(itemName) === 1) {
      newCart.delete(itemName);
    } else {
      newCart.set(itemName, (newCart.get(itemName) || 0) - 1);
    }
    setCart(newCart);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((quantity, itemName) => {
      const item = MARKET_ITEMS.find(i => i.name === itemName);
      if (item) {
        total += item.price * quantity;
      }
    });
    return total;
  };

  return (
    <div className="w-full max-w-[700px] h-[700px] overflow-auto bg-slate-900 text-white p-6 rounded-lg relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            🏪 Mystical Marketplace 🏪
          </h1>
          <p className="text-blue-300">Rare and magical items for sale</p>
        </div>

        {/* Cart Toggle Button */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="fixed top-4 right-4 bg-blue-500/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          {showCart ? '🏪' : '🛒'} {cart.size > 0 && `(${[...cart.values()].reduce((a, b) => a + b, 0)})`}
        </button>

        {showCart ? (
          /* Cart View */
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
            {[...cart.entries()].map(([itemName, quantity]) => {
              const item = MARKET_ITEMS.find(i => i.name === itemName)!;
              return (
                <div key={itemName} 
                     className={`p-4 rounded-lg border ${RARITY_COLORS[item.rarity]} 
                              transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="flex justify-between items-center">
                    <span>
                      {item.icon} {itemName} x{quantity}
                    </span>
                    <div className="space-x-2">
                      <span>{item.price * quantity} 🪙</span>
                      <button
                        onClick={() => removeFromCart(itemName)}
                        className="bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/40 transition-colors"
                      >
                        ➖
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {cart.size > 0 ? (
              <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
                <div className="text-xl font-bold">Total: {calculateTotal()} 🪙</div>
                <button 
                  className="w-full mt-2 bg-green-500/20 p-2 rounded hover:bg-green-500/40 transition-colors"
                  onClick={() => setCart(new Map())}
                >
                  ✨ Purchase ✨
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400">Your cart is empty</div>
            )}
          </div>
        ) : (
          /* Market View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARKET_ITEMS.map((item) => (
              <div
                key={item.name}
                className={`p-4 rounded-lg border ${RARITY_COLORS[item.rarity]}
                         transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xl">{item.icon} {item.name}</span>
                  <span className="text-lg">{item.price} 🪙</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    Stock: {item.stock - (cart.get(item.name) || 0)}/{item.stock}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={(cart.get(item.name) || 0) >= item.stock}
                    className="bg-blue-500/20 px-3 py-1 rounded hover:bg-blue-500/40 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart ➕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicalMarket;