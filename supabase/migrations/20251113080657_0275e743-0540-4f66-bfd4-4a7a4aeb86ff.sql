-- Create sales_records table for tracking all sales
CREATE TABLE public.sales_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR NOT NULL,
  total_amount NUMERIC NOT NULL,
  payment_method VARCHAR NOT NULL,
  items JSONB NOT NULL,
  customer_name VARCHAR,
  customer_phone VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer_feedback table
CREATE TABLE public.customer_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR,
  customer_phone VARCHAR,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  category VARCHAR NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table for tracking dish performance
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url VARCHAR,
  is_available BOOLEAN NOT NULL DEFAULT true,
  preparation_time INTEGER,
  total_orders INTEGER NOT NULL DEFAULT 0,
  total_revenue NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sales_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for sales_records
CREATE POLICY "Anyone can view sales records" ON public.sales_records FOR SELECT USING (true);
CREATE POLICY "Anyone can insert sales records" ON public.sales_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sales records" ON public.sales_records FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete sales records" ON public.sales_records FOR DELETE USING (true);

-- Create policies for customer_feedback
CREATE POLICY "Anyone can view feedback" ON public.customer_feedback FOR SELECT USING (true);
CREATE POLICY "Anyone can insert feedback" ON public.customer_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update feedback" ON public.customer_feedback FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete feedback" ON public.customer_feedback FOR DELETE USING (true);

-- Create policies for menu_items
CREATE POLICY "Anyone can view menu items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Anyone can insert menu items" ON public.menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update menu items" ON public.menu_items FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete menu items" ON public.menu_items FOR DELETE USING (true);

-- Create trigger for updated_at on sales_records
CREATE TRIGGER update_sales_records_updated_at
BEFORE UPDATE ON public.sales_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on menu_items
CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();