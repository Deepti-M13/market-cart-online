
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-farm-green font-bold text-2xl">Farm</span>
          <span className="text-farm-orange font-bold text-2xl">Direct</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-gray-700 hover:text-farm-green ${location.pathname === '/' ? 'font-medium text-farm-green' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-gray-700 hover:text-farm-green ${location.pathname.startsWith('/products') ? 'font-medium text-farm-green' : ''}`}
          >
            Shop
          </Link>
          {user?.role === 'farmer' && (
            <Link 
              to="/farmer/dashboard" 
              className={`text-gray-700 hover:text-farm-green ${location.pathname.startsWith('/farmer') ? 'font-medium text-farm-green' : ''}`}
            >
              Farmer Dashboard
            </Link>
          )}
          {!user && (
            <>
              <Link 
                to="/auth/login" 
                className={`text-gray-700 hover:text-farm-green ${location.pathname === '/auth/login' ? 'font-medium text-farm-green' : ''}`}
              >
                Log In
              </Link>
              <Link to="/auth/signup">
                <Button variant="default" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {(user?.role === 'buyer' || !user) && (
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-farm-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          )}
          
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`block py-2 ${location.pathname === '/' ? 'font-medium text-farm-green' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`block py-2 ${location.pathname.startsWith('/products') ? 'font-medium text-farm-green' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            {user?.role === 'farmer' && (
              <Link 
                to="/farmer/dashboard" 
                className={`block py-2 ${location.pathname.startsWith('/farmer') ? 'font-medium text-farm-green' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Farmer Dashboard
              </Link>
            )}
            {!user && (
              <>
                <Link 
                  to="/auth/login" 
                  className={`block py-2 ${location.pathname === '/auth/login' ? 'font-medium text-farm-green' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/auth/signup" 
                  className="block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="default" size="sm" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
