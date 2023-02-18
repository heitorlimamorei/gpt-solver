import { db } from "../../firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
interface sheetProps{
    id: string;
    owner: string;
    tiposDeGastos: string[];
    totalValue: number;
    type: string;
}
interface NewSheetProps{
    owner: string;
    tiposDeGastos: string[];
    totalValue: number;
    type: string;
}
async function getSheets(){
    let normalizado = []
    const pontosRef = collection(
        db,
        `planilhas`
    );
    let sheetNn =  await getDocs(pontosRef);
    sheetNn.forEach((ponto) => {
        normalizado.push({id: ponto.id, ...ponto.data()});
    })
    return normalizado;
}
async function getSheetById(id:string):Promise<sheetProps>{
    const sheetRef = doc(db, `planilhas/${id}`);
    const sheet:any =  await getDoc(sheetRef)
    return {id: sheet.id, ...sheet.data()}
}

async function createSheet(newSheet:NewSheetProps): Promise<sheetProps> {
    const pontosRef = collection(
        db,
        `planilhas`
    );
    const sheetRef  = await addDoc(pontosRef, newSheet)
    const itemsRef = collection(
        db,
        `planilhas/${sheetRef.id}/items`
    );
    const itenVazioRef = await addDoc(itemsRef, {});
    const usersRef = collection(
        db,
        `planilhas/${sheetRef.id}/users`
    )
    const ownerRef = await addDoc(usersRef, {
        email: newSheet.owner,
        role: "owner"
    });
    return await getSheetById(sheetRef.id)
}
async function updateSheet(sheet){
    const sheetRef = doc(db, `planilhas/${sheet.id}`)
    const docRef = await updateDoc(sheetRef, {
        tiposDeGastos: sheet.tiposDeGastos,
        totalValue: sheet.totalValue,
    })
    return await getSheets()
}
async function sheetExists(id:string){
    const docRef = doc(db, `planilhas/${id}`)
    const sheetRef = await getDoc(docRef)
    return sheetRef.exists()
}
async function deleteSheet(id:string){
    const sheetRef = doc(db, `planilhas/${id}`);
    const docRef = await deleteDoc(sheetRef)
}
export default {
    getSheets,
    getSheetById,
    updateSheet,
    sheetExists,
    createSheet,
    deleteSheet
}