export interface IUMesApi {
  avatar: string;
  name: string;
  email: string;
  uuid: string;
}

export interface IUMesDeApi {
  content: string;
  sender_uuid: string;
  sender_name: string;
  receiver_uuid: string;
  receiver_name: string;
  receiver_image: string;
  title: string;
  uuid: string;
  created_at: string;
  is_delete: number;
}

export interface IExpProfile {
  expert_name: string;
  expert_desc: string;
  achievements: { value: string }[];
  majors: { value: string }[];
  password: string;
  expert_avatar: string;
}

export interface IExpProfileApi {
  uuid: string;
  expertname: string;
  email: string;
  introduce: string;
  achievement: string[];
  industry: string[];
  password: string;
  image: string;
  is_active: number;
  rating: number;
  view: number;
  consultation: number;
}

export interface IExpReviewPage {
  limit: number;
  page: number;
  pages: number;
  total: number;
  items: IExpReviewItem[];
}

export interface IExpReviewItem {
  uuid: string;
  customer_uuid: string;
  customer_name: string;
  rating: number;
  comment: string;
}
