type User = {
    email: string;
    password: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  hydrated: boolean;

  setUser: (u: User | null) => void;
  setLoading: (v: boolean) => void;

  login: (user: User) => Promise<AuthResponse>;
  updateProfile: (userData: User) => Promise<AuthResponse>;
  clearLocalAuthData: () => Promise<void>;
  logout: () => Promise<void>;
};

type AuthResponse = {
    success: boolean;
    message?: string;
};
