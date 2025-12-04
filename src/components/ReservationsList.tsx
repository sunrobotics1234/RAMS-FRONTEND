import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Phone, Mail, IndianRupee, Trash2, CheckCircle, XCircle } from 'lucide-react';

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

interface ReservationsListProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const ReservationsList = ({ reservations, onUpdateStatus, onDelete }: ReservationsListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Reservations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reservations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No reservations found
          </div>
        ) : (
          reservations.map((reservation) => (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{reservation.customer_name}</h3>
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {reservation.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateStatus(reservation.id, 'confirmed')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateStatus(reservation.id, 'cancelled')}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(reservation.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(reservation.reservation_date), 'PPP')}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {reservation.reservation_time}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {reservation.number_of_guests} guests
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {reservation.customer_phone}
                </div>
                {reservation.customer_email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {reservation.customer_email}
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IndianRupee className="w-4 h-4" />
                  Advance: ₹{reservation.advance_payment}
                </div>
              </div>

              {reservation.table && (
                <div className="text-sm">
                  <Badge variant="outline">Table {reservation.table.table_number}</Badge>
                </div>
              )}

              {reservation.special_requests && (
                <div className="text-sm">
                  <span className="font-medium">Special Requests: </span>
                  <span className="text-muted-foreground">{reservation.special_requests}</span>
                </div>
              )}
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
