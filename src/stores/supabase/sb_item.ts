export interface SB_Item {
  id?: never | number;
  user_id: string;
  name: string;
  description: string;

  image: string;
  tag?: number | null;
  group: number | null;

  amount: number;
  unit: string | null;

  date_added: Date;
  date_bestTill: Date;
}
