import { Box } from "@chakra-ui/react";
import AppLayout from "./(Layout)/AppLayout";

export default function page() 
{
    return (
        <Box className="w-full dark:bg-black min-h-screen max-h-auto m-auto select-none">
            <AppLayout />
        </Box>
    )
}
