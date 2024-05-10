'use client'

import { useState } from "react";
import { useSectionContext } from "@/context/SectionContextAPI";
import dynamic from 'next/dynamic';
 
import { Box } from "@chakra-ui/react";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import GenerateCryptoUUID from "@/globalFunction/GenerateCryptoUUID";
import { serverTimestamp } from "firebase/firestore";

const Setting = dynamic(() => import('../(Setting)/Setting'), { ssr: false })

export default function AppNavbarSettings()
{
    const [openSettingDialog, setOpenSettingDialog] = useState(false);
    const [menubarOpen, setMenubarOpen] = useState(false);

    const MenubarTriggerStyle = `dark:text-neutral-500 dark:hover:!text-black dark:hover:!bg-neutral-300 data-[highlighted]:dark:text-black data-[highlighted]:dark:bg-neutral-300 
        text-neutral-500 hover:!text-white hover:!bg-theme-bgPrimary transition-all duration-250 text-lg max-sm:text-xs max-xl:text-sm rounded-lg`;
    const MenuItemStyle = `dark:text-neutral-500 dark:hover:!text-black dark:hover:!bg-neutral-300 data-[highlighted]:dark:text-black data-[highlighted]:dark:bg-neutral-300 
        text-neutral-500 hover:!text-white hover:!bg-theme-bgPrimary transition-all duration-250 text-lg max-sm:text-xs max-xl:text-sm rounded-lg`;
    const MenubarContentStyle = `dark:bg-theme-bgPrimary dark:border-neutral-700 mt-3 min-w-80 max-sm:min-w-0 p-2`;
    
    const { CreateSection } = useSectionContext()!;

    const CreateNewSection = async () => {
        await CreateSection({
            id : GenerateCryptoUUID({ mode : 'randomUUID', length : 10 }),
            data : [],
            
        })
    }

    const handleMenubarOpen = (value : string) => setMenubarOpen(value != '');

    return (
        <Box>
            <Menubar onValueChange={handleMenubarOpen} className="border-none !bg-transparent">
                <MenubarMenu>
                    <MenubarTrigger className={MenubarTriggerStyle}>File</MenubarTrigger>
                    <MenubarContent className={MenubarContentStyle}>
                        <MenubarItem className={MenuItemStyle} onClick={() => CreateNewSection()}>
                            New Section
                        </MenubarItem>
                        <MenubarItem className={MenuItemStyle} disabled>New Window </MenubarItem>
                        <MenubarItem className={MenuItemStyle} disabled>New Incognito Window</MenubarItem>
                        <MenubarSub>
                            <MenubarSubTrigger className={MenubarTriggerStyle}>Export</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem className={MenuItemStyle}>Json</MenubarItem>
                                <MenubarItem className={MenuItemStyle}>Txt</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem className={MenuItemStyle} onClick={() => setOpenSettingDialog(true)}> Setting </MenubarItem>
                        <MenubarItem className={MenuItemStyle}> Check For Update </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className={MenubarTriggerStyle}>View</MenubarTrigger>
                    <MenubarContent className={MenubarContentStyle}>
                        <MenubarItem className={MenuItemStyle}> Zoom In + </MenubarItem>
                        <MenubarItem className={MenuItemStyle}> Zoom Out - </MenubarItem>
                        <MenubarItem disabled className={MenubarTriggerStyle}>Search</MenubarItem>
                        <MenubarItem className={MenubarTriggerStyle}>Reload</MenubarItem>
                        <MenubarItem className={MenubarTriggerStyle}>Force Reload {'(Fetch Again)'}</MenubarItem>
                        <MenubarItem className={MenubarTriggerStyle}>Toggle Fullscreen</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className={MenubarTriggerStyle}>Preference</MenubarTrigger>
                    <MenubarContent className={MenubarContentStyle}>
                        <MenubarSub>
                            <MenubarSubTrigger className={MenubarTriggerStyle}>Theme</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem className={MenuItemStyle}>Dark</MenubarItem>
                                <MenubarItem className={MenuItemStyle}>Light</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem className={MenubarTriggerStyle}>Clear Cache</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <div className={`${menubarOpen ? 'opacity-60' : 'opacity-0'} fixed bg-black/60 w-full h-screen z-30 -top-0 pointer-events-none transition-all duration-150 !backdrop-blur-sm`}></div>
            <Setting onOpenChange={() => setOpenSettingDialog(false)} openSetting={openSettingDialog} />
        </Box>
    )
}
