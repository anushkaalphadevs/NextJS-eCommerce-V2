export type VotesType = {
  count: number;
  value: number;
}

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[]
}

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
}

export type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  images: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
}

export type SubCategories = {
  id?: number;
  code?: string;
  description?: string;
  imgURL?: any;
  categories?: any;
}
export type storeItem = {
  itemCode?: string;
  itemName?: string;
  stockQty?: number;
  itemImages?: any;
  itemUnitPrice?: any;
  itemSpecialPrice?: number;
  itemUnit?: [];
  itemMaxQty?: number;
  itemMinQty?: number;
  itemSteps?: number;
  leadTime?: number;
  reorderQty?: number;
  itemDescription?: string;
  bannerText?: string;
  itemLongDescription?: any;
  itemSubCategory?: [];
  itemCategory?: [];
  storeCode?: string;
}
export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  selectedCount: number;
  color: string;
  size: string;
}
export type ICart = {
  id?: number;
  storeCode?: any;
  orderID?: any;
  orderQTY?: any;
  itemTotal?: number;
  itemCode?: string;
  note?: string;
  addedDate?: string;
  addedPrice?: number;
  itemName?: string;
  code?:string,
  itemTumb?:string,
  itemUnitPrice?:any,
  item?:any,
  cartItemdata?:any,
  refetch?:any
  cartItems?:any
  childParent?:any
}
export class Cart implements ICart {
  constructor(
    public id?: number,
    public storeCode?: string,
    public orderID?: string,
    public orderQTY?: any,
    public itemTotal?: number,
    public itemCode?: string,
    public note?: string,
    public addedDate?: string,
    public addedPrice?: number,
    public itemName?: string,
    public customer?: string,
    public code?:string,
    public itemTumb?:string,
    public itemUnitPrice?:number,
    public item?:any,
    public cartItemdata?:any,
    public refetch?:any,
    public cartItems?:any,
    public childParent?:any
  ) {}
}

export type GtagEventType = {
  action: string;
  category: string; 
  label: string;
  value: string
}

