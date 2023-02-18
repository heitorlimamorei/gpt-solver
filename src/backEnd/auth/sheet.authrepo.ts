import { db } from "../../firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
interface newUserProps {
    email: string;
    role: string;
    sheetId:string;
}
interface userProps{
    email: string;
    role: string;
    id:string;
}
async function getUsers(sheetId: string) {
  let normalizado = [];
  const usersRef = collection(db, `planilhas/${sheetId}/users`);
  let usersNn = await getDocs(usersRef);
  usersNn.forEach((user) => {
    normalizado.push({ id: user.id, ...user.data() });
  });
  return normalizado;
}
async function getUserById(sheetId: string, userId: string) {
  const users = await getUsers(sheetId);
  return users.find((user) => user.id === userId);
}
async function getUsersByEmail(sheetId: string, email: string) {
    const users = await getUsers(sheetId);
    return users.find((user) => user.email === email);
}
async function userExists(sheetId:string, userId:string){
    const docRef = doc(db, `planilhas/${sheetId}/users/${userId}`)
    const userRef = await getDoc(docRef)
    return userRef.exists()
}
async function createUser(newUser:newUserProps) {
    const usersRef = collection(
        db,
        `planilhas/${newUser.sheetId}/users`
    );
    const userRef = await addDoc(usersRef, {
       email: newUser.email,
       role: newUser.role

    });
    return [[...await getUsers(newUser.sheetId)], await getUserById(newUser.sheetId, userRef.id)]
}
async function deleteUser(sheetId:string, userId:string){
    const userRef = doc(db, `planilhas/${sheetId}/users/${userId}`);
    const docRef = await deleteDoc(userRef)
    return await getUsers(sheetId)
}
async function updateUser(user, sheetId:string){
    const userRef = doc(db, `planilhas/${sheetId}/users/${user.id}`)
    const docRef = await updateDoc(userRef, user)
    return [[...await getUsers(sheetId)], await getUserById(sheetId, user.id)]
}
export default {
  getUsers,
  getUserById,
  getUsersByEmail,
  userExists,
  createUser,
  updateUser,
  deleteUser
};
