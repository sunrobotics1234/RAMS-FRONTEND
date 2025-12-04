import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, ChefHat, Utensils, TrendingUp, DollarSign, 
  Clock, ShoppingBag, LogOut, UserPlus, Shield, 
  BarChart3, Activity, Calendar, CalendarCheck, Warehouse, Sparkles,
  Brain, CreditCard, Menu
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { ReportsSection } from '@/components/dashboard/ReportsSection';
import { SalesAnalytics } from '@/components/dashboard/SalesAnalytics';
import { MenuManagement } from '@/components/dashboard/MenuManagement';
import { AIForecasting } from '@/components/dashboard/AIForecasting';
import { BillingConfiguration } from '@/components/dashboard/BillingConfiguration';

const ReservationsTab = lazy(() => import('./Reservations'));

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'captain' | 'chef' | 'waiter' | 'manager';
  status: 'active' | 'offline';
  shift: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: '1', name: 'John Martinez', email: 'john@restaurant.com', role: 'captain', status: 'active', shift: 'Morning' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@restaurant.com', role: 'chef', status: 'active', shift: 'Morning' },
    { id: '3', name: 'Mike Johnson', email: 'mike@restaurant.com', role: 'waiter', status: 'active', shift: 'Evening' },
    { id: '4', name: 'Emma Davis', email: 'emma@restaurant.com', role: 'chef', status: 'offline', shift: 'Evening' },
  ]);

  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'waiter' as const, shift: 'Morning' });

  const handleLogout = () => {
    logout();
    navigate('/auth');
    toast({ title: 'Logged out successfully' });
  };

  const handleRoleChange = (staffId: string, newRole: string) => {
    setStaff(staff.map(s => s.id === staffId ? { ...s, role: newRole as any } : s));
    toast({ title: 'Role updated successfully', description: 'Staff member role has been updated.' });
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    const member: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role,
      status: 'active',
      shift: newStaff.shift
    };
    setStaff([...staff, member]);
    setNewStaff({ name: '', email: '', role: 'waiter', shift: 'Morning' });
    toast({ title: 'Staff added successfully' });
  };

  const stats = [
    { label: 'Total Revenue', value: '₹24,580', change: '+12.5%', icon: DollarSign, color: 'text-green-500' },
    { label: 'Orders Today', value: '156', change: '+8.2%', icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'Active Staff', value: staff.filter(s => s.status === 'active').length.toString(), change: 'Online', icon: Users, color: 'text-purple-500' },
    { label: 'Avg Wait Time', value: '12 min', change: '-2.3 min', icon: Clock, color: 'text-orange-500' },
  ];

  const recentOrders = [
    { id: '#1234', table: '12', items: 'Burger, Fries, Coke', amount: '₹24.50', status: 'Preparing' },
    { id: '#1235', table: '8', items: 'Pizza Margherita', amount: '₹18.00', status: 'Ready' },
    { id: '#1236', table: '5', items: 'Pasta Carbonara, Wine', amount: '₹32.00', status: 'Delivered' },
  ];

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">DaddyRestro Admin</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Shield className="w-4 h-4" />
              {user.role}
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change} from yesterday</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="overview"><BarChart3 className="w-4 h-4 mr-1" />Overview</TabsTrigger>
            <TabsTrigger value="reports"><TrendingUp className="w-4 h-4 mr-1" />Reports</TabsTrigger>
            <TabsTrigger value="menu"><Menu className="w-4 h-4 mr-1" />Menu</TabsTrigger>
            <TabsTrigger value="ai-forecast"><Brain className="w-4 h-4 mr-1" />AI Forecast</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="w-4 h-4 mr-1" />Billing</TabsTrigger>
            <TabsTrigger value="reservations"><CalendarCheck className="w-4 h-4 mr-1" />Reservations</TabsTrigger>
            <TabsTrigger value="inventory"><Warehouse className="w-4 h-4 mr-1" />Inventory</TabsTrigger>
            <TabsTrigger value="staff"><Users className="w-4 h-4 mr-1" />Staff</TabsTrigger>
            <TabsTrigger value="orders"><Activity className="w-4 h-4 mr-1" />Orders</TabsTrigger>
            <TabsTrigger value="mystical-analytics"><Sparkles className="w-4 h-4 mr-1" />Mystical</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Last 7 days performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex items-center gap-4">
                      <span className="text-sm w-12">{day}</span>
                      <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${60 + i * 5}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="h-full bg-primary"
                        />
                      </div>
                      <span className="text-sm font-medium w-16 text-right">₹{(2000 + i * 400).toLocaleString()}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Dishes Today</CardTitle>
                  <CardDescription>Most ordered items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Classic Burger', orders: 45, revenue: '₹450' },
                    { name: 'Margherita Pizza', orders: 38, revenue: '₹684' },
                    { name: 'Caesar Salad', orders: 32, revenue: '₹384' },
                    { name: 'Pasta Carbonara', orders: 28, revenue: '₹560' },
                  ].map((dish, i) => (
                    <div key={dish.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Utensils className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{dish.name}</p>
                          <p className="text-sm text-muted-foreground">{dish.orders} orders</p>
                        </div>
                      </div>
                      <span className="font-semibold">{dish.revenue}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <ReportsSection />
            <SalesAnalytics />
          </TabsContent>

          {/* Menu Management Tab */}
          <TabsContent value="menu" className="space-y-6">
            <MenuManagement />
          </TabsContent>

          {/* AI Forecasting Tab */}
          <TabsContent value="ai-forecast" className="space-y-6">
            <AIForecasting />
          </TabsContent>

          {/* Billing Configuration Tab */}
          <TabsContent value="billing" className="space-y-6">
            <BillingConfiguration />
          </TabsContent>

          {/* Mystical Analytics Tab */}
          <TabsContent value="mystical-analytics" className="space-y-6">
            <InteractiveDemo showSubtitle={false} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹18,420</div>
                  <p className="text-sm text-green-500 mt-1">+15.3% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Average Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹24.50</div>
                  <p className="text-sm text-green-500 mt-1">+3.2% increase</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Peak Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7-9 PM</div>
                  <p className="text-sm text-muted-foreground mt-1">Most busy period</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <ReservationsTab />
            </Suspense>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Inventory Access</CardTitle>
                <CardDescription>Manage your restaurant inventory and stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access the full inventory management system to track stock levels, supplier information, and automated low-stock alerts.
                </p>
                <Button onClick={() => navigate('/inventory')} className="btn-primary">
                  <Warehouse className="w-4 h-4 mr-2" />
                  Go to Inventory
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Management Tab */}
          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Staff Member</CardTitle>
                <CardDescription>Assign roles and manage your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      placeholder="Full Name" 
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="email@example.com"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={newStaff.role} onValueChange={(v: any) => setNewStaff({...newStaff, role: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waiter">Waiter</SelectItem>
                        <SelectItem value="chef">Chef</SelectItem>
                        <SelectItem value="captain">Captain</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Shift</Label>
                    <Select value={newStaff.shift} onValueChange={(v) => setNewStaff({...newStaff, shift: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddStaff} className="mt-4">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Staff Member
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Staff</CardTitle>
                <CardDescription>Manage roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {member.role === 'chef' ? <ChefHat className="w-6 h-6 text-primary" /> : <Users className="w-6 h-6 text-primary" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{member.shift}</span>
                        <Select value={member.role} onValueChange={(v) => handleRoleChange(member.id, v)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="waiter">Waiter</SelectItem>
                            <SelectItem value="chef">Chef</SelectItem>
                            <SelectItem value="captain">Captain</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
                <CardDescription>Real-time order tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{order.id}</span>
                          <Badge variant="outline">Table {order.table}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{order.amount}</span>
                        <Badge variant={
                          order.status === 'Preparing' ? 'secondary' : 
                          order.status === 'Ready' ? 'default' : 'outline'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
