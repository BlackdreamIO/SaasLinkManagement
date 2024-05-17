"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { LinkItemScheme } from "@/scheme/LinkSection";
import { SectionScheme } from "@/scheme/SectionScheme";

export async function getLink(parentSectionID : string)
{
    const url = new URL(`http://localhost:3000/api/link/get/id=${parentSectionID}`);

    const res = await fetch(url, {
        method : 'GET',
        headers : {'content-type':'application/json'},
        cache : 'no-store'
    })

    revalidatePath("/main");

    return res;
}

export async function createLink(parentSection : SectionScheme, newLink : LinkItemScheme)
{
    const url = new URL('http://localhost:3000/api/link/create');

    const bodyData = {
        parentSectionID : parentSection.id,
        link : newLink
    }

    const res = await fetch(url, {
        method : 'POST',
        headers : {'content-type':'application/json'},
        cache : 'no-store',
        body : JSON.stringify(bodyData)
    })

    const resJson = await res.json();

    revalidatePath("/main");

    return resJson;
}

export async function updateLink(parentSection : SectionScheme, updatedLink : LinkItemScheme )
{
    const url = new URL('http://localhost:3000/api/link/update');

    const response = await fetch(url, {
        method : 'PUT',
        cache : 'no-store',
        body : JSON.stringify({})
    })

    const responseJSON = await response.json();

    revalidatePath("/main");

    return responseJSON;
}

export async function deleteLink(parentSection : SectionScheme, link : LinkItemScheme )
{
    const url = new URL('http://localhost:3000/api/link/delete')

    const response = await fetch(url, {
        method : 'DELETE',
        cache : 'no-store',
        body : JSON.stringify({ 
            parentSectionID : parentSection.id,
            linkID : link.id
        })
    })

    const resJson = await response.json();

    revalidatePath("/main");

    return resJson;
}