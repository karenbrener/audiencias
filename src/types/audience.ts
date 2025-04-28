
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Audience {
  id: string;
  name: string;
  size: number;
  lastRun: string;
  status: 'active' | 'archived';
  filters?: {
    age?: string[];
    properties?: string[];
    neighborhoods?: string[];
  };
}
