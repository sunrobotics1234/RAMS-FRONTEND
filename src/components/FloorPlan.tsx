import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface Table {
  id: string;
  table_number: string;
  capacity: number;
  floor_x: number;
  floor_y: number;
  status: 'available' | 'occupied' | 'reserved';
}

interface FloorPlanProps {
  tables: Table[];
  onTableSelect: (table: Table) => void;
  selectedTableId?: string;
}

export const FloorPlan = ({ tables, onTableSelect, selectedTableId }: FloorPlanProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600';
      case 'occupied':
        return 'bg-red-500 hover:bg-red-600';
      case 'reserved':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-muted hover:bg-muted/80';
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-sm">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500" />
          <span className="text-sm">Reserved</span>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-background border-2 border-dashed rounded-lg overflow-hidden">
        {tables.map((table) => (
          <motion.button
            key={table.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTableSelect(table)}
            className={`absolute rounded-lg shadow-lg transition-all cursor-pointer ${
              getStatusColor(table.status)
            } ${selectedTableId === table.id ? 'ring-4 ring-primary' : ''}`}
            style={{
              left: `${table.floor_x}px`,
              top: `${table.floor_y}px`,
              width: '80px',
              height: '80px',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-white">
              <Users className="w-5 h-5 mb-1" />
              <span className="font-bold text-sm">{table.table_number}</span>
              <span className="text-xs">({table.capacity})</span>
            </div>
          </motion.button>
        ))}
      </div>
    </Card>
  );
};
