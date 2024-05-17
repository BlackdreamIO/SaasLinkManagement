import { NextRequest, NextResponse } from "next/server";

import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "@/database/firebase";

import { LinkItemScheme } from "@/scheme/LinkSection";

export async function GET(req : NextRequest) 
{
    try {
        const parentSectionID = req.nextUrl.searchParams.get("id") || "";

        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, parentSectionID);
        
        const links  = (await getDoc(documentRef)).data();
        
        if(links) {
            return NextResponse.json({ status : 200, message : 'links found', data : links });
        }
        return NextResponse.json({ status : 404, message : 'no link found', error : '', data : [] });
    }
    catch (error) {
        return NextResponse.json({ status : 500, message : 'internal server error', error : error, data : [] });
    }
}