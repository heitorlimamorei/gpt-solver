import { db } from "../../firebase/config";
import { firebaseTimesStampType } from "../../utils/dateMethods"
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

interface MagicLinkProps {
  id: string;
  name: string;
  targetSheet: string;
  targetRole: string;
  author: string;
  expires: firebaseTimesStampType;
}

interface newMagicLinkProps {
  name: string;
  targetSheet: string;
  targetRole: string;
  author: string;
}

function add30Days(data: Date): Date { // function that receives the current date and runturns that date plus 30 days
  const newDate = new Date(data);
  newDate.setDate(newDate.getDate() + 30);
  return newDate;
}

async function getMagicLinkById(id: string): Promise<any> {
  const magicLinkRef = doc(db, `magicLink/${id}`);
  const link = await getDoc(magicLinkRef);
  return { id: link.id, ...link.data() };
}

async function getLinksByTargetSheet(id: string): Promise<MagicLinkProps[]> {
  let normalizados: any = [];
  const magicLinksRef = collection(db, `magicLink`);
  const linkQuery = query(magicLinksRef, where("targetSheet", "==", id)); // run a query that find links that have targetSheet attribute equal to id;
  const MagicLinks = await getDocs(linkQuery);

  MagicLinks.forEach((link) => {
    normalizados.push({ id: link.id, ...link.data() });
  });

  return normalizados;
}

async function createMagicLink(
  newMagicLink: newMagicLinkProps
): Promise<MagicLinkProps> {
  const today = new Date();
  const expires = add30Days(today);

  const magicLinksRef = collection(db, `magicLink`);
  const linkRef = await addDoc(magicLinksRef, { ...newMagicLink, expires });

  return await getMagicLinkById(linkRef.id);
}

async function updateMagicLink(updatedLink: MagicLinkProps): Promise<void>{
  const docRef = doc(db, `magicLink/${updatedLink.id}`);
  const linkRef = await updateDoc(docRef, {
    name: updatedLink.name,
    expires: updatedLink.expires,
    targetRole: updatedLink.targetRole,
  });
}

async function deleteLink(id: string):Promise<void> {
  const linkRef = doc(db, `magicLink/${id}`);
  const docRef = await deleteDoc(linkRef);
}

export default {
  getMagicLinkById,
  createMagicLink,
  getLinksByTargetSheet,
  updateMagicLink,
  deleteLink,
};
