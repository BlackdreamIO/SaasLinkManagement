import { NextResponse } from "next/server";

import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

export async function PUT(req : Request) 
{
    const body = await req.json();

    try {
        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, body.sectionId)
        
        const docSnapshot = await getDoc(documentRef);
    
        const objectProperty = `${body.linkId}.${body.fieldToUpdate}`;

        if(docSnapshot.exists()) {
            await updateDoc(documentRef, {
                [`${body.linkId}.${body.fieldToUpdate}`]: body.newValue
            });
            return NextResponse.json({ message: 'updated sucessfully' }, { status: 200 });
        }
        else {
            return NextResponse.json({ error: 'Document does not exist' }, { status: 404 });
        }   
    } 
    catch (error) {
        return NextResponse.json({ error: error }, { status: 404 });
    }
}