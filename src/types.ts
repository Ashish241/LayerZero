export type ViewType = 'ecosystem' | 'tooling' | 'docs' | 'community';

export interface ToolCard {
  id: string;
  name: string;
  description: string;
  stars: number;
  starred: boolean;
  languages: string[];
  category: 'CLI' | 'UI' | 'Security' | 'SDK' | 'Infrastructure';
  official?: boolean;
}

export interface RfceItem {
  id: string;
  title: string;
  status: 'In Review' | 'Draft' | 'Approved' | 'Active';
  votesUp: number;
  votesDown: number;
  userVote?: 'up' | 'down';
  description: string;
}

export interface EventItem {
  id: string;
  month: string;
  day: string;
  title: string;
  location: string;
  type: 'videocam' | 'location_on';
  registered: boolean;
}

export interface TelemetryLog {
  type: 'SYS' | 'NET' | 'WARN' | 'OK' | 'ALERT' | 'INFO';
  message: string;
  timestamp: string;
}
