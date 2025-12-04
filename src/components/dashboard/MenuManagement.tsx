import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Edit2, Trash2, Search, Upload, Image, 
  Utensils, Clock, IndianRupee, Filter, Grid3X3, List
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  image_url: string | null;
  is_available: boolean;
  preparation_time: number | null;
  total_orders: number;
  total_revenue: number;
}

const categories = [
  "Appetizers", "Main Course", "Desserts", "Beverages", 
  "Breads", "Rice & Biryani", "Salads", "Soups"
];

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image_url: "",
    is_available: true,
    preparation_time: "",
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch menu items", variant: "destructive" });
      return;
    }
    setMenuItems(data || []);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const itemData = {
      name: formData.name,
      description: formData.description || null,
      category: formData.category,
      price: parseFloat(formData.price),
      image_url: formData.image_url || null,
      is_available: formData.is_available,
      preparation_time: formData.preparation_time ? parseInt(formData.preparation_time) : null,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('menu_items')
        .update(itemData)
        .eq('id', editingItem.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update item", variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Menu item updated" });
    } else {
      const { error } = await supabase
        .from('menu_items')
        .insert(itemData);

      if (error) {
        toast({ title: "Error", description: "Failed to add item", variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Menu item added" });
    }

    resetForm();
    fetchMenuItems();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Menu item deleted" });
    fetchMenuItems();
  };

  const toggleAvailability = async (item: MenuItem) => {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available })
      .eq('id', item.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update availability", variant: "destructive" });
      return;
    }
    fetchMenuItems();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image_url: "",
      is_available: true,
      preparation_time: "",
    });
    setEditingItem(null);
    setIsAddDialogOpen(false);
  };

  const openEditDialog = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description || "",
      category: item.category,
      price: item.price.toString(),
      image_url: item.image_url || "",
      is_available: item.is_available,
      preparation_time: item.preparation_time?.toString() || "",
    });
    setEditingItem(item);
    setIsAddDialogOpen(true);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary">Menu Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage your menu items</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else setIsAddDialogOpen(true); }}>
            <DialogTrigger asChild>
              <Button className="btn-primary gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                <DialogDescription>Fill in the details for the menu item</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input 
                    placeholder="Item name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price (₹) *</Label>
                  <Input 
                    type="number"
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prep Time (mins)</Label>
                  <Input 
                    type="number"
                    placeholder="15" 
                    value={formData.preparation_time}
                    onChange={(e) => setFormData({...formData, preparation_time: e.target.value})}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Describe the dish..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input 
                    placeholder="https://..." 
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch 
                    checked={formData.is_available}
                    onCheckedChange={(checked) => setFormData({...formData, is_available: checked})}
                  />
                  <Label>Available</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={handleSubmit} className="btn-primary">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
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
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Tabs defaultValue={Object.keys(groupedItems)[0] || "all"} className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-2">
          {Object.keys(groupedItems).map(category => (
            <TabsTrigger key={category} value={category} className="gap-2">
              <Utensils className="w-4 h-4" />
              {category}
              <Badge variant="secondary" className="ml-1">{groupedItems[category].length}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedItems).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <AnimatePresence mode="popLayout">
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
                : "space-y-3"
              }>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === "grid" ? (
                      <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]">
                        <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Utensils className="w-12 h-12 text-muted-foreground/30" />
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            </div>
                            <Switch 
                              checked={item.is_available}
                              onCheckedChange={() => toggleAvailability(item)}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">₹{item.price}</span>
                              {item.preparation_time && (
                                <Badge variant="outline" className="gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.preparation_time}m
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                            <span>{item.total_orders} orders</span>
                            <span className="mx-2">•</span>
                            <span>₹{item.total_revenue.toLocaleString()} revenue</span>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <Utensils className="w-6 h-6 text-muted-foreground/30" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">₹{item.price}</p>
                              <p className="text-xs text-muted-foreground">{item.total_orders} orders</p>
                            </div>
                            <Switch 
                              checked={item.is_available}
                              onCheckedChange={() => toggleAvailability(item)}
                            />
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>

      {filteredItems.length === 0 && (
        <Card className="p-12 text-center">
          <Utensils className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No menu items found</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first menu item</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add First Item
          </Button>
        </Card>
      )}
    </div>
  );
};
