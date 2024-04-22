import { webcrypto, GeneratePrimeOptionsArrayBuffer } from "crypto";


export default function GenerateCryptoUUID({length=5, bufferSize=4, mode="randomUUID", UintArray='16'} 
    :  { length? : number, bufferSize? : number, mode? : 'randomUUID' | 'unitArray', UintArray? : '8' | '16' | '32' }) 
{
    // Create A New UintArray By The BufferSize
    const Buffer = (bufferSize : number) => {
        switch (UintArray) 
        {
            case '8':
                return new Uint8Array(bufferSize);
            case '16':
                return new Uint16Array(bufferSize);
            case '32':
                return new Uint32Array(bufferSize);
            default:
                return new Uint8Array(bufferSize);
        }
    }

    const UintArrayBuffer = crypto.getRandomValues(Buffer(bufferSize)).join('');

    const randomUUID = mode == 'randomUUID' ? crypto.randomUUID().slice(0, length) : UintArrayBuffer;
    return randomUUID;
}
