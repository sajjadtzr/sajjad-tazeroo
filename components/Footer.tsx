import Link from 'next/link'
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-700/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold gradient-text">TechStore</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your premier destination for cutting-edge technology products. 
              We bring you the future of innovation with premium quality and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/products" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Products
              </Link>
              <Link href="/categories" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Categories
              </Link>
              <Link href="/about" className="block text-slate-400 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/support" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Support Center
              </Link>
              <Link href="/shipping" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link href="/warranty" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Warranty
              </Link>
              <Link href="/faq" className="block text-slate-400 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">support@techstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  123 Tech Street<br />
                  Innovation City, IC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 TechStore. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
    </footer>
  )
}