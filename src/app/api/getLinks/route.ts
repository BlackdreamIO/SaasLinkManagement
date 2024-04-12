import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from "@/database/firebaseConfig";

import { LinkSectionScheme } from "@/scheme/LinkSection";

export async function GET(req : NextApiRequest, res : NextApiResponse<LinkSectionScheme>) 
{
    const collectionRef = collection(db, 'document');
    const documentRef = doc(db, collectionRef.id, 'PgrjKKddMfmUB3Cxrrj2')
    
    const documnets = await getDocs(collectionRef);

    let data : any = [];
    
    const documentData = documnets.forEach((doc : any) => {
        data.push({ id: doc.id, data : doc.data()  });
    })

    //return NextResponse.json({ documnetData : data })
    const date = new Date();

    return NextResponse.json({ link_section_id : data[0].id })
}