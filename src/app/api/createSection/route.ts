import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    orderBy, 
    query, 
    where,
    queryEqual 
} from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

// GET ALL DOCUMENT

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

// CREATE NEW DOCUMENT WITH EMPTY DATA

export async function POST(req : Request) 
{
    const sectionData = await req.json();

    if((req.method === 'POST')) 
    {
        const collectionReferance = collection(db, 'document');
        const newDocRef = doc(db, collectionReferance.id, sectionData.id);
    
        // create document with default document data {}
        const newDoc = await setDoc(newDocRef, {});
        
        return NextResponse.json({ newLink : newDoc });   
    }
    
    return NextResponse.json({ documents : [] })
}

// UPDATE SINGLE DOCUMENT

export async function PUT(req : NextRequest) 
{
    const sectionData = await req.json();

    try 
    {
        const collectionReferance = collection(db, 'document');
        const originalDocumentReferance = doc(db, collectionReferance.id, sectionData.id);
        const snapshot = await getDoc(originalDocumentReferance);

        if (snapshot.exists()) // check if the document exists
        {
            const data = snapshot.data(); // get original document data
            const mergedData = { ...sectionData.data, ...data };

            const currentDocumentRef = sectionData.newID == "" ? originalDocumentReferance : doc(db, collectionReferance.id, sectionData.newID);
            
            await setDoc(currentDocumentRef, mergedData, { merge : true });

            if(sectionData.newID != "") { await deleteDoc(originalDocumentReferance); }
            
            return NextResponse.json({ status : 'updated' });
        }
        else 
        {
            return NextResponse.json({ status : 'document does not exist' });
        }

    }
    catch (err) 
    {
        return NextResponse.json({ status : `failed to updated ${err}` });
    }
}

// DELETE SINGLE DOCUMENT

export async function DELETE(req : NextRequest) 
{
    const sectionData = await req.json();
    try 
    {
        const collectionReferance = collection(db, 'document');
        const docReferance = doc(db,  collectionReferance.id, sectionData.id)    
        await deleteDoc(docReferance);
        
        return NextResponse.json({ status : 'deleted document' })
    } 
    catch (error) 
    {
        return NextResponse.json({ status : `failed to delete document ${error}` })
    }
}