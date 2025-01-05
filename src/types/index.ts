export interface Staff {
    id: string;
    name: string;
    position: string;
    department: string;
    phone?: string;
  }
  
  export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    category: 'feed' | 'medicine' | 'equipment';
  }
  
  export interface DailyReport {
    id: string;
    date: string;
    pondId: string;
    temperature: number;
    ph: number;
    oxygen: number;
    notes: string;
  }