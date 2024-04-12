import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

import { collection, doc, getDoc, getDocs, setDoc, addDoc } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

import { LinkItemScheme } from "@/scheme/LinkSection";
import { SectionScheme } from "@/scheme/SectionScheme";

function generateUniqueId() {
    return crypto.randomUUID(); // Generates a unique v4 UUID
}

export async function POST(req : NextRequest) 
{
    const sectionData : SectionScheme = await req.json();

    if((req.method === 'POST')) 
    {
        const collectionReferance = collection(db, 'document');
        const newDocRef = doc(db, collectionReferance.id, sectionData.title);
    
        // create document with default document data {}
        const newDoc = await setDoc(newDocRef, {});
        
        return NextResponse.json({ newLink : newDoc });
    }
    
    return NextResponse.json({ link_section : [] })
}

export async function GET(req : NextRequest) 
{    
    if (req.method !== 'GET') {
        return NextResponse.json({ statusCode: 405, message: 'Method Not Allowed' }); // Clear error message with appropriate status code
    }

    try {
        const documentsCollectionRef = collection(db, 'document');
        const documentsSnapshot = await getDocs(documentsCollectionRef);
        
        const documents = documentsSnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }));

        return NextResponse.json({ documents });
    }
    catch(error) 
    {
        console.error('Error fetching documents:', error);
        return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }); // Informative error message
    }
}