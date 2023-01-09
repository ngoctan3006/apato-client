export interface Creator {
  id: number;
  name: string;
  phone?: any;
  address?: any;
  email: string;
}

export interface ApartModel {
  id: number;
  title: string;
  address: string;
  image: string[];
  area: number;
  price: number;
  detail: string;
  room_count: number;
  district: string;
  university: string;
  tags: any[];
  status: number;
  total_rating: number;
  user_id: number;
  created_at: Date;
  creator: Creator;
}
