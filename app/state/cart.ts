import { atom } from "jotai";
import { SaleItem } from "../types";

// Types
interface CartItem extends SaleItem {
  id:number
  quantity: number;
  total: number;
}

// Atoms
export const cartItemsAtom = atom<CartItem[]>([]);

export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.total, 0)
);

// Actions
export const addToCartAtom = atom(
  null,
  (get, set, saleItem: SaleItem) => {
    const items = get(cartItemsAtom);
    const existingItem = items.find((item) => item.name === saleItem.name);

    if (existingItem) {
      set(cartItemsAtom, 
        items.map((item) =>
          item.name === saleItem.name
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    } else {
      set(cartItemsAtom, [
        ...items,
        { ...saleItem, quantity: 1, total: saleItem.price },
      ]);
    }
  }
);

export const removeFromCartAtom = atom(
  null,
  (get, set, itemName: string) => {
    const items = get(cartItemsAtom);
    set(cartItemsAtom, items.filter((item) => item.name !== itemName));
  }
);

export const updateQuantityAtom = atom(
  null,
  (get, set, { name, quantity }: { name: string; quantity: number }) => {
    const items = get(cartItemsAtom);
    set(cartItemsAtom, 
      items
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(0, quantity), total: item.price * Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
);

export const clearCartAtom = atom(null, (get, set) => {
  set(cartItemsAtom, []);
});
