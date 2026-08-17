export interface CreateLeadDto {
  phone: string;
  telegramUsername?: string;
  courseSlug?: string;
}

export interface Lead extends CreateLeadDto {
  id: string;
  contacted: boolean;
  createdAt: string;
}
