import { Cycle } from "./cycle";

export interface Order {
    id?: number; 
    cycle: Cycle; 
    quantity: number;
    totalPrice: number;
    orderDate?: Date; 
    returned: boolean;
  }