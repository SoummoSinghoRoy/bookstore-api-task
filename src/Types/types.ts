interface UserApiResponse {
  status: number;
  error?: {
    message: string | object
  };
  message?: string;
  data?: {
    id?: any;
    email?: string;
  },
  token?: string;
  isAuthenticated?: boolean;
}

interface UserInputData {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  status: number;
  message?: string;
  isAuthenticated?: boolean;
}

export type { 
  UserApiResponse, 
  UserInputData, 
  AuthenticationResponse
};
