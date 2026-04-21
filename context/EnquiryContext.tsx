"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";

interface EnquiryContextType {
  openEnquiry: (serviceName?: string) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState("");

  const openEnquiry = (serviceName?: string) => {
    // If the event object itself is passed by mistake, catch it.
    if (typeof serviceName === 'object') {
       setInitialService("");
    } else {
       setInitialService(serviceName || "");
    }
    setIsOpen(true);
  };

  const closeEnquiry = () => setIsOpen(false);

  return (
    <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      <EnquiryModal 
        isOpen={isOpen} 
        onClose={closeEnquiry} 
        initialService={initialService} 
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
