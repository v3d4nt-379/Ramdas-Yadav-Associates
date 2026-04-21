"use client";

import { useEnquiry } from "@/context/EnquiryContext";

interface Props {
  serviceTitle?: string;
  className?: string;
  text?: string;
}

export default function EnquiryButton({ 
  serviceTitle, 
  className = "bg-primary-container text-black font-bold uppercase px-10 py-5 tracking-widest text-sm hover:bg-white transition-colors", 
  text = "Get Consultation" 
}: Props) {
  const { openEnquiry } = useEnquiry();
  
  return (
    <button 
      onClick={() => openEnquiry(serviceTitle)}
      className={className}
    >
      {text}
    </button>
  );
}
