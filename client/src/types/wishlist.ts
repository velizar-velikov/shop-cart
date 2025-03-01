import { Category } from './product';

export interface PersistedWishlistItem {
    _id: string;
    name: string;
    category: Category;
    price: number;
    imageUrl: string;
    _ownerId: string;
}
