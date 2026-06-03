import { Timestamp } from 'firebase/firestore';

// ─── CUSTOMER ───────────────────────────────────────────────
export interface Customer {
  customer_id: string;
  cust_name: string;
  cust_phone: string;
  cust_email: string;
  createdAt: Timestamp;
}

// ─── ENQUIRY ────────────────────────────────────────────────
export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'closed';

export interface Enquiry {
  enquiry_id: string;
  customer_id: string;
  cust_name: string;
  cust_phone: string;
  cust_email: string;
  service_name: string;
  enquiry_message: string;
  enquiry_status: EnquiryStatus;
  createdAt: Timestamp;
}

// ─── SERVICE ────────────────────────────────────────────────
export type ServiceCategory = 'Registration' | 'Tax' | 'Business';
export type ServiceType = 'fixed' | 'consultation';

export interface Service {
  service_id: string;
  service_name: string;
  service_category: ServiceCategory;
  service_description: string;
  service_price: number; // in paise (₹10 = 1000)
  service_type: ServiceType;
  icon: string;
  points: string[];
  slug: string;
  isActive: boolean;
}

// ─── ORDER ──────────────────────────────────────────────────
export type OrderStatus =
  | 'placed'
  | 'initiated'
  | 'documents_requested'
  | 'in_progress'
  | 'completed'
  | 'declined_refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  order_id: string;
  customer_id: string;
  cust_name: string;
  cust_phone: string;
  cust_email: string;
  service_id: string;
  service_name: string;
  service_price: number;
  order_message: string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_id: string;
  razorpay_order_id: string;
  payment_method?: string;
  tracking_link: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── PAYMENT ────────────────────────────────────────────────
export interface Payment {
  payment_id: string;
  order_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  amount: number;
  status: 'paid' | 'failed' | 'refunded';
  method?: string;
  razorpay_refund_id?: string;
  createdAt: Timestamp;
}

// ─── UI HELPERS ─────────────────────────────────────────────
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: 'Placed',
  initiated: 'Initiated',
  documents_requested: 'Documents Requested',
  in_progress: 'In Progress',
  completed: 'Completed',
  declined_refunded: 'Declined & Refunded',
};

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  in_progress: 'In Progress',
  closed: 'Closed',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  placed: 'bg-blue-100 text-blue-800',
  initiated: 'bg-yellow-100 text-yellow-800',
  documents_requested: 'bg-orange-100 text-orange-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  declined_refunded: 'bg-red-100 text-red-800',
};

export const ENQUIRY_STATUS_COLORS: Record<EnquiryStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-purple-100 text-purple-800',
  closed: 'bg-zinc-100 text-zinc-800',
};
