
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-medium">MediCare</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A modern healthcare management system designed to provide exceptional 
              patient care while streamlining hospital operations.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              {['Emergency Care', 'Doctor Consultations', 'Online Appointments', 'Medical Records', 'Lab Tests'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Doctors', href: '/doctors' },
                { label: 'Patients', href: '/patients' },
                { label: 'Appointments', href: '/appointments' },
                { label: 'About Us', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Healthcare Blvd, Medical District, Cityname 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">contact@medicare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MediCare. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
