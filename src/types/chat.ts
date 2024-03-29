export type firebaseTimesStampType = { seconds: number; nanoseconds: number };

export interface IChatResp {
  ownerId: string;
  name: string;
  createdAt: firebaseTimesStampType;
}

export interface IChatListItem {
  id: string;
  name: string;
}

export interface IMessageResp {
  id: string;
  createdAt: firebaseTimesStampType;
  image_url?: string;
  content: string;
  role: string;
}

export interface IMessage {
  id: string;
  createdAt: Date;
  content: string;
  image_url?: string;
  role: string;
}
