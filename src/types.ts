export interface Paste {
  id: string;
  content: string;
  language: string;
  title: string;
  expiresAt: Date | null;
  createdAt: Date;
}

export interface Language {
  name: string;
  value: string;
}