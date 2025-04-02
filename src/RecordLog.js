import { db } from "./firebase";
import { collection, addDoc, doc } from "firebase/firestore";


export async function RecordLog(adminId, logname, logdesc){

    try {
        const logbookRef = collection(db, `logs/${adminId}/logbook`);
        await addDoc(logbookRef, {
            logdesc : logdesc,
            logname : logname,
            logtime : new Date(),
        });
        console.log("Log added successfully!");
    } catch (error) {
        console.error("Error adding log:", error);
    }
}

