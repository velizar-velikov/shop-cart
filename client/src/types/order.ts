import { OrderedProduct, Product, ProductResponse, SizeOption } from './product';

export type PaymentType = 'visa' | 'mastercard' | 'cash';

export type Order = {
    _ownerId: string;
    _id: string;
    _createdOn: number;
    address: string;
    paymentType: PaymentType;
    products: OrderedProduct[];
};

export interface OrderDetailed extends Order {
    productId: string;
    priceOfPurchase: number;
    quantity: number;
    size: SizeOption;
    products: (Product & OrderedProduct)[];
}
