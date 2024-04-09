import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { IoSettingsOutline } from "react-icons/io5";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"


export default function AppNavbar() 
{
    return (
        <Box className="dark:bg-black bg-neutral-200 shadow-lg max-sm:bg-neutral-200 p-2 
        relative inset-x-0 top-0 z-30 mx-auto w-full border dark:border-neutral-600 border-gray-300 max-w-3xl rounded-xl">
           <HStack justify={'space-between'}>
                
                <Menubar className='bg-transparent border-transparent'>
                    <MenubarMenu>
                        <MenubarTrigger className='text-neutral-500 dark:hover:text-white hover:text-black'>File</MenubarTrigger>
                        <MenubarContent className='bg-black mt-2'>
                            <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'> New Section </MenubarItem>
                            <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'> New Link </MenubarItem>
                            <MenubarItem disabled className='dark:hover:bg-blue-700 hover:bg-blue-700'>New Incognito Section</MenubarItem>
                            <MenubarSeparator />
                            <MenubarSub>
                                <MenubarSubTrigger className='dark:hover:bg-blue-700 hover:bg-blue-700'>Export As</MenubarSubTrigger>
                                <MenubarSubContent className='bg-black'>
                                    <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>TXT</MenubarItem>
                                    <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>JSON</MenubarItem>
                                    <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>PNG</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarSeparator />
                            <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'> Save </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className='text-neutral-500 dark:hover:text-white hover:text-black'>View</MenubarTrigger>
                        <MenubarContent className='bg-black mt-2'>
                            <MenubarCheckboxItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>Zoom In +</MenubarCheckboxItem>
                            <MenubarCheckboxItem className='dark:hover:bg-blue-700 hover:bg-blue-700'> Zoom Out - </MenubarCheckboxItem>
                            <MenubarSeparator />
                            <MenubarItem inset className='dark:hover:bg-blue-700 hover:bg-blue-700'> Reload </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem inset className='dark:hover:bg-blue-700 hover:bg-blue-700'>Toggle Fullscreen</MenubarItem>
                            <MenubarSeparator />
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className='text-neutral-500 dark:hover:text-white hover:text-black'>Preference</MenubarTrigger>
                        <MenubarContent className='bg-black mt-2'>
                            <MenubarSub>
                                <MenubarSubTrigger className='dark:hover:bg-blue-700 hover:bg-blue-700'>Theme</MenubarSubTrigger>
                                <MenubarSubContent className='bg-black'>
                                    <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>Light</MenubarItem>
                                    <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>Dark</MenubarItem>
                                    <MenubarItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>System</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>


                <Text className='text-[aquamarine]'>UNKNOWN LINK</Text>

                <DropdownMenu>
                    <DropdownMenuTrigger className='flex flex-row items-center space-x-3'>
                        <Image 
                            className='w-10 rounded-full'
                            src='https://yt3.ggpht.com/zTZn0PhE7hCZV6E1zmnqPupOh9ZfpjsL-ZQyNKeORpIDhTPy1p2XIRC7V4trzZ0TZrKkkhdBaQ=s48-c-k-c0x00ffffff-no-rj'
                            alt='profile icon was not found'
                        />
                        <Text>Mohammed Hamim</Text>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='dark:bg-black mt-2'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>Log Out</DropdownMenuItem>
                        <DropdownMenuItem className='dark:hover:bg-blue-700 hover:bg-blue-700'>Setting</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
           </HStack>
        </Box>
    )
}
