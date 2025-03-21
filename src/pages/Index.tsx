
import { motion } from 'framer-motion';
import { ChevronRight, UserPlus, Users, Calendar, Clock, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';

const featureItems = [
  {
    icon: Users,
    title: 'Doctor Management',
    description: 'Manage doctor profiles, specializations, and availability for efficient scheduling and patient care.',
    link: '/doctors'
  },
  {
    icon: UserPlus,
    title: 'Patient Management',
    description: 'Comprehensive patient records including medical history, treatment plans, and visit information.',
    link: '/patients'
  },
  {
    icon: Calendar,
    title: 'Appointment System',
    description: 'Streamlined appointment booking, rescheduling, and reminders for patients and medical staff.',
    link: '/appointments'
  }
];

const statsItems = [
  { label: 'Registered Doctors', value: '45+' },
  { label: 'Happy Patients', value: '5000+' },
  { label: 'Years Experience', value: '10+' },
  { label: 'Medical Awards', value: '15+' }
];

const benefitItems = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate scheduling, record-keeping, and administrative tasks to focus more on patient care.'
  },
  {
    icon: Shield,
    title: 'Enhanced Security',
    description: 'Secure electronic health records with role-based access control and data encryption.'
  },
  {
    icon: Activity,
    title: 'Improved Care',
    description: 'Better coordination between departments leading to improved patient outcomes and satisfaction.'
  }
];

export default function Index() {
  return (
    <PageLayout noPadding>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50" />
        <div 
          className="absolute inset-0 opacity-20"  
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=2071&auto=format&fit=crop")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }} 
        />
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.span 
              className="inline-block mb-3 text-sm font-medium px-3 py-1 bg-blue-100 text-primary rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Modern Healthcare Management
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Transforming Healthcare Management with Technology
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Streamline your hospital operations with our comprehensive management system designed for doctors, patients, and administrative staff.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button asChild size="lg" className="rounded-full">
                <Link to="/appointments">Book Appointment <ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/doctors">View Doctors</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,218.7C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Comprehensive Healthcare Management Modules
            </h2>
            <p className="text-muted-foreground">
              Our platform offers integrated modules designed to streamline every aspect of hospital management, from patient records to staff scheduling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-soft transition-all duration-300 hover:shadow-elevation">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <Button asChild variant="outline" className="group">
                      <Link to={feature.link}>
                        Explore 
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsItems.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-display font-bold mb-2">{stat.value}</p>
                <p className="text-sm md:text-base text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block mb-3 text-sm font-medium px-3 py-1 bg-blue-100 text-primary rounded-full">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Why Choose Our Hospital Management System?</h2>
              <p className="text-muted-foreground mb-8">
                Our comprehensive solution is designed to address the unique challenges faced by modern healthcare facilities, streamlining operations and improving patient care.
              </p>
              
              <div className="space-y-8">
                {benefitItems.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex"
                  >
                    <div className="mr-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -right-6 -top-6 w-64 h-64 bg-blue-100 rounded-full opacity-70"></div>
              <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-blue-200 rounded-full opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2574&auto=format&fit=crop" 
                alt="Doctor with digital tablet" 
                className="relative z-10 rounded-xl shadow-elevation w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Healthcare Management?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of healthcare professionals who have streamlined their operations and improved patient care with our system.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/appointments">Get Started Today <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
