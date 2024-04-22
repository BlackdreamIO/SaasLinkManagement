import { NextRequest, NextResponse } from "next/server";

import { 
    collection, 
    doc, 
    deleteDoc, 
} from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

// DELETE SINGLE DOCUMENT

export async function DELETE(req : NextRequest) 
{
    const sectionData = await req.json();
    try 
    {
        const collectionReferance = collection(db, 'document');
        const docReferance = doc(db,  collectionReferance.id, sectionData.sectionId)    
        await deleteDoc(docReferance);
        
        return NextResponse.json({ status : 'deleted document' })
    } 
    catch (error) 
    {
        return NextResponse.json({ status : `failed to delete document ${error}` })
    }
}