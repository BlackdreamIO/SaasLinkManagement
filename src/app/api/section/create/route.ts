import { NextRequest, NextResponse } from "next/server";

import { collection, doc, setDoc, } from 'firebase/firestore';
import { db } from "@/database/firebase";

// CREATE NEW DOCUMENT WITH EMPTY DATA

export async function POST(req : Request) 
{
    const body = await req.json();

    try {
        const collectionReferance = collection(db, 'document');
        const newDocRef = doc(db, collectionReferance.id, body.id);
    
        // create document with default document data {}
        const newDoc = await setDoc(newDocRef, {});
        return NextResponse.json({ status : 200, message : "created" });   
    } 
    catch (error) {
        return NextResponse.json({ status : 500, message : "internal server error", error : error });
    }
}
