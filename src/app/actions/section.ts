"use server"

import { SectionScheme } from "@/scheme/SectionScheme";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createSection(newSection : SectionScheme)
{
    const url = 'https://663c4a1517145c4d8c35b1ee.mockapi.io/links';

    const res = await fetch(url, {
        method : 'POST',
        cache : 'no-store',
        headers: {'content-type':'application/json'},
        body : JSON.stringify(newSection)
    })

    const resJson = await res.json();

    revalidatePath("/main");

    return resJson;
}

export async function getSections() : Promise<SectionScheme[]>
{
    const url = 'https://663c4a1517145c4d8c35b1ee.mockapi.io/links';

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

export async function updateSection({currentSectionID, updatedSection} : { currentSectionID : string, updatedSection : SectionScheme })
{
    const sUrl = 'https://663c4a1517145c4d8c35b1ee.mockapi.io/links';

    console.log({currentSectionID : currentSectionID, updatedSection : updatedSection});
    
    const section_response = await fetch(sUrl, {
        method : 'GET',
        cache : 'no-store',
        headers: { 'content-type' : 'application/json' }
    });

    const sectionJson = await section_response.json();

    const currentSectionOneID = sectionJson.find((section : any) => section.id == currentSectionID)?.ids;

    if(sectionJson && currentSectionOneID) {
        const url = `https://663c4a1517145c4d8c35b1ee.mockapi.io/links/${currentSectionOneID}`;

        const res = await fetch(url, {
            method : 'PUT',
            cache : 'no-store',
            headers: {'content-type':'application/json'},
            body : JSON.stringify({
                id : updatedSection.id,
                data : updatedSection.data,
                created_at : 'unknownTime'
            })
        });
        const jsonData = await res.json();
        revalidatePath("/main");
        return jsonData;
    }

    // const resJson = await res.json();
    //console.log(res);
    

    revalidatePath("/main");

    return [];
}
