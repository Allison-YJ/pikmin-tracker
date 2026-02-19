
export enum PikminColor {
  RED = 'Red',
  YELLOW = 'Yellow',
  BLUE = 'Blue',
  WHITE = 'White',
  PURPLE = 'Purple',
  ROCK = 'Rock',
  WINGED = 'Winged',
  ICE = 'Ice',
  GLOW = 'Glow'
}

export enum PikminStatus {
  SEEDLING = 'Seedling',
  PIKMIN = 'Pikmin',
  DECOR = 'Decor'
}

export type DecorType = 
  | 'Roadside' | 'Restaurant' | 'Cafe' | 'Sweet Shop' | 'Movie Theater' 
  | 'Pharmacy' | 'Zoo' | 'Forest' | 'Water' | 'Post Office' 
  | 'Art Gallery' | 'Airport' | 'Station' | 'Beach' | 'Burger Shop' 
  | 'Library' | 'Supermarket' | 'Bakery' | 'Park' | 'Hair Salon' 
  | 'Clothes Store' | 'Weather' | 'Mountain' | 'Theme Park' | 'Bus Stop' 
  | 'Bridge' | 'Hotel' | 'Makeup' | 'Curry Shop' | 'Appliance Store';

export interface PikminEntry {
  id: string;
  name: string;
  color: PikminColor;
  decorType: DecorType;
  status: PikminStatus;
  createdAt: number;
}
