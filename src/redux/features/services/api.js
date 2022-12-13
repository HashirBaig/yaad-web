import { collection, getDocs, addDoc, updateDoc, doc, query, where, increment } from "firebase/firestore/lite"
import { db } from "../../../config/firebase"
import { getSortedData } from "../../../utils/common"

const journalCollectionRef = collection(db, "journal")
const streakCollectionRef = collection(db, "streak")

//--- JOURNAL ---//
export async function addJournal(data) {
  return await addDoc(journalCollectionRef, data)
}

export async function getAllJournalsByUser(user, limit = 0) {
  const q1 = query(journalCollectionRef, where("isDeleted", "!=", true), where("createdBy", "==", user))
  const docs = await getDocs(q1)
  const data = getSortedData(docs)

  if (limit === 1) {
    return data[0]
  }
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
export async function updateStreakByUser(id) {
  const streakDoc = doc(db, "streak", id)
  const data = { noOfDays: increment(1) }
  return await updateDoc(streakDoc, data)
}

export async function breakStreakByUser(user) {
  const streakDoc = doc(db, "streak", user)
  const data = { isBroken: true }
  return await updateDoc(streakDoc, data)
}

export async function createStreakByUser(data) {
  return await addDoc(streakCollectionRef, data)
}

export async function getStreakByUser(user) {
  const q1 = query(streakCollectionRef, where("isBroken", "==", false), where("user", "==", user))
  const docs = await getDocs(q1)
  const data = getSortedData(docs)
  return data[0]
}
