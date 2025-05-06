
export type CampaignStatus = 'scheduled' | 'in-progress' | 'completed' | 'sent' | 'canceled';

export interface Campaign {
  id: string;
  name: string;
  audienceId: string;
  audienceName: string;
  scheduledDate: string;
  status: CampaignStatus;
  metrics?: {
    sent: number;
    delivered: number;
    read: number;
    responses?: number;
    readRate?: string;
    responseRate?: string;
  };
  template?: string;
  variables?: Record<string, string>;
  audienceSize?: number;
  messageText?: string;
  lastEdited?: string;
  editHistory?: Array<{
    date: string;
    user: string;
    action: string;
  }>;
}
