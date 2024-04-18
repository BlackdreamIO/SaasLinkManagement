import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

import { 
    collection, 
    getDocs,  
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