import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    deleteDoc, 
} from 'firebase/firestore';
import { db } from "@/database/firebase";


// UPDATE SINGLE DOCUMENT
export async function PUT(req : NextRequest) 
{
    const { id, newID, data } = await req.json();

    try 
    {
        const collectionReferance = collection(db, 'document');
        const originalDocumentReferance = doc(db, collectionReferance.id, id);
        const snapshot = await getDoc(originalDocumentReferance);

        if (snapshot.exists()) // check if the document exists and current id is not same as new orhetwise it will delete the document
        {
            const snapshotData = snapshot.data(); // get original document data
            const mergedData = { ...snapshotData, ...data };

            if(newID == undefined || newID == "" || newID == id)
            {
                await setDoc(originalDocumentReferance, mergedData, { merge : true });
                return NextResponse.json({ status : 200, message : 'updated' });
            }
            else {
                await setDoc(doc(db, collectionReferance.id, newID), mergedData, { merge : true });
                await deleteDoc(originalDocumentReferance);

                return NextResponse.json({ status : 200, message : 'updated with new document create data merge' });
            }
        }
        else 
        {
            return NextResponse.json({ status : 404, message : 'document does not exist' });
        }

    }
    catch (err) 
    {
        return NextResponse.json({ status : 500, message : `failed to updated ${err}` });
    }
}