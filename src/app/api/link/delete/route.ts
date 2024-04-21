import { NextResponse } from "next/server";

import { collection, doc, deleteField, updateDoc } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

export async function DELETE(req : Request) 
{
    try {
        const body = await req.json();

        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, body.sectionId)
        
        const linkID = body.linkId;

        await updateDoc(documentRef, {
            [linkID] : deleteField()
        })

        return NextResponse.json({ status : 'field deleted', code : 200 });
    } 
    catch (error) {
        return NextResponse.json({ status : `internal server error ${error}`, code : 500 });
    }
}