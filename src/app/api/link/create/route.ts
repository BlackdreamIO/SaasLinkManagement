import { NextResponse } from "next/server";

import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "@/database/firebase";
import { LinkItemScheme } from "@/scheme/LinkSection";

export async function POST(req : Request) 
{
    try {
        const body = await req.json();

        const collectionRef = collection(db, 'document');
        const documentRef = doc(db, collectionRef.id, body.parentSectionID);
        const snapshot = await getDoc(documentRef);
        
        const linkData : LinkItemScheme = body.link;

        if(snapshot.exists()) {
            const response =await setDoc(documentRef, {
                [linkData.id] : {
                    id : linkData.id,
                    title : linkData.title,
                    url : linkData.url,
                    created_at : serverTimestamp()
                }
            }, { merge : true });

            return NextResponse.json({ status : 200, message : 'field created sucessfully', error : '', data : response });
        }
        return NextResponse.json({ status : 404, message : 'parent document was not found', error : '', data : [] });
    } 
    catch (error) {
        return NextResponse.json({ status : 500, message : `internal server error ${error}`, error : error, data : [] });
    }
}