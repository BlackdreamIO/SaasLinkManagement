import { Box, Flex } from "@chakra-ui/react";

import AppNavbarSettings from "./AppNavbarSettings";
import AppNavbarAccount from "./AppNavbarAccount";

export default function AppNavbar() 
{
    return (
        <Box className="w-full dark:bg-theme-bgTartiary transition-all duration-200 p-3">
            <Flex className="w-full" justify={'space-between'} direction={'row'}>
                <AppNavbarSettings/>
                <AppNavbarAccount/>
            </Flex>
        </Box>
    )
}
