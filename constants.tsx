import React from 'react';
import { PikminColor, PikminStatus, DecorType } from './types';

export const DECOR_TYPES: DecorType[] = [
  'Roadside', 'Restaurant', 'Cafe', 'Sweet Shop', 'Movie Theater', 
  'Pharmacy', 'Zoo', 'Forest', 'Water', 'Post Office', 
  'Art Gallery', 'Airport', 'Station', 'Beach', 'Burger Shop', 
  'Library', 'Supermarket', 'Bakery', 'Park', 'Hair Salon', 
  'Clothes Store', 'Weather', 'Mountain', 'Theme Park', 'Bus Stop', 
  'Bridge', 'Hotel', 'Makeup', 'Curry Shop', 'Appliance Store'
];

export const PIKMIN_COLORS: PikminColor[] = [
  PikminColor.RED, PikminColor.YELLOW, PikminColor.BLUE, 
  PikminColor.WHITE, PikminColor.PURPLE, PikminColor.ROCK, 
  PikminColor.WINGED, PikminColor.ICE, PikminColor.GLOW
];

export const PIKMIN_STATUSES: PikminStatus[] = [
  PikminStatus.SEEDLING, PikminStatus.PIKMIN, PikminStatus.DECOR
];

export const COLOR_CLASSES: Record<PikminColor, string> = {
  [PikminColor.RED]: 'bg-red-500',
  [PikminColor.YELLOW]: 'bg-yellow-400',
  [PikminColor.BLUE]: 'bg-blue-500',
  [PikminColor.WHITE]: 'bg-slate-300',
  [PikminColor.PURPLE]: 'bg-purple-600',
  [PikminColor.ROCK]: 'bg-slate-700',
  [PikminColor.WINGED]: 'bg-pink-400',
  [PikminColor.ICE]: 'bg-cyan-300',
  [PikminColor.GLOW]: 'bg-emerald-400',
};

export const STATUS_ICONS: Record<PikminStatus, React.ReactNode> = {
  [PikminStatus.SEEDLING]: <i className="fa-solid fa-seedling text-green-500"></i>,
  [PikminStatus.PIKMIN]: <i className="fa-solid fa-ghost text-blue-500"></i>,
  [PikminStatus.DECOR]: <i className="fa-solid fa-star text-amber-500"></i>,
};