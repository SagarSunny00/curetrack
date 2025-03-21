
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock appointment data
const appointmentsData = [
  {
    id: 1,
    patientName: 'John Smith',
    patientId: 'P-1001',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    date: '2023-11-10',
    time: '09:00 AM',
    status: 'Scheduled',
    type: 'Follow-up',
    notes: 'Regular check-up for hypertension management.'
  },
  {
    id: 2,
    patientName: 'Emma Wilson',
    patientId: 'P-1002',
    doctorName: 'Dr. Michael Patel',
    department: 'Orthopedics',
    date: '2023-11-10',
    time: '10:30 AM',
    status: 'Confirmed',
    type: 'Consultation',
    notes: 'Knee pain assessment.'
  },
  {
    id: 3,
    patientName: 'Sophia Martinez',
    patientId: 'P-1004',
    doctorName: 'Dr. James Wilson',
    department: 'Neurology',
    date: '2023-11-10',
    time: '11:45 AM',
    status: 'Canceled',
    type: 'Follow-up',
    notes: 'Patient canceled due to scheduling conflict.'
  },
  {
    id: 4,
    patientName: 'David Johnson',
    patientId: 'P-1005',
    doctorName: 'Dr. Olivia Martinez',
    department: 'Dermatology',
    date: '2023-11-10',
    time: '02:15 PM',
    status: 'Completed',
    type: 'Procedure',
    notes: 'Skin biopsy completed. Results pending.'
  },
  {
    id: 5,
    patientName: 'Ava Williams',
    patientId: 'P-1006',
    doctorName: 'Dr. Robert Kim',
    department: 'Psychiatry',
    date: '2023-11-11',
    time: '09:30 AM',
    status: 'Scheduled',
    type: 'Therapy',
    notes: 'Regular therapy session.'
  },
  {
    id: 6,
    patientName: 'Robert Chen',
    patientId: 'P-1003',
    doctorName: 'Dr. Emily Chen',
    department: 'Pediatrics',
    date: '2023-11-11',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Checkup',
    notes: 'Annual physical examination.'
  },
  {
    id: 7,
    patientName: 'Isabella Garcia',
    patientId: 'P-1008',
    doctorName: 'Dr. James Wilson',
    department: 'Neurology',
    date: '2023-11-11',
    time: '01:00 PM',
    status: 'Scheduled',
    type: 'Consultation',
    notes: 'New patient consultation for recurring headaches.'
  },
  {
    id: 8,
    patientName: 'Michael Brown',
    patientId: 'P-1007',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    date: '2023-11-12',
    time: '11:30 AM',
    status: 'Scheduled',
    type: 'Follow-up',
    notes: 'Follow-up after medication adjustment.'
  }
];

// Calendar days for the month of November 2023
const calendarDays = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2023, 10, i + 1); // November is 10 (0-indexed)
  return {
    date: date,
    dayOfMonth: date.getDate(),
    dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
    appointmentsCount: appointmentsData.filter(a => 
      a.date === `2023-11-${(i + 1).toString().padStart(2, '0')}`
    ).length
  };
});

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2023-11-10');
  
  // Filter appointments based on search, status and date
  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesDate = appointment.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-none">
            <Clock className="h-3 w-3 mr-1" /> Scheduled
          </Badge>
        );
      case 'confirmed':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-none">
            <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-none">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-none">
            <XCircle className="h-3 w-3 mr-1" /> Canceled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-none">
            <AlertCircle className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-display font-bold">Appointment Management</h1>
            <p className="text-muted-foreground">Schedule and manage patient appointments</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <Tabs defaultValue="calendar">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="mt-6">
              <Card className="border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">November 2023</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before November 1st (Wed) */}
                    {Array(3).fill(null).map((_, index) => (
                      <div key={`empty-${index}`} className="h-20"></div>
                    ))}
                    
                    {calendarDays.map((day) => (
                      <div 
                        key={day.dayOfMonth}
                        className={`border rounded-lg p-2 h-20 transition-all duration-200 ${
                          selectedDate === `2023-11-${day.dayOfMonth.toString().padStart(2, '0')}` 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/30 hover:bg-primary/5'
                        } cursor-pointer`}
                        onClick={() => setSelectedDate(`2023-11-${day.dayOfMonth.toString().padStart(2, '0')}`)}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{day.dayOfMonth}</span>
                          {day.appointmentsCount > 0 && (
                            <Badge className="bg-primary/10 text-primary border-none">
                              {day.appointmentsCount}
                            </Badge>
                          )}
                        </div>
                        
                        {day.appointmentsCount > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {day.appointmentsCount} appointment{day.appointmentsCount > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">
                  Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search appointments..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="border-none shadow-soft hover:shadow-elevation transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                                  <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium">{appointment.patientName}</h4>
                                    <span className="text-sm text-muted-foreground">({appointment.patientId})</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {appointment.type} with {appointment.doctorName} • {appointment.department}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center text-sm">
                                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                      <span>{appointment.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                      <span>{appointment.time}</span>
                                    </div>
                                    {getStatusBadge(appointment.status)}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 self-end md:self-center">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Appointments Found</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        There are no appointments scheduled for this date that match your search criteria.
                      </p>
                      <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <Card className="border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search appointments..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Patient</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Doctor</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Date & Time</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-4 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-right py-4 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointmentsData
                          .filter(appointment => {
                            const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                              appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                              appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
                            
                            const matchesStatus = statusFilter === 'all' || appointment.status.toLowerCase() === statusFilter.toLowerCase();
                            
                            return matchesSearch && matchesStatus;
                          })
                          .map((appointment) => (
                            <tr 
                              key={appointment.id}
                              className="border-b border-border hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                    <User className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{appointment.patientName}</p>
                                    <p className="text-xs text-muted-foreground">{appointment.patientId}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <p>{appointment.doctorName}</p>
                                <p className="text-xs text-muted-foreground">{appointment.department}</p>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <div className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">{appointment.type}</td>
                              <td className="py-4 px-4">
                                {getStatusBadge(appointment.status)}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm">Edit</Button>
                                  <Button size="sm">Details</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    
                    {appointmentsData
                      .filter(appointment => {
                        const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                          appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                          appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
                        
                        const matchesStatus = statusFilter === 'all' || appointment.status.toLowerCase() === statusFilter.toLowerCase();
                        
                        return matchesSearch && matchesStatus;
                      }).length === 0 && (
                        <div className="py-8 text-center text-muted-foreground">
                          No appointments found matching your search criteria.
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-xl font-medium mb-4">Quick Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Today's Appointments</p>
                    <p className="text-3xl font-bold mt-1">8</p>
                  </div>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Completed</p>
                    <p className="text-3xl font-bold mt-1">3</p>
                  </div>
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Scheduled</p>
                    <p className="text-3xl font-bold mt-1">12</p>
                  </div>
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Canceled</p>
                    <p className="text-3xl font-bold mt-1">2</p>
                  </div>
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
