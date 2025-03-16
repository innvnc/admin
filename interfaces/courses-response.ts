export interface ICoursesResponse {
  id:           string;
  status:       boolean;
  creationDate: string;
  title:        string;
  slug:         string;
  description:  string;
  price:        number;
  isPublic:     boolean;
  createdBy:    CreatedBy;
  categories:   Category[];
}

export interface Category {
  id:           string;
  status:       boolean;
  creationDate: string;
  title:        string;
  slug:         string;
  createdBy:    CreatedBy;
}

export interface CreatedBy {
  id:           string;
  creationDate: string;
  lastActivity: string;
  isActive:     boolean;
  username:     string;
  clerkId:      string;
  name:         string;
  lastName:     string;
  phone:        null;
  roles:        string[];
}
