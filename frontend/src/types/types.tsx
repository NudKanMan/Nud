export interface ActivityProps {
  title: string;
  description: string;
  maxParticipants: number;
  startDate: string;
  endDate: string;
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
