export interface CommentResponse {
  _id: string;
  user?: { fname: string };
  productId: string;
  vendorId: string;
  ratings: number;
  content: string;
  isPublished: boolean;
}
