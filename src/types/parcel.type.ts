export interface IParcel {
  _id: string;
  companyId?: string;
  pickupHubId?: string;
  deliveryHubId?: string;
  userId?: string;
  weight?: string;
  deliveryCharge?: string;
  totalCost?: string;
  pickUpAddress?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}
