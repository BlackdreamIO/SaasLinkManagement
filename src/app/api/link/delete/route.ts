import { NextResponse } from "next/server";

import { collection, doc, getDoc, deleteField, updateDoc } from 'firebase/firestore';
import { db } from "@/database/firebase";

export async function DELETE(req : Request) 
{
    const { parentSectionID, linkID } = await req.json();

    try 
    {
        const collectionRef = collection(db, 'document');
        const documentReference = doc(db, collectionRef.id, parentSectionID)
        const documentSnapshot = await getDoc(documentReference);

        if(documentSnapshot.exists()) {
            const response = await updateDoc(documentReference, {
                [linkID] : deleteField()
            })
            return NextResponse.json({ status : 200, message : `field deleted`, code : response });
        }
        return NextResponse.json({ status : 404, message : 'parent document was not found', code : '' });

    } 
    catch (error : any) {
        return NextResponse.json({ status : 500, message : `internal server error`, code : error });
    }
}