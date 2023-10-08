import { db } from '../../firebase/config';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { newOkrProps, IOkrProps } from '../../types/sheetTypes';
import {
  firebaseTimesStampType,
  firestoreTimestampToDate,
  toggleDateToJson,
} from '../../utils/dateMethods';

export interface IOkrRawProps {
  id: string;
  sheetId: string;
  start_cycle: firebaseTimesStampType;
  end_cycle: firebaseTimesStampType;
  createdAt: firebaseTimesStampType;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

interface updatedOkrRepositoryJson {
  id: string;
  sheetId: string;
  start_cycle: Date;
  end_cycle: Date;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

const normalizeTimestamps = (okr: IOkrRawProps): IOkrProps => {
  const firebaseDateToJsonDate = (date: firebaseTimesStampType) => {
    return toggleDateToJson(firestoreTimestampToDate(date));
  };

  return {
    ...okr,
    createdAt: firebaseDateToJsonDate(okr.createdAt),
    start_cycle: firebaseDateToJsonDate(okr.start_cycle),
    end_cycle: firebaseDateToJsonDate(okr.end_cycle),
  };
};

async function getOkrById(id: string): Promise<IOkrProps> {
  const okrRef = doc(db, `okrs/${id}`);
  const docRef: any = await getDoc(okrRef);
  return normalizeTimestamps({ id: docRef.id, ...docRef.data() });
}

async function getOkrsBySheetId(sheetId: string): Promise<IOkrProps[]> {
  let normalizedOkrs = [];

  const okrsRef = collection(db, `okrs`);
  const okrQuery = query(okrsRef, where('sheetId', '==', sheetId));

  const OKRS = await getDocs(okrQuery);
  OKRS.forEach(({ id, data }) => {
    normalizedOkrs.push({ id: id, ...data() });
  });
  normalizedOkrs = normalizedOkrs.map((okr) => normalizeTimestamps({ ...okr }));
  return normalizedOkrs;
}

async function getAllOkrs(): Promise<IOkrProps[]> {
  const OKRSRef = collection(db, 'okrs');
  const okrs = await getDocs(OKRSRef);
  let normalizedOkrs = [];

  okrs.forEach((okr) => {
    normalizedOkrs.push({ id: okr.id, ...okr.data() });
  });
  normalizedOkrs = normalizedOkrs.map((okr) => normalizeTimestamps({ ...okr }));
  return normalizedOkrs;
}

async function createOkr(newOkr: newOkrProps): Promise<void> {
  const OKRSRef = collection(db, 'okrs');
  const okrRef = await addDoc(OKRSRef, {
    createdAt: new Date(),
    sheetId: newOkr.sheetId,
    start_cycle: newOkr.start_cycle,
    end_cycle: newOkr.end_cycle,
    author: newOkr.author,
    spentType: newOkr.spentType,
    value: newOkr.value,
    isPercentual: newOkr.isPercentual,
  });
}

async function updateOkr(updatedOkr: updatedOkrRepositoryJson): Promise<void> {
  const okrRef = doc(db, `okrs/${updatedOkr.id}`);
  const docRef = await updateDoc(okrRef, {
    start_cycle: updatedOkr.start_cycle,
    end_cycle: updatedOkr.end_cycle,
    spentType: updatedOkr.spentType,
    value: updatedOkr.value,
    isPercentual: updatedOkr.isPercentual,
  });
}

async function deleteOkr(id: string): Promise<void> {
  const okrRef = doc(db, `okrs/${id}`);
  const docRef: any = await deleteDoc(okrRef);
}

export default {
  createOkr,
  getAllOkrs,
  getOkrById,
  getOkrsBySheetId,
  updateOkr,
  deleteOkr,
};
