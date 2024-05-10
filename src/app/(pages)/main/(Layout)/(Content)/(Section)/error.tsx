'use client' // Error components must be Client Components
 
import { Button } from '@/components/ui/button'
import { Text } from '@chakra-ui/react'
import { useEffect } from 'react'
 
export default function Error({ error, reset, }: { error: Error & { digest?: string }; reset: () => void }) 
{
    useEffect(() => {
        console.error(error)
    }, [error])
 
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <Text className='text-center text-xl !text-yellow-400'>Logical State Error</Text>
            <Button className='w-3/12' onClick={() => reset()}>
                Try Rerender
            </Button>
        </div>
    )
}