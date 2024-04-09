export interface Player {
  id: number;
  name: string;
  platform: string;
  clientIdentifier: string;
  createdAt: number; // Unix timestamp

  note: string;
}
