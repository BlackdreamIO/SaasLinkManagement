import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest, res : NextResponse) 
{
    return NextResponse.json({ title : 'could be something' })
}