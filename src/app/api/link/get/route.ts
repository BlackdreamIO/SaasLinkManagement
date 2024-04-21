import { NextResponse } from "next/server";

import { collection, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

import { LinkItemScheme } from "@/scheme/LinkSection";

export async function POST(req : Request) 
{
    try {
        const body = await req.json();

        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, body.sectionId);
        
        const links : any = (await getDoc(documentRef)).data();
        
        return NextResponse.json({ links });
    }
    catch (error) {
        return NextResponse.json({ status : 'internal server error', code : 500 });
    }
}