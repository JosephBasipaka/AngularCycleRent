export interface Cart {
    id: number;
    cycle: {
        id: number;
        brand: string; 
        stock: number; 
        price: number; 
    };
    quantity : number;
    totalPrice : number;
  }