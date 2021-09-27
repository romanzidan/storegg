export interface CategoryTypes{
  _id: string;
  name: string;
}

export interface GameItemTypes{
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BankTypes{
  _id: string;
  name: string;
  bankName: string;
  noRekening: string;
}

export interface PaymentTypes{
  _id: string;
  type: string;
  status: string;
  banks: BankTypes[]
}

export interface NominalTypes{
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes{
  email: string;
  password: string;
}

export interface UserTypes{
  id: string;
  username: string;
  email: string;
  name: string;
  phoneNumber: string;
  avatar: any;
}

export interface JWTPayloadTypes{
  player: UserTypes;
  iat: number;
}

export interface CheckoutTypes{
  voucher : string;
  nominal : string;
  payment : string;
  bank : string;
  name : string;
  accountUser : string;
}

export interface HistoryVoucherTopupTypes{
  gameName: string;
  category: string;
  thumbnail: string;
  coinName: string;
  coinQuantity: number;
  price: number;
}

export interface HistoryPaymentTypes{
  bankName: string;
  name: string;
  noRekening: string;
  type: string;
}

export interface HistoryTransactionTypes{
  _id: string;
  name: string;
  historyVoucherTopup: HistoryVoucherTopupTypes;
  historyPayment: HistoryPaymentTypes;
  accountUser: string;
  value: number;
  tax: number;
  status: string;
}

export interface TopUpCategoriesTypes{
  _id: string;
  value: number;
  name: string;
}
