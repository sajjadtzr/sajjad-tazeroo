'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface CartDropdownProps {
  onClose: () => void
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (items.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className="absolute right-0 top-12 w-80 glass-strong rounded-lg shadow-xl border border-slate-700/50 p-6 z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Shopping Cart</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">Your cart is empty</p>
          <Link
            href="/products"
            onClick={onClose}
            className="inline-block btn-gradient text-white px-6 py-2 rounded-lg font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-96 glass-strong rounded-lg shadow-xl border border-slate-700/50 z-50 max-h-96 overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Shopping Cart</h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="p-4 border-b border-slate-700/30 last:border-b-0">
            <div className="flex items-center space-x-3">
              {item.image && (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium line-clamp-1">{item.name}</h4>
                <p className="text-slate-400 text-xs">{item.sku}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-400 font-medium text-sm">
                    ${item.price.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors"
                    >
                      <Minus className="h-3 w-3 text-slate-300" />
                    </button>
                    
                    <span className="text-white text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-3 w-3 text-slate-300" />
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-slate-400 hover:text-red-400 transition-colors ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-300">Total:</span>
          <span className="text-xl font-bold gradient-text">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-2">
          <Link
            href="/cart"
            onClick={onClose}
            className="block w-full text-center py-2 px-4 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full text-center py-2 px-4 btn-gradient text-white rounded-lg font-medium"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}