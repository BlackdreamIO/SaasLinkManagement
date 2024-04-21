import { NextResponse } from "next/server";

import { collection, doc, deleteField, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

export async function POST(req : Request) 
{
    try {
        const body = await req.json();

        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, body.sectionId)
        
        const linkID = body.linkId;
        const linkName = body.linkName;
        const linkUrl = body.linkUrl;

        await setDoc(documentRef, {
            [linkID] : {
                title : linkName,
                link : linkUrl,
                created_at : serverTimestamp()
            }
        }, { merge : true })

        return NextResponse.json({ status : 'field created sucessfully', code : 200 });
    } 
    catch (error) {
        return NextResponse.json({ status : `internal server error ${error}`, code : 500 });
    }
}