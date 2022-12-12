import { collection, getDocs, addDoc, updateDoc, doc, query, where } from "firebase/firestore/lite"
import { db } from "../../../config/firebase"
import { getSortedData } from "../../../utils/common"

const journalCollectionRef = collection(db, "journal")
const streakCollectionRef = collection(db, "streak")

//--- JOURNAL ---//
export async function addJournal(data) {
  return await addDoc(journalCollectionRef, data)
}

export async function getAllJournalsByUser(user) {
  const q1 = query(journalCollectionRef, where("isDeleted", "!=", true), where("createdBy", "==", user))
  const docs = await getDocs(q1)
  const data = getSortedData(docs)
  return data
}

export async function updateJournal(params) {
  const { id, message } = params
  const journalDoc = doc(db, "journal", id)
  const data = { message: message }
  return await updateDoc(journalDoc, data)
}

export async function softDeleteJournal(id) {
  const journalDoc = doc(db, "journal", id)
  const data = { isDeleted: true }
  return await updateDoc(journalDoc, data)
}

//--- STREAK ---//
export async function getStreakByUser(user) {
  const q1 = query(streakCollectionRef, where("isBroken", "==", false), where("user", "==", user))
  const docs = await getDocs(q1)
  const data = getSortedData(docs)
  return data[0]
}
