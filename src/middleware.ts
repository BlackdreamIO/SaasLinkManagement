import { NextRequest, NextResponse } from "next/server";
import ratelimit from "./utils/rateLimit";

export default async function middleware(req:NextRequest) 
{
    const ip = req.ip ?? '127.0.0.1';

    //const results = await ratelimit.limit(ip);
    
    if(1 + 1 == 3) {
        console.log('too many request thread has been blocked by middleware');
        return NextResponse.json({ message : 'too many request', status : 429 })
    }

    console.count('request has been send');
    
    return NextResponse.next();
}