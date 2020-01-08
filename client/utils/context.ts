import { createContext } from 'react';
import { Item, ItemType } from '@/services';

export const ShowUserOrGroupInfoContext = createContext(
  {} as {
    showInfo: (item: Item, type: ItemType) => void;
  }
);
