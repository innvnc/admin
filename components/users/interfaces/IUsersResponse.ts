export interface IUsersResponse {
  id:           string;
  creationDate: string;
  lastActivity: string;
  isActive:     boolean;
  username:     string;
  clerkId:      string;
  slug:         string;
  name:         string;
  lastName:     string;
   roles:       ( "user" | "admin" )[];
}
