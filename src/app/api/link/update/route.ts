import { NextResponse } from "next/server";

import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "@/database/firebase";

export async function PUT(req : Request) 
{
    const { parentSectionID, linkID, linkData, updatedLinkData } = await req.json();

    try {
        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, parentSectionID)
        
        const docSnapshot = await getDoc(documentRef);
    
        const objectProperty = `${linkID}.${linkData}`;

        if(docSnapshot.exists()) {
            const response = await updateDoc(documentRef, {
                [`${linkID}.${linkData}`]: updatedLinkData
            });
            return NextResponse.json({ status: 200, message: 'updated sucessfully', code : response });
        }
        else {
            return NextResponse.json({ status: 404, message: 'Document does not exist', codee : '' });
        }   
    } 
    catch (error : any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', code : error });
    }
}