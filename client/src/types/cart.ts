import { ProductResponse, SizeOption } from './product';
import { Sizes } from './stock';

export interface CartResponse {
    _id: string;
    _ownerId: string;
    productId: string;
    size: SizeOption;
    quantity: number;
    _createdOn: number;
    _updatedOn?: number;
}

export type CartResponseDetailed = CartResponse & { productInfo: ProductResponse };

export type UserCartResponse = CartResponseDetailed & { sizes: Sizes<number> };
