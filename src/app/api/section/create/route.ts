import { NextRequest, NextResponse } from "next/server";

import { 
    collection, 
    doc,  
    setDoc, 
} from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

// CREATE NEW DOCUMENT WITH EMPTY DATA

export async function POST(req : Request) 
{
    const body = await req.json();

    if((req.method === 'POST')) 
    {
        const collectionReferance = collection(db, 'document');
        const newDocRef = doc(db, collectionReferance.id, body.sectionId);
    
        // create document with default document data {}
        const newDoc = await setDoc(newDocRef, {});
        
        return NextResponse.json({ newLink : newDoc });   
    }
    
    return NextResponse.json({ documents : [] })
}
