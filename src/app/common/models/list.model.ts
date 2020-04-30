import {Category} from './category.model';

export interface List {
  id: number;
  title: string;
  description: string;
  created_by: number;
  user_count: number;
  categories?: Category[];
}
