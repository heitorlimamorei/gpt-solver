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
  content: string;
  role: string;
}

export interface IMessage {
  content: string;
  role: string;
}
