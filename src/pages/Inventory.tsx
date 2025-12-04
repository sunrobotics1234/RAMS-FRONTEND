import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingDown, AlertTriangle, Plus, Search, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  current_stock: number;
  minimum_stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  supplier_name: string | null;
  supplier_contact: string | null;
  purchase_cost: number;
  unit: string;
  last_restocked: string | null;
}

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch inventory items",
        variant: "destructive",
      });
      return;
    }

    setInventory(data || []);
  };

  const updateStock = async (id: string, newStock: number) => {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    let newStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
    if (newStock === 0) newStatus = 'out_of_stock';
    else if (newStock <= item.minimum_stock) newStatus = 'low_stock';

    const { error } = await supabase
      .from('inventory_items')
      .update({ 
        current_stock: newStock, 
        status: newStatus,
        last_restocked: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update stock",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Stock updated successfully",
    });
    fetchInventory();
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(inventory.map(item => item.category)));
  const lowStockCount = inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.current_stock * item.purchase_cost), 0);
  const avgStockLevel = inventory.length > 0 
    ? Math.round((inventory.filter(i => i.status === 'in_stock').length / inventory.length) * 100)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-accent text-accent-foreground";
      case "low_stock": return "bg-secondary text-secondary-foreground";
      case "out_of_stock": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-accent";
      case "low_stock": return "bg-secondary";
      case "out_of_stock": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const calculatePercentage = (current: number, minimum: number) => {
    return Math.min((current / (minimum * 2)) * 100, 100);
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Inventory</h1>
            <p className="text-muted-foreground mt-2">Track stock levels and manage orders</p>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="btn-glass">
                ← Back to Dashboard
              </Button>
            </Link>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary hover:scale-105 transition-transform">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>Add a new item to your inventory</DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                  Feature coming soon - use the backend to add items directly
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
              <p className="text-xs text-muted-foreground">Total items</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockCount}</div>
              <p className="text-xs text-muted-foreground">Need reorder</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(totalValue / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground">Current stock</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Health</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgStockLevel}%</div>
              <p className="text-xs text-muted-foreground">In stock</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search items..." 
                  className="pl-10 border-border/50 focus:border-primary transition-colors"
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory List */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Stock Status</CardTitle>
            <CardDescription>Current inventory levels and reorder points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredInventory.map((item) => (
                <div key={item.id} className="border border-border/50 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge className={getStatusColor(item.status)} variant="secondary">
                        {getStatusLabel(item.status)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{item.current_stock} {item.unit}</div>
                      <div className="text-sm text-muted-foreground">Min: {item.minimum_stock} {item.unit}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Purchase Cost:</span>
                        <span className="font-medium ml-2">₹{item.purchase_cost}/{item.unit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Value:</span>
                        <span className="font-medium ml-2">₹{(item.current_stock * item.purchase_cost).toFixed(2)}</span>
                      </div>
                    </div>

                    {item.supplier_name && (
                      <div className="flex items-center gap-4 text-sm bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.supplier_name}</span>
                        </div>
                        {item.supplier_contact && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{item.supplier_contact}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${getProgressColor(item.status)}`}
                        style={{ width: `${calculatePercentage(item.current_stock, item.minimum_stock)}%` }}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="hover:scale-105 transition-transform flex-1"
                        onClick={() => {
                          const newStock = prompt(`Enter new stock amount for ${item.name}:`, item.current_stock.toString());
                          if (newStock !== null && !isNaN(Number(newStock))) {
                            updateStock(item.id, Number(newStock));
                          }
                        }}
                      >
                        Update Stock
                      </Button>
                      <Button 
                        size="sm" 
                        className={`${item.status === 'out_of_stock' || item.status === 'low_stock' ? 'btn-primary' : 'btn-secondary'} hover:scale-105 transition-transform flex-1`}
                        onClick={() => {
                          toast({
                            title: "Reorder Initiated",
                            description: `Reordering ${item.name} from ${item.supplier_name || 'supplier'}`,
                          });
                        }}
                      >
                        {item.status === 'out_of_stock' || item.status === 'low_stock' ? 'Reorder Now' : 'Add to Cart'}
                      </Button>
                    </div>

                    {item.last_restocked && (
                      <div className="text-xs text-muted-foreground text-center pt-2">
                        Last restocked: {new Date(item.last_restocked).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;