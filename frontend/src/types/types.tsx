export interface ActivityProps {
  title: string;
  description: string;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  id: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface ReviewProps {
  rating: number;
  comment: string;
}

export interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export interface RegisterProps {
  onRegister: (data: { email: string; password: string; name: string }) => void;
}
