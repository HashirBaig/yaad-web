import { collection, getDocs, addDoc, updateDoc, doc, query, where, Timestamp } from "firebase/firestore/lite"
import { db } from "../../../config/firebase"
import { getSortedData, getFormattedData } from "../../../utils/common"

const journalCollectionRef = collection(db, "journal")
const streakCollectionRef = collection(db, "streak")

//--- JOURNAL ---//
export async function addJournal({ message, userEmail }) {
  const data = {
    isDeleted: false,
    isEdited: false,
    createdBy: userEmail,
    createdAt: Timestamp.fromDate(new Date()),
    message,
  }
  return await addDoc(journalCollectionRef, data)
}

export async function getAllJournalsByUser(userEmail) {
  const q1 = query(journalCollectionRef, where("isDeleted", "!=", true), where("createdBy", "==", userEmail))
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
async function getStreakByUser(userEmail) {
  const q1 = query(streakCollectionRef, where("user", "==", userEmail), where("isBroken", "==", false))
  const res = await getDocs(q1)
  const data = getFormattedData(res)
  return data[0]
}

async function createStreakByUser(userEmail) {
  const data = {
    user: userEmail,
    isBroken: false,
    createdAt: Timestamp.fromDate(new Date().toISOString()),
    noOfDays: 1,
  }

  return await addDoc(streakCollectionRef, data)
}

const api = {
  getStreakByUser,
  createStreakByUser,
}

export default api
