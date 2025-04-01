import { CreatedBy } from './courses-response';

export interface Category {
  id:           string;
  status:       boolean;
  creationDate: string;
  title:        string;
  slug:         string;
  createdBy:    CreatedBy;
}