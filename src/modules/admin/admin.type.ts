export type Payout = {
  plan_id: number;
  status: string;
  quantity: number;
  amount: string;
};

export type Agency = {
  id: number;
  email: string;
  payout_history: Payout[];
};

export type GroupedPayout = {
  status: string;
  totalQuantity: number;
  totalAmount: number;
};

export type GroupedAgency = {
  groupedPayouts: GroupedPayout[];
} & Agency;
