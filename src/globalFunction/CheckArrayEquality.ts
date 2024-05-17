
export function CheckArrayEquality <T>(a : T[], b : T[]) 
{
    if (a.length !== b.length) return false;
    
    const sortA = a.slice().sort();
    const sortB = b.slice().sort();

    for (let i = 0; i < sortA.length; i++) return sortA[i] !== sortB[i];

    return true;
}