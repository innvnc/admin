import { CategoriesResponse } from '@/components/categories/interfaces';
import { CreatedBy } from '@/interfaces';

export interface ICoursesResponse {
  id:           string;
  status:       boolean;
  creationDate: string;
  title:        string;
  slug:         string;
  description:  string;
  price:        number;
  isPublic:     boolean;
  categories:   CategoriesResponse[];
  createdBy:    CreatedBy;
}

