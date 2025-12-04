-- Create enum for inventory status
CREATE TYPE public.inventory_status AS ENUM ('in_stock', 'low_stock', 'out_of_stock');

-- Create inventory_items table
CREATE TABLE public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
  minimum_stock DECIMAL(10,2) NOT NULL,
  status inventory_status NOT NULL DEFAULT 'in_stock',
  supplier_name VARCHAR(255),
  supplier_contact VARCHAR(100),
  purchase_cost DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL DEFAULT 'kg',
  last_restocked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies (accessible to everyone for now, can be restricted to admins later)
CREATE POLICY "Anyone can view inventory items"
  ON public.inventory_items
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert inventory items"
  ON public.inventory_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update inventory items"
  ON public.inventory_items
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete inventory items"
  ON public.inventory_items
  FOR DELETE
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_inventory_items_updated_at
  BEFORE UPDATE ON public.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample inventory data
INSERT INTO public.inventory_items (name, category, current_stock, minimum_stock, status, supplier_name, supplier_contact, purchase_cost, unit) VALUES
  ('Basmati Rice', 'Grains', 45.5, 50, 'low_stock', 'Delhi Grains Co.', '+91 98765 43210', 85.00, 'kg'),
  ('Coffee Beans', 'Beverages', 120, 30, 'in_stock', 'Coorg Coffee Traders', '+91 98765 43211', 450.00, 'kg'),
  ('Tomatoes', 'Vegetables', 25, 40, 'low_stock', 'Fresh Farm Supplies', '+91 98765 43212', 35.00, 'kg'),
  ('Chicken Breast', 'Meat', 0, 20, 'out_of_stock', 'Mumbai Meat Market', '+91 98765 43213', 280.00, 'kg'),
  ('Olive Oil', 'Cooking Oils', 85, 25, 'in_stock', 'International Foods Ltd', '+91 98765 43214', 650.00, 'liters'),
  ('Sugar', 'Dry Goods', 150, 50, 'in_stock', 'Sweet Suppliers', '+91 98765 43215', 45.00, 'kg'),
  ('Fresh Milk', 'Dairy', 15, 30, 'low_stock', 'Amul Dairy', '+91 98765 43216', 55.00, 'liters'),
  ('All Purpose Flour', 'Baking', 200, 100, 'in_stock', 'Aashirvaad Distributors', '+91 98765 43217', 40.00, 'kg');