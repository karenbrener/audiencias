
export interface Contact {
  id: string;
  name: string;
  phone: string;
  age: number;
  properties: number;
  neighborhood: string;
  tags: string[];
  avatar?: string;
  notes?: string;
  lastCampaign?: string;
  status?: string;
  createdAt?: string;
}

export type AgeRange = '20-35' | '35-50' | '50-70' | '70+';
export type PropertiesRange = '1' | '2-5' | '5+';

export interface ContactFilters {
  search?: string;
  audienceId?: string;
  ageRanges?: AgeRange[];
  propertyRanges?: PropertiesRange[];
  neighborhoods?: string[];
  status?: string;
  tags?: string[];
  lastCampaignFrom?: string;
  lastCampaignTo?: string;
  createdFrom?: string;
  createdTo?: string;
}
