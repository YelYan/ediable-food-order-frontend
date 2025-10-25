export interface CreateUserRequest {
  auth0Id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
}


export interface User {
  _id?: string;
  auth0Id?: string;
  email?: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  user?: T;
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
}