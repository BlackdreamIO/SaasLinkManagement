import { useState } from "react";
import Link from "next/link";
import { SectionItemProps } from "@/types/types";

import { Box, Text, HStack} from "@chakra-ui/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BsThreeDotsVertical } from "react-icons/bs";
import { IoPencil } from "react-icons/io5";
import { LinkItemScheme } from "@/scheme/LinkSection";
import { RiDeleteBin7Line } from "react-icons/ri";

interface SectionItemInterfaceProps extends LinkItemScheme {
    onLinkTitleEdit : (newTitle : string) => void;
    onLinkUrlEdit : (newUrl: string) => void;
    onLinkDelete : (id : string) => void;
}

export default function SectionItem(props : SectionItemInterfaceProps) 
{
    const { title, link, onLinkTitleEdit, onLinkUrlEdit, onLinkDelete } = props;

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);

    const [newUrl, setNewUrl] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const handleEditUrl = () => { 
        if(newUrl.length > 2) {
            onLinkUrlEdit?.(newUrl);
            setEditUrl(false);
        }
    }
    
    const handleEditTitle = () => { 
        if(newTitle.length > 2) {
            onLinkTitleEdit?.(newTitle);
            setEditTitle(false);
        }
    }

    const handleEditUrlClose = () => setEditUrl(false);
    const handleEditTitleClose = () => setEditTitle(false);

    const handleDeleteLinkItem = () => onLinkDelete?.('2');

    return (
        <Box className="dark:bg-neutral-900 bg-neutral-100 shadow-md p-3 w-full rounded-lg border border-transparent hover:border-neutral-700">
            <HStack justify={'space-between'} className="items-center max-sm:!flex-col space-x-5">
                
                <Box tabIndex={1} className="max-w-6/12 w-6/12 max-sm:max-w-full max-sm:w-full overflow-hidden group">
                    {
                        editTitle ?
                        (
                            <HStack>
                                <Input placeholder={title} onChange={(e) => setNewTitle(e.target.value)} className="bg-transparent" />
                                <Button variant={'default'} onClick={handleEditTitle}>Edit</Button>
                                <Button variant={'outline'} onClick={handleEditTitleClose}>Cancell</Button>
                            </HStack>
                        )
                        :
                        ( 
                            <HStack className="space-x-3 items-center">
                                <Text className="text-sm text-left truncate">{title}</Text>
                                <IoPencil 
                                    className="hidden group-hover:block group-focus:block cursor-pointer" 
                                    tabIndex={1}
                                    onClick={() => setEditTitle(true)}
                                />
                            </HStack> 
                        )
                    }
                </Box>
                
                <Box className="max-w-5/12 w-5/12 max-sm:max-w-full max-sm:w-full overflow-hidden">
                    {
                        editUrl ?
                        (
                            <HStack tabIndex={1}>
                                <Input placeholder={link} onChange={(e) => setNewUrl(e.target.value)} className="bg-transparent" />
                                <Button variant={'default'} onClick={handleEditUrl}>Edit</Button>
                                <Button variant={'outline'} onClick={handleEditUrlClose}>Cancell</Button>
                            </HStack>
                        )
                        :
                        (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="group">
                                        <HStack className="space-x-3 items-center">
                                            <Link href={link} target="_blank" className="text-sm italic text-blue-400 hover:text-blue-300 truncate cursor-pointer">
                                                {link}
                                            </Link>
                                            <IoPencil 
                                                className="hidden group-hover:block group-focus:block cursor-pointer" 
                                                tabIndex={1}
                                                onClick={() => setEditUrl(true)}
                                            />
                                        </HStack> 
                                    </TooltipTrigger>
                                    <TooltipContent className="dark:bg-black dark:text-neutral-500">
                                      {link}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    }
                </Box>
                
                <Box className="flex flex-row items-center space-x-5">
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <BsThreeDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-[250px] mr-2 flex flex-col space-y-2">
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setEditUrl(true)}>
                                Edit Url
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditTitle(true)}>
                                Edit Title
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                Scan For Safety
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                Move To Incognito/Private
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-red-500 hover:!text-white hover:!bg-red-500" 
                                onClick={handleDeleteLinkItem}>
                                    Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <RiDeleteBin7Line className="text-red-500" size={'1rem'} />
                </Box>
            
            </HStack>
        </Box>
    )
}
