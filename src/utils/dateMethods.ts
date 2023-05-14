export type firebaseTimesStampType = { seconds: number; nanoseconds: number };

export const firestoreTimestampToDate = (timestamp: firebaseTimesStampType): Date => {
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
  return new Date(milliseconds);
};

export const hasDatePassed = (date: firebaseTimesStampType) => {
  const dateF = firestoreTimestampToDate(date);
  const today = new Date();
  return dateF < today;
};
