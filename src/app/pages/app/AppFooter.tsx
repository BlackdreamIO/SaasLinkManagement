import { Box, Text } from '@chakra-ui/react';

export default function AppFooter() 
{
    return (
        <Box className='w-full px-4 py-4 dark:bg-black relative bottom-1'>
            <Text>Built by shadcn. The source code is available on GitHub.</Text>
        </Box>
    )
}
