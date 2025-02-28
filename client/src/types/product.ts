export type SizeOption = 'small' | 'medium' | 'large';

export interface OrderedProduct {
    productId: string;
    size: SizeOption;
    quantity: number;
    priceOfPurchase?: number;
}

export type Category = 'T-shirts' | 'Pants' | 'Sweatshirts' | 'Shorts';

export interface ProductResponse {
    _id: string;
    _ownerId: string;
    _createdOn: number;
    _updatedOn?: number;
    name: string;
    brand: string;
    category: Category;
    price: number;
    imageUrl: string;
    summary: string;
    description: string;
    inactive: boolean;
}
