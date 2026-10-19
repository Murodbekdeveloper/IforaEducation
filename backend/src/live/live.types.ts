export type LiveSessionStatusValue = 'SCHEDULED' | 'LIVE' | 'ENDED';
export type SpeakRequestStatusValue = 'PENDING' | 'APPROVED' | 'DENIED';

export interface LiveSessionView {
  id: string;
  title: string;
  description: string | null;
  youtubeVideoId: string | null;
  status: LiveSessionStatusValue;
  scheduledAt: string;
  startedAt: string | null;
  endedAt: string | null;
}

export interface LiveChatMessageView {
  id: string;
  message: string;
  createdAt: string;
  userId: string;
  authorName: string;
  authorInitial: string;
}

export interface LiveSpeakRequestView {
  id: string;
  status: SpeakRequestStatusValue;
  createdAt: string;
  resolvedAt: string | null;
  userId: string;
  authorName: string;
  authorInitial: string;
  authorPhone: string;
}
