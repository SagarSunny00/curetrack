
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  UserPlus, 
  Menu, 
  X, 
  Home,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Doctors', href: '/doctors', icon: Users },
  { label: 'Patients', href: '/patients', icon: UserPlus },
  { label: 'Appointments', href: '/appointments', icon: Calendar },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-medium"
        >
          <Heart className="h-6 w-6 text-primary animate-pulse" />
          <span className="font-display">MediCare</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-1 font-medium transition-all hover:text-primary",
                location.pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Button>Login</Button>
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        "md:hidden pt-24"
      )}>
        <nav className="flex flex-col space-y-6 p-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 text-lg font-medium p-2 rounded-md transition-all",
                location.pathname === item.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <Button className="mt-4 w-full">Login</Button>
        </nav>
      </div>
    </header>
  );
}
