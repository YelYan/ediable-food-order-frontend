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
  restaurant?: T;
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
}

export type MenuItem = { _id: string; name: string; price: number }

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number
  }
}

export type CheckoutSessionRequest = {
    cartItems : {
        menuItemId : string;
        name : string;
        quantity : string;
    }[];
    deliveryDetails : {
        email : string;
        name : string;
        city : string;
        addressLine1 : string;
        country : string
    }
    restaurantId : string
}