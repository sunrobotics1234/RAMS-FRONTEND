import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, Users, TrendingUp, CheckCircle, AlertTriangle, 
  Flame, UtensilsCrossed, Bike, ShoppingBag, Filter, RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

type OrderType = "all" | "dine-in" | "takeaway" | "online";
type OrderStatus = "preparing" | "cooking" | "ready";

interface Order {
  id: string;
  items: string[];
  table: number | null;
  time: string;
  status: OrderStatus;
  priority: "high" | "medium" | "low";
  type: OrderType;
  customerName?: string;
}

const Kitchen = () => {
  const [orderTypeFilter, setOrderTypeFilter] = useState<OrderType>("all");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const orders: Order[] = [
    { id: "ORD-001", items: ["Butter Chicken", "Naan", "Rice"], table: 12, time: "8 min", status: "preparing", priority: "high", type: "dine-in" },
    { id: "ORD-002", items: ["Caesar Salad", "Grilled Salmon"], table: 7, time: "12 min", status: "ready", priority: "medium", type: "dine-in" },
    { id: "ORD-003", items: ["Pasta Carbonara", "Garlic Bread"], table: null, time: "5 min", status: "cooking", priority: "low", type: "takeaway", customerName: "Rahul" },
    { id: "ORD-004", items: ["Biryani", "Raita"], table: 15, time: "15 min", status: "preparing", priority: "high", type: "dine-in" },
    { id: "ORD-005", items: ["Pizza Margherita", "Coke"], table: null, time: "10 min", status: "cooking", priority: "medium", type: "online", customerName: "Swiggy - Amit" },
    { id: "ORD-006", items: ["Tandoori Platter", "Naan Basket"], table: null, time: "18 min", status: "preparing", priority: "high", type: "online", customerName: "Zomato - Priya" },
    { id: "ORD-007", items: ["Paneer Tikka", "Roti"], table: null, time: "6 min", status: "ready", priority: "low", type: "takeaway", customerName: "Vikram" },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesType = orderTypeFilter === "all" || order.type === orderTypeFilter;
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const stats = {
    total: orders.length,
    preparing: orders.filter(o => o.status === "preparing").length,
    cooking: orders.filter(o => o.status === "cooking").length,
    ready: orders.filter(o => o.status === "ready").length,
    dineIn: orders.filter(o => o.type === "dine-in").length,
    takeaway: orders.filter(o => o.type === "takeaway").length,
    online: orders.filter(o => o.type === "online").length,
  };

  const getTypeIcon = (type: OrderType) => {
    switch (type) {
      case "dine-in": return UtensilsCrossed;
      case "takeaway": return ShoppingBag;
      case "online": return Bike;
      default: return UtensilsCrossed;
    }
  };

  const getTypeColor = (type: OrderType) => {
    switch (type) {
      case "dine-in": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "takeaway": return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
      case "online": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kitchen Display</h1>
            <p className="text-muted-foreground mt-1">Live orders and kitchen operations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">← Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="p-4 border border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Active</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </Card>
          <Card className="p-4 border border-border/50 hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Preparing</p>
                <p className="text-2xl font-bold text-amber-500">{stats.preparing}</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
          </Card>
          <Card className="p-4 border border-border/50 hover:border-orange-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Cooking</p>
                <p className="text-2xl font-bold text-orange-500">{stats.cooking}</p>
              </div>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
          </Card>
          <Card className="p-4 border border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold text-primary">{stats.ready}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
          </Card>
          <Card className="p-4 border border-blue-500/30 bg-blue-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Dine-in</p>
                <p className="text-2xl font-bold text-blue-500">{stats.dineIn}</p>
              </div>
              <UtensilsCrossed className="w-5 h-5 text-blue-500" />
            </div>
          </Card>
          <Card className="p-4 border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Takeaway</p>
                <p className="text-2xl font-bold text-amber-600">{stats.takeaway}</p>
              </div>
              <ShoppingBag className="w-5 h-5 text-amber-600" />
            </div>
          </Card>
          <Card className="p-4 border border-purple-500/30 bg-purple-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-purple-500">{stats.online}</p>
              </div>
              <Bike className="w-5 h-5 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Order Type:</span>
            </div>
            <Tabs value={orderTypeFilter} onValueChange={(v) => setOrderTypeFilter(v as OrderType)}>
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="dine-in" className="gap-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  Dine-in
                </TabsTrigger>
                <TabsTrigger value="takeaway" className="gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Takeaway
                </TabsTrigger>
                <TabsTrigger value="online" className="gap-2">
                  <Bike className="w-4 h-4" />
                  Online
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium">Status:</span>
              <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="preparing">Preparing</TabsTrigger>
                  <TabsTrigger value="cooking">Cooking</TabsTrigger>
                  <TabsTrigger value="ready">Ready</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </Card>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order, index) => {
              const TypeIcon = getTypeIcon(order.type);
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className={`border-l-4 ${
                    order.priority === 'high' ? 'border-l-destructive' :
                    order.priority === 'medium' ? 'border-l-amber-500' :
                    'border-l-primary'
                  } hover:shadow-lg transition-all`}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">{order.id}</span>
                          <Badge className={getTypeColor(order.type)}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {order.type}
                          </Badge>
                        </div>
                        <Badge className={`${
                          order.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {order.priority}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        {order.table ? (
                          <p className="text-sm font-medium">Table {order.table}</p>
                        ) : (
                          <p className="text-sm font-medium text-purple-500">{order.customerName}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.items.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <Badge className={`${
                          order.status === 'ready' ? 'bg-primary text-primary-foreground' :
                          order.status === 'cooking' ? 'bg-orange-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {order.status === 'preparing' ? '🍳 Preparing' : 
                           order.status === 'cooking' ? '🔥 Cooking' : '✅ Ready'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{order.time}</span>
                        </div>
                      </div>

                      <Progress 
                        value={order.status === "ready" ? 100 : order.status === "cooking" ? 65 : 30} 
                        className="h-2 mb-4"
                      />

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          {order.status === 'preparing' ? 'Start Cooking' : 
                           order.status === 'cooking' ? 'Mark Ready' : 'Served'}
                        </Button>
                        <Button size="sm" className="flex-1 text-xs bg-primary text-primary-foreground">
                          {order.status === 'ready' ? 'Complete' : 'Update'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredOrders.length === 0 && (
          <Card className="p-12 text-center">
            <CheckCircle className="w-12 h-12 mx-auto text-primary/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">No orders match the current filters</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Kitchen;