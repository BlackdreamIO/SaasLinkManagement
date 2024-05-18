"use server"

import { SectionScheme } from "@/scheme/SectionScheme";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createSection(newSection : SectionScheme)
{
    const url = 'http://localhost:3000/api/section/create';

    try 
    {
        const res = await fetch(url, {
            method : 'POST',
            cache : 'no-store',
            headers: {'content-type':'application/json'},
            body : JSON.stringify(newSection)
        })
    
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const resJson = await res.json();
    
        revalidatePath("/main");
    
        return resJson;   
    } 
    catch (error : any) 
    {
        throw new Error('Error creating section:', error);
    }
}

export async function getSections()
{
    const url = 'http://localhost:3000/api/section/get';

    const response = await fetch(url, {
        method : 'GET',
        cache : 'no-store',
        headers: { 'content-type' : 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch section data');
    }

    const data = await response.json();

    revalidatePath("/main");

    return data;
}

export async function updateSection(currentSectionID : string, updatedSection : SectionScheme)
{
    const url = 'http://localhost:3000/api/section/update';
    
    const bodyDataWithTitleUpdate = {
        id : currentSectionID,
        newID : updatedSection.id,
        data : updatedSection.data  
    }
    const bodyData = {
        id : currentSectionID,
        newID : updatedSection.id,
        data : updatedSection.data
    }

    const currentBodyData = currentSectionID === updatedSection.id ? bodyData : bodyDataWithTitleUpdate

    const response = await fetch(url, {
        method : 'PUT',
        cache : 'no-store',
        headers: { 'content-type' : 'application/json' },
        body : JSON.stringify(bodyData)
    });

    revalidatePath("/main");

    const responseJson = await response.json();
    return responseJson;
}

export async function deleteSection(deleteSectionID : string )
{
    const url = 'http://localhost:3000/api/section/delete';

    const response = await fetch(url, {
        method : 'DELETE',
        cache : 'no-store',
        headers: { 'content-type' : 'application/json' },
        body : JSON.stringify({ id : deleteSectionID })
    });

    revalidatePath("/main");

    const responseJson = await response.json();
    return responseJson;
}

