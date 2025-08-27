import { CreatedBy } from '@/interfaces';

export interface CompaniesResponse {
  id:           string;
  status:       boolean;
  creationDate: string;
  name:         string;
  phone:        string;
  email:        string;
  address:      string;
  description:  string;
  createdBy:    CreatedBy;
}

