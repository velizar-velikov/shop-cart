export type Review = {
    rating: string;
    text: string;
};

export interface ReviewResponse extends Review {
    _ownerId: string;
    _id: string;
    productId: string;
    _createdOn: number;
    _updatedOn?: number;
    reviewerFullName: string;
}
