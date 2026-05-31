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

interface ITimeline {
  status: string;
  remarks: string;
  timeStamp: string;
}

export interface IParcelHistory {
  _id: string;
  parcelId: string;
  timeline: ITimeline[];
  createdAt: string;
  updatedAt: string;
}
