import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    deleteDoc, 
} from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";


// UPDATE SINGLE DOCUMENT

export async function PUT(req : NextRequest) 
{
    const sectionData = await req.json();

    try 
    {
        const collectionReferance = collection(db, 'document');
        const originalDocumentReferance = doc(db, collectionReferance.id, sectionData.id);
        const snapshot = await getDoc(originalDocumentReferance);

        if (snapshot.exists()) // check if the document exists
        {
            const data = snapshot.data(); // get original document data
            const mergedData = { ...sectionData.data, ...data };

            const currentDocumentRef = sectionData.newID == "" ? originalDocumentReferance : doc(db, collectionReferance.id, sectionData.newID);
            
            await setDoc(currentDocumentRef, mergedData, { merge : true });

            if(sectionData.newID != "") { await deleteDoc(originalDocumentReferance); }
            
            return NextResponse.json({ status : 'updated' });
        }
        else 
        {
            return NextResponse.json({ status : 'document does not exist' });
        }

    }
    catch (err) 
    {
        return NextResponse.json({ status : `failed to updated ${err}` });
    }
}