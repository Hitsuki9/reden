import { createContext } from 'react';
import { Item, ItemType } from '@/App';

export const ShowUserOrGroupInfoContext = createContext(
  {} as {
    showInfo: (item: Item, type: ItemType) => void;
  }
);
