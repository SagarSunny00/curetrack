
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, Edit, Trash2, Calendar, Phone, Mail, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import PageLayout from '@/components/layout/PageLayout';
import { Link } from 'react-router-dom';

// Mock patient data
const patientsData = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    contact: '+1 (555) 123-4567',
    email: 'john.smith@example.com',
    lastVisit: '2023-10-15',
    nextAppointment: '2023-11-10',
    status: 'Active',
    doctor: 'Dr. Sarah Johnson',
    healthCondition: 'Hypertension'
  },
  {
    id: 2,
    name: 'Emma Wilson',
    age: 32,
    gender: 'Female',
    contact: '+1 (555) 987-6543',
    email: 'emma.wilson@example.com',
    lastVisit: '2023-10-20',
    nextAppointment: '2023-11-15',
    status: 'Active',
    doctor: 'Dr. Michael Patel',
    healthCondition: 'Diabetes Type 2'
  },
  {
    id: 3,
    name: 'Robert Chen',
    age: 58,
    gender: 'Male',
    contact: '+1 (555) 456-7890',
    email: 'robert.chen@example.com',
    lastVisit: '2023-09-30',
    nextAppointment: null,
    status: 'Inactive',
    doctor: 'Dr. Emily Chen',
    healthCondition: 'Arthritis'
  },
  {
    id: 4,
    name: 'Sophia Martinez',
    age: 27,
    gender: 'Female',
    contact: '+1 (555) 234-5678',
    email: 'sophia.martinez@example.com',
    lastVisit: '2023-10-25',
    nextAppointment: '2023-11-20',
    status: 'Active',
    doctor: 'Dr. James Wilson',
    healthCondition: 'Asthma'
  },
  {
    id: 5,
    name: 'David Johnson',
    age: 63,
    gender: 'Male',
    contact: '+1 (555) 876-5432',
    email: 'david.johnson@example.com',
    lastVisit: '2023-10-05',
    nextAppointment: '2023-11-05',
    status: 'Active',
    doctor: 'Dr. Olivia Martinez',
    healthCondition: 'Coronary Heart Disease'
  },
  {
    id: 6,
    name: 'Ava Williams',
    age: 41,
    gender: 'Female',
    contact: '+1 (555) 345-6789',
    email: 'ava.williams@example.com',
    lastVisit: '2023-10-10',
    nextAppointment: '2023-11-12',
    status: 'Active',
    doctor: 'Dr. Robert Kim',
    healthCondition: 'Migraine'
  },
  {
    id: 7,
    name: 'Michael Brown',
    age: 52,
    gender: 'Male',
    contact: '+1 (555) 654-3210',
    email: 'michael.brown@example.com',
    lastVisit: '2023-09-28',
    nextAppointment: null,
    status: 'Inactive',
    doctor: 'Dr. Sarah Johnson',
    healthCondition: 'COPD'
  },
  {
    id: 8,
    name: 'Isabella Garcia',
    age: 36,
    gender: 'Female',
    contact: '+1 (555) 432-1098',
    email: 'isabella.garcia@example.com',
    lastVisit: '2023-10-22',
    nextAppointment: '2023-11-18',
    status: 'Active',
    doctor: 'Dr. James Wilson',
    healthCondition: 'Anxiety Disorder'
  }
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter patients based on search term and status
  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.healthCondition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && patient.status === 'Active') ||
                         (statusFilter === 'inactive' && patient.status === 'Inactive');
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-display font-bold">Patient Management</h1>
            <p className="text-muted-foreground">Manage and monitor patient records and appointments</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button asChild>
              <Link to="#">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Patient
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <Tabs defaultValue="patients" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="patients">All Patients</TabsTrigger>
              <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patients" className="mt-6">
              <Card className="border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search patients..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full md:w-auto">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter: {statusFilter === 'all' ? 'All' : statusFilter === 'active' ? 'Active' : 'Inactive'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Patients</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active Patients</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>Inactive Patients</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Patient</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Contact</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Doctor</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Last Visit</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-right py-4 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.length > 0 ? (
                          filteredPatients.map((patient) => (
                            <tr 
                              key={patient.id} 
                              className="border-b border-border hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                    <span className="font-medium text-primary">
                                      {patient.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium">{patient.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {patient.age} years, {patient.gender}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm">
                                  <div className="flex items-center">
                                    <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                    <span>{patient.contact}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                    <span>{patient.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">{patient.doctor}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span>{patient.lastVisit}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <Badge 
                                  variant={patient.status === 'Active' ? 'default' : 'secondary'}
                                  className={patient.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                                >
                                  {patient.status}
                                </Badge>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="outline" asChild>
                                    <Link to={`/patients/${patient.id}`}>
                                      <FileText className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                              No patients found matching your search criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-6">
              <Card className="border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {patientsData
                      .filter(patient => patient.nextAppointment !== null)
                      .sort((a, b) => new Date(a.nextAppointment!).getTime() - new Date(b.nextAppointment!).getTime())
                      .map((patient) => (
                        <motion.div
                          key={patient.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border border-border rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                <span className="font-medium text-primary">
                                  {patient.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {patient.age} years, {patient.gender}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-none">
                              Upcoming
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{patient.nextAppointment}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{patient.healthCondition}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{patient.doctor}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" size="sm">
                              Reschedule
                            </Button>
                            <Button className="flex-1" size="sm">
                              View Details
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                  
                  {patientsData.filter(patient => patient.nextAppointment !== null).length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      No upcoming appointments found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Patients</p>
                  <p className="text-3xl font-bold mt-1">{patientsData.length}</p>
                </div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Active Patients</p>
                  <p className="text-3xl font-bold mt-1">
                    {patientsData.filter(p => p.status === 'Active').length}
                  </p>
                </div>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Appointments Today</p>
                  <p className="text-3xl font-bold mt-1">4</p>
                </div>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">New This Month</p>
                  <p className="text-3xl font-bold mt-1">12</p>
                </div>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
}

// Missing icon import
import { Activity, User } from 'lucide-react';
