import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { FloorPlan } from '@/components/FloorPlan';
import { ReservationForm } from '@/components/ReservationForm';
import { ReservationsList } from '@/components/ReservationsList';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, List, CalendarPlus } from 'lucide-react';

interface Table {
  id: string;
  table_number: string;
  capacity: number;
  floor_x: number;
  floor_y: number;
  status: 'available' | 'occupied' | 'reserved';
}

interface Reservation {
  id: string;
  table_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  number_of_guests: number;
  reservation_date: string;
  reservation_time: string;
  advance_payment: number;
  payment_status: string;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  table?: {
    table_number: string;
  };
}

export const ReservationsTab = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTables();
    fetchReservations();
  }, []);

  const fetchTables = async () => {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select('*')
      .order('table_number');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tables',
        variant: 'destructive',
      });
      return;
    }

    setTables(data || []);
  };

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        table:restaurant_tables(table_number)
      `)
      .order('reservation_date', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load reservations',
        variant: 'destructive',
      });
      return;
    }

    setReservations(data || []);
  };

  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
  };

  const handleCreateReservation = async (formData: any) => {
    if (!selectedTable) {
      toast({
        title: 'Error',
        description: 'Please select a table first',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from('reservations').insert({
      table_id: selectedTable.id,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      customer_email: formData.customer_email || null,
      number_of_guests: formData.number_of_guests,
      reservation_date: formData.reservation_date.toISOString().split('T')[0],
      reservation_time: formData.reservation_time,
      advance_payment: formData.advance_payment || 0,
      payment_status: formData.advance_payment > 0 ? 'paid' : 'pending',
      special_requests: formData.special_requests || null,
      status: 'pending',
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create reservation',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Reservation created successfully',
    });

    // Update table status to reserved
    await supabase
      .from('restaurant_tables')
      .update({ status: 'reserved' })
      .eq('id', selectedTable.id);

    fetchTables();
    fetchReservations();
    setSelectedTable(null);
  };

  const handleUpdateReservationStatus = async (id: string, status: string) => {
    const validStatus = status as 'pending' | 'confirmed' | 'cancelled' | 'completed';
    const { error } = await supabase
      .from('reservations')
      .update({ status: validStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update reservation',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Reservation ${status}`,
    });

    fetchReservations();
  };

  const handleDeleteReservation = async (id: string) => {
    const { error } = await supabase.from('reservations').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete reservation',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Reservation deleted',
    });

    fetchReservations();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Tabs defaultValue="floor-plan" className="space-y-6">
        <TabsList>
          <TabsTrigger value="floor-plan">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Floor Plan
          </TabsTrigger>
          <TabsTrigger value="new-booking">
            <CalendarPlus className="w-4 h-4 mr-2" />
            New Booking
          </TabsTrigger>
          <TabsTrigger value="all-reservations">
            <List className="w-4 h-4 mr-2" />
            All Reservations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="floor-plan" className="space-y-6">
          <FloorPlan
            tables={tables}
            onTableSelect={handleTableSelect}
            selectedTableId={selectedTable?.id}
          />
        </TabsContent>

        <TabsContent value="new-booking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FloorPlan
              tables={tables}
              onTableSelect={handleTableSelect}
              selectedTableId={selectedTable?.id}
            />
            <ReservationForm
              tableNumber={selectedTable?.table_number}
              onSubmit={handleCreateReservation}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="all-reservations">
          <ReservationsList
            reservations={reservations}
            onUpdateStatus={handleUpdateReservationStatus}
            onDelete={handleDeleteReservation}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ReservationsTab;
