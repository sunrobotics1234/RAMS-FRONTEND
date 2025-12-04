-- Create enum for table status
CREATE TYPE public.table_status AS ENUM ('available', 'occupied', 'reserved');

-- Create enum for reservation status  
CREATE TYPE public.reservation_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create restaurant tables
CREATE TABLE public.restaurant_tables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_number VARCHAR(10) NOT NULL UNIQUE,
  capacity INT NOT NULL,
  floor_x INT NOT NULL,
  floor_y INT NOT NULL,
  status public.table_status NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_id UUID NOT NULL REFERENCES public.restaurant_tables(id) ON DELETE CASCADE,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(15) NOT NULL,
  customer_email VARCHAR(255),
  number_of_guests INT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  advance_payment DECIMAL(10, 2) DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'pending',
  special_requests TEXT,
  status public.reservation_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for restaurant_tables (public read, no auth required for demo)
CREATE POLICY "Anyone can view tables"
ON public.restaurant_tables
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert tables"
ON public.restaurant_tables
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update tables"
ON public.restaurant_tables
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete tables"
ON public.restaurant_tables
FOR DELETE
USING (true);

-- RLS Policies for reservations (public access for demo)
CREATE POLICY "Anyone can view reservations"
ON public.reservations
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create reservations"
ON public.reservations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update reservations"
ON public.reservations
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete reservations"
ON public.reservations
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_restaurant_tables_updated_at
BEFORE UPDATE ON public.restaurant_tables
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample tables for floor plan
INSERT INTO public.restaurant_tables (table_number, capacity, floor_x, floor_y, status) VALUES
('T1', 2, 50, 50, 'available'),
('T2', 4, 200, 50, 'available'),
('T3', 4, 350, 50, 'available'),
('T4', 6, 500, 50, 'available'),
('T5', 2, 50, 200, 'available'),
('T6', 4, 200, 200, 'available'),
('T7', 4, 350, 200, 'available'),
('T8', 8, 500, 200, 'available');