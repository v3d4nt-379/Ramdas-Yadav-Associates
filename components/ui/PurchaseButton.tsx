"use client";

import { useState } from 'react';
import PurchaseModal from './PurchaseModal';

interface PurchaseButtonProps {
  serviceId: string;
  serviceName: string;
  servicePricePaise: number;
  className?: string;
}

export default function PurchaseButton({
  serviceId,
  serviceName,
  servicePricePaise,
  className = "w-full bg-yellow-500 text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors text-center shadow-lg hover:shadow-xl"
}: PurchaseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayPrice = `\u20B9${(servicePricePaise / 100).toLocaleString('en-IN')}`;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        Buy Now — {displayPrice}
      </button>
      <PurchaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceId={serviceId}
        serviceName={serviceName}
        servicePricePaise={servicePricePaise}
      />
    </>
  );
}
