import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ShoppingCart, Plus, Minus, Trash2, Search, Utensils,
  CreditCard, IndianRupee, QrCode, Receipt, Users,
  Clock, CheckCircle2, Printer, Send, Table
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  is_available: boolean;
  preparation_time: number | null;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface TableData {
  id: string;
  table_number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

const StaffPanel = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<TableData[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuItems();
    fetchTables();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('category');

    if (!error && data) setMenuItems(data);
  };

  const fetchTables = async () => {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select('*')
      .order('table_number');

    if (!error && data) setTables(data);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05;
  const serviceCharge = subtotal * 0.10;
  const total = subtotal + gst + serviceCharge;

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast({ title: "Error", description: "Cart is empty", variant: "destructive" });
      return;
    }
    if (!selectedTable) {
      toast({ title: "Error", description: "Please select a table", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    // Create sales record
    const { error } = await supabase.from('sales_records').insert({
      order_id: `ORD-${Date.now()}`,
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total_amount: total,
      payment_method: paymentMethod,
      customer_name: customerName || null,
      customer_phone: customerPhone || null,
    });

    // Update table status
    await supabase
      .from('restaurant_tables')
      .update({ status: 'occupied' })
      .eq('id', selectedTable);

    setIsProcessing(false);

    if (error) {
      toast({ title: "Error", description: "Failed to place order", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Order placed successfully!" });
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    fetchTables();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Staff Order Panel</h1>
            <p className="text-sm text-muted-foreground">Quick order entry & billing</p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Table Selection */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Table className="w-5 h-5 text-primary" />
                    <Label className="font-semibold">Select Table:</Label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tables.map(table => (
                      <Button
                        key={table.id}
                        variant={selectedTable === table.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTable(table.id)}
                        className={`${
                          table.status === 'available' ? 'border-primary/50' :
                          table.status === 'occupied' ? 'border-destructive/50 bg-destructive/10' :
                          'border-amber-500/50 bg-amber-500/10'
                        }`}
                        disabled={table.status !== 'available' && selectedTable !== table.id}
                      >
                        T{table.table_number}
                        <Badge variant="secondary" className="ml-1 text-xs">
                          {table.capacity}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search & Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search menu items..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  Menu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <Tabs defaultValue={categories[0]} className="space-y-4">
                    <TabsList className="flex flex-wrap h-auto gap-2">
                      {categories.map(cat => (
                        <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                      ))}
                    </TabsList>

                    {categories.map(category => (
                      <TabsContent key={category} value={category}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <AnimatePresence>
                            {groupedItems[category]?.map((item, index) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.03 }}
                              >
                                <Card 
                                  className="cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all"
                                  onClick={() => addToCart(item)}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                      <Plus className="w-4 h-4 text-primary shrink-0" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-lg font-bold text-primary">₹{item.price}</span>
                                      {item.preparation_time && (
                                        <Badge variant="outline" className="text-xs gap-1">
                                          <Clock className="w-3 h-3" />
                                          {item.preparation_time}m
                                        </Badge>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Cart & Billing Section */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Order Summary
                  {cart.length > 0 && (
                    <Badge className="ml-auto">{cart.length} items</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Customer Name</Label>
                    <Input 
                      placeholder="Optional"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Phone</Label>
                    <Input 
                      placeholder="Optional"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Cart Items */}
                <ScrollArea className="h-[200px]">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p>Cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map(item => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <Separator />

                {/* Bill Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service (10%)</span>
                    <span>₹{serviceCharge.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'cash', label: 'Cash', icon: IndianRupee },
                      { value: 'card', label: 'Card', icon: CreditCard },
                      { value: 'upi', label: 'UPI', icon: QrCode },
                    ].map(method => (
                      <Button
                        key={method.value}
                        variant={paymentMethod === method.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPaymentMethod(method.value)}
                        className="gap-1"
                      >
                        <method.icon className="w-4 h-4" />
                        {method.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    disabled={cart.length === 0}
                  >
                    <Printer className="w-4 h-4" />
                    Print KOT
                  </Button>
                  <Button 
                    className="btn-primary gap-2"
                    onClick={handlePlaceOrder}
                    disabled={cart.length === 0 || !selectedTable || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </Button>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  disabled={cart.length === 0}
                >
                  <Receipt className="w-4 h-4" />
                  Generate Bill & Print
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPanel;
