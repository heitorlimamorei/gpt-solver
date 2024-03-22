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