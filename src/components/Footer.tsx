
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-farm-green font-bold text-xl">Farm</span>
              <span className="text-farm-orange font-bold text-xl">Direct</span>
            </div>
            <p className="text-sm">
              Connecting local farmers directly with buyers. Fresh produce, fair prices, and sustainable practices.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-farm-green transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm hover:text-farm-green transition-colors">Shop</Link></li>
              <li><Link to="/auth/login" className="text-sm hover:text-farm-green transition-colors">Login</Link></li>
              <li><Link to="/auth/signup" className="text-sm hover:text-farm-green transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@farmdirect.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Farm Lane, Harvest City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs">© {new Date().getFullYear()} Farm Direct. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-xs hover:text-farm-green">Privacy Policy</a></li>
              <li><a href="#" className="text-xs hover:text-farm-green">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
