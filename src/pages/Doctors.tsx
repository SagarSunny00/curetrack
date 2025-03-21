
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, Mail, CalendarClock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// Mockup data for doctors
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: '12 years',
    rating: 4.8,
    reviews: 124,
    availability: 'Mon, Wed, Fri',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    bio: 'Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management.'
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    experience: '15 years',
    rating: 4.9,
    reviews: 186,
    availability: 'Tue, Thu, Sat',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop',
    bio: 'Dr. Wilson is an expert neurologist with extensive experience in treating complex neurological disorders.'
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrics',
    experience: '8 years',
    rating: 4.7,
    reviews: 93,
    availability: 'Mon, Tue, Fri',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2787&auto=format&fit=crop',
    bio: 'Dr. Chen is a compassionate pediatrician dedicated to providing exceptional care for children of all ages.'
  },
  {
    id: 4,
    name: 'Dr. Michael Patel',
    specialty: 'Orthopedics',
    experience: '20 years',
    rating: 4.9,
    reviews: 215,
    availability: 'Wed, Thu, Sat',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop',
    bio: 'Dr. Patel is a renowned orthopedic surgeon specializing in sports medicine and joint replacement procedures.'
  },
  {
    id: 5,
    name: 'Dr. Olivia Martinez',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: 4.6,
    reviews: 78,
    availability: 'Mon, Wed, Fri',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=2787&auto=format&fit=crop',
    bio: 'Dr. Martinez provides comprehensive dermatological services for both medical and cosmetic skin conditions.'
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Psychiatry',
    experience: '14 years',
    rating: 4.7,
    reviews: 156,
    availability: 'Tue, Thu, Sat',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2940&auto=format&fit=crop',
    bio: 'Dr. Kim is a compassionate psychiatrist with expertise in mood disorders, anxiety, and PTSD treatment.'
  },
];

// Specialty filter options
const specialties = ['All Specialties', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry'];

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  
  // Filter doctors based on search term and selected specialty
  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Doctors</h1>
          <p className="text-muted-foreground">
            Meet our team of experienced and dedicated healthcare professionals committed to providing exceptional care.
          </p>
        </motion.div>
        
        {/* Search and Filter */}
        <motion.div 
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative bg-white shadow-soft rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or specialty" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    className="cursor-pointer whitespace-nowrap"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Card className="overflow-hidden h-full border-none shadow-soft hover:shadow-elevation transition-all duration-300">
                  <div className="relative h-64">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white text-primary border-none px-3 py-1 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                        <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-1">{doctor.name}</h3>
                    <p className="text-primary font-medium mb-3">{doctor.specialty}</p>
                    <p className="text-muted-foreground text-sm mb-4">{doctor.bio}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Available: {doctor.availability}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{doctor.name.toLowerCase().replace(' ', '.')}@medicare.com</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">+1 (555) 123-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">View Profile</Button>
                      <Button asChild className="flex-1">
                        <Link to="/appointments">Book Appointment</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('All Specialties');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
