import { NextRequest, NextResponse } from "next/server";

import { 
    collection, 
    doc, 
    deleteDoc, 
} from 'firebase/firestore';
import { db } from "@/database/firebase";

// DELETE SINGLE DOCUMENT

export async function DELETE(req : NextRequest) 
{
    const body = await req.json();
    try 
    {
        const collectionReferance = collection(db, 'document');
        const docReferance = doc(db,  collectionReferance.id, body.id)    
        await deleteDoc(docReferance);
        
        return NextResponse.json({ status : 200, message : 'deleted' })
    } 
    catch (error) 
    {
        return NextResponse.json({ status : 500, message : `failed to delete document ${error}` })
    }
}