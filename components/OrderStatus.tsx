'use client';

import { Check, ChefHat, Package, Clock } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '@/types';

interface OrderStatusProps {
  status: OrderStatusType;
  orderId: string;
  pickupTime?: string;
}

const steps = [
  { key: 'received', label: 'Order Received', icon: Clock, color: 'bg-blue-500' },
  { key: 'preparing', label: 'Cooking', icon: ChefHat, color: 'bg-orange-500' },
  { key: 'ready', label: 'Ready for Pickup', icon: Package, color: 'bg-green-500' },
  { key: 'completed', label: 'Completed', icon: Check, color: 'bg-gray-500' },
];

const statusIndex: Record<OrderStatusType, number> = {
  received: 0,
  preparing: 1,
  ready: 2,
  completed: 3,
};

export default function OrderStatus({ status, orderId, pickupTime }: OrderStatusProps) {
  const currentIdx = statusIndex[status];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900">Order #{orderId}</h3>
          {pickupTime && (
            <p className="text-sm text-gray-500">Pickup at {pickupTime}</p>
          )}
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Progress tracker */}
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-700"
            style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="flex justify-between relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx <= currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div key={step.key} className="flex flex-col items-center gap-2 w-20">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                  isDone
                    ? `${step.color} text-white shadow-lg ${isCurrent ? 'scale-110 ring-4 ring-offset-2 ring-amber-300' : ''}`
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs text-center leading-tight font-medium ${
                  isDone ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: OrderStatusType }) {
  const config: Record<OrderStatusType, { label: string; class: string }> = {
    received: { label: 'Received', class: 'bg-blue-100 text-blue-700' },
    preparing: { label: 'Preparing', class: 'bg-orange-100 text-orange-700' },
    ready: { label: '✓ Ready!', class: 'bg-green-100 text-green-700' },
    completed: { label: 'Completed', class: 'bg-gray-100 text-gray-600' },
  };
  const c = config[status];
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.class}`}>
      {c.label}
    </span>
  );
}
