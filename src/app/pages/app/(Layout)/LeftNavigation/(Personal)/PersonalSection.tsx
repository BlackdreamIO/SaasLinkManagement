'use client'

import React, { Fragment, useState, useEffect } from "react";
import { Box, VStack, Text, HStack, Flex } from "@chakra-ui/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";

//import Setting from "./Setting";
import dynamic from 'next/dynamic'
 
const Setting = dynamic(() => import('./Setting'), { ssr: false })

export default function PersonalSection() 
{
    const [openSettingDialog, setOpenSettingDialog] = useState(false);

    const SeparateItem = ({children} : {children : React.ReactNode}) => {
        return (
            <Fragment>
                    {children}
                <DropdownMenuSeparator />
            </Fragment>
        )
    }

    return (
        <Box className="w-full py-4 flex flex-col items-center justify-center">
            <VStack className="w-full space-y-3 px-4 ">
                <HStack justify={'space-between'} className="w-full">
                    <Box className="w-6/12 overflow-hidden p-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex flex-row items-center justify-center space-x-3 !outline-none">
                                <FaUser color='lime'/> 
                                    <Text className="text-lg">Personal</Text> 
                                <FaCaretDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 dark:bg-theme-bgTartiary mt-5 ml-5 rounded-lg px-2 py-1">
                                
                                <DropdownMenuLabel className="flex flex-row items-center justify-between text-lg">
                                    Setting 
                                    <Box className="flex flex-row items-center justify-center space-x-3 text-blue-500 text-xs"> 
                                        <FaArrowUp/> <FaArrowDown/> 
                                    </Box>
                                </DropdownMenuLabel>

                                <SeparateItem>
                                    <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Create New Section</DropdownMenuItem>
                                </SeparateItem>
    
                                <SeparateItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className="text-sm py-3 rounded-lg transition-none">Export</DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent className="w-52 dark:bg-theme-bgTartiary dark:border-blue-500">
                                            <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Json</DropdownMenuItem>
                                            <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">PNG</DropdownMenuItem>
                                            <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">TXT</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Sync</DropdownMenuItem>
                                </SeparateItem>

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="text-sm py-3 rounded-lg transition-none">Preferance</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="w-52 dark:bg-theme-bgTartiary ">
                                        <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Zoom In +</DropdownMenuItem>
                                        <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Zoom Out -</DropdownMenuItem>
                                        <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Fullscreen </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>

                                <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none" onClick={() => setOpenSettingDialog(true)}>Setting</DropdownMenuItem>
                                <DropdownMenuItem className="text-sm py-3 rounded-lg transition-none">Update</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Box>
                    <Box className="w-6/12 overflow-hidden flex items-center justify-end">
                        <FaRegPenToSquare className="cursor-pointer" />
                    </Box>
                </HStack>
                <Flex className="w-full space-x-3" dir="row">
                    <Input className="w-full dark:bg-theme-bgSecondary border-none rounded-xl" />
                    <Button className="p-0 text-white text-xl !bg-transparent">
                        <IoMdSearch/>
                    </Button>
                </Flex>
            </VStack>
            
            <Setting onOpenChange={() => {}} openSetting/>

        </Box>
    )
}
