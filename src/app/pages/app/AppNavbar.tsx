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
    const menuItemsStyle = `hover:!bg-blue-700 hover:!text-white`

    return (
        <Box className="dark:bg-black bg-neutral-200 shadow-lg max-sm:bg-neutral-200 p-2 
        relative inset-x-0 top-0 z-30 mx-auto w-full border dark:border-neutral-600 border-gray-300 max-w-3xl rounded-xl">
           <HStack justify={'space-between'}>
                
                <Menubar className='bg-transparent border-transparent'>
                    <MenubarMenu>
                        <MenubarTrigger className='text-neutral-500 dark:hover:text-white hover:text-black'>File</MenubarTrigger>
                        <MenubarContent className='dark:bg-black mt-2'>
                            <MenubarItem className={menuItemsStyle}> New Section </MenubarItem>
                            <MenubarItem className={menuItemsStyle}> New Link </MenubarItem>
                            <MenubarItem disabled className={menuItemsStyle}>New Incognito Section</MenubarItem>
                            <MenubarSeparator />
                            <MenubarSub>
                                <MenubarSubTrigger className={menuItemsStyle}>Export As</MenubarSubTrigger>
                                <MenubarSubContent className='dark:bg-black'>
                                    <MenubarItem className={menuItemsStyle}>TXT</MenubarItem>
                                    <MenubarItem className={menuItemsStyle}>JSON</MenubarItem>
                                    <MenubarItem className={menuItemsStyle}>PNG</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarSeparator />
                            <MenubarItem className={menuItemsStyle}> Save </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className='text-neutral-500 dark:hover:text-white hover:text-black'>View</MenubarTrigger>
                        <MenubarContent className='dark:bg-black mt-2'>
                            <MenubarCheckboxItem className={menuItemsStyle}>Zoom In +</MenubarCheckboxItem>
                            <MenubarCheckboxItem className={menuItemsStyle}> Zoom Out - </MenubarCheckboxItem>
                            <MenubarSeparator />
                            <MenubarItem inset className={menuItemsStyle}> Reload </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem inset className={menuItemsStyle}>Toggle Fullscreen</MenubarItem>
                            <MenubarSeparator />
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className='text-neutral-500 dark:hover:text-white hover:text-black'>Preference</MenubarTrigger>
                        <MenubarContent className='dark:bg-black mt-2'>
                            <MenubarSub>
                                <MenubarSubTrigger className={menuItemsStyle}>Theme</MenubarSubTrigger>
                                <MenubarSubContent className='dark:bg-black'>
                                    <MenubarItem className={menuItemsStyle}>Light</MenubarItem>
                                    <MenubarItem className={menuItemsStyle}>Dark</MenubarItem>
                                    <MenubarItem className={menuItemsStyle}>System</MenubarItem>
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
                        <DropdownMenuItem className={menuItemsStyle}>Log Out</DropdownMenuItem>
                        <DropdownMenuItem className={menuItemsStyle}>Setting</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
           </HStack>
        </Box>
    )
}
