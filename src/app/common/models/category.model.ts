import {Item} from './item.model';

export interface Category {
  id: number;
  title: string;
  description: string;
  items?: Item[];
}
