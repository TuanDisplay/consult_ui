export interface IUMesApi {
  avatar: string;
  name: string;
  title: string;
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
