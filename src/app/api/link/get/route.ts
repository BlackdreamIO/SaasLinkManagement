import { NextResponse } from "next/server";

import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

import { LinkItemScheme } from "@/scheme/LinkSection";

export async function POST(req : Request) 
{
    const body = await req.json();

    const collectionRef = collection(db, 'document');
    const documentRef = doc(db, collectionRef.id, body.sectionId)
    
    const links = await getDoc(documentRef);

    return NextResponse.json({ link_section_id : links.data() })
}