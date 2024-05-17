"use client"

import { Fragment, useState } from "react";
import { useFilterContext } from "@/context/FilterContextAPI";
import { FilterUpdateModeEnum, SearchMethodEnum } from "@/enum/index";
import { motion } from "framer-motion";
import useGetTheme from "@/hook/useGetCurrentTheme";

import { Box, Text, VStack } from "@chakra-ui/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";

type SearchFilterSettingProps = {
    enable : boolean;
    onClose : () => void;
}

export const SearchFilterSetting = (props : SearchFilterSettingProps) => {
    
    const { enable, onClose } = props;

    const {
        filterUpdateMode,
        setFilterUpdateMode,
        searchMethod,
        setSearchMethod
    } = useFilterContext()!;

    const currentTheme = useGetTheme();
    const intialSettingBorderColor = currentTheme == 'dark' ? '#171717' : '#737373';
    const [currentSettingBorderColor, setCurrentSettingBorderColor] = useState<string>(intialSettingBorderColor);

    const OptionStyle = 'w-full flex flex-row items-center justify-between border-b-2 py-4 px-4 rounded-xl';
    const DropdownMenuContentStyle = `text-sm mt-2 dark:bg-theme-bgPrimary/60 bg-theme-bgPrimaryLight/60 backdrop-blur-lg min-w-56 space-y-2`;
    const DropdownMenuItemStyle = `py-2 dark:hover:bg-neutral-300 dark:hover:text-black dark:hover:font-bold transition-none 
        data-[highlight]:dark:bg-neutral-300 data-[highlight]:dark:text-black data-[highlight]:dark:font-bold`;
    const DropdownTriggerStyle ="dark:text-neutral-300 dark:hover:text-white text-sm capitalize !ring-0 outline-4 !border-none focus-within:!outline-blue-500 focus-within:outline-double cursor-default"

    const handleFilterUpdateMode = (updateMode : FilterUpdateModeEnum) => {
        setFilterUpdateMode(updateMode);
        handleApply();
    }

    const handleSearchMethod = (searchMethod : SearchMethodEnum) => {
        setSearchMethod(searchMethod);
        handleApply();
    }

    const handleApply = () => {
        setCurrentSettingBorderColor('skyblue');
        
        const timeout = setTimeout(() => {
            setCurrentSettingBorderColor(intialSettingBorderColor);
        }, 700);

        return () => clearTimeout(timeout);
    }
    const handleClose = () => {
        setTimeout(() => {
            setCurrentSettingBorderColor(intialSettingBorderColor);
            onClose();
        }, 50);
    };

    return (
        <Fragment>
            {
                enable && (
                    <Fragment>
                        <div className={`${true ? 'opacity-70' : 'opacity-0  pointer-events-none'} fixed bg-black/90 w-full h-screen z-30 -top-0 transition-all duration-150 !backdrop-blur-sm`}></div>

                        <Box
                            initial={{ opacity : 0 }} animate={{ opacity : 1 }} 
                            as={motion.div}
                            style={{ border : `1px solid ${currentSettingBorderColor}` }}
                            transition={'0.3s ease-in-out'}
                            className="w-full dark:bg-theme-bgPrimary bg-theme-bgSecondaryLight border shadow-lg p-4 rounded-lg space-y-10 z-50">  
                            <VStack className="w-full">
                                <Box className={OptionStyle}>
                                    <Text className="text-center text-sm dark:text-neutral-300">Visibile Style</Text>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={DropdownTriggerStyle}>
                                            {filterUpdateMode}
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className={DropdownMenuContentStyle}>
                                            <DropdownMenuItem onClick={() => handleFilterUpdateMode(FilterUpdateModeEnum.ReplaceData)} className={DropdownMenuItemStyle}>Full Update</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleFilterUpdateMode(FilterUpdateModeEnum.HighlightOnly)} className={DropdownMenuItemStyle}>Highlight Only</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Box>
                                <Box className={OptionStyle}>
                                    <Text className="text-center text-sm dark:text-neutral-300">Search Method</Text>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={DropdownTriggerStyle}>
                                            {searchMethod}
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className={DropdownMenuContentStyle}>
                                            <DropdownMenuItem onClick={() => handleSearchMethod(SearchMethodEnum.SimilerResult)} className={DropdownMenuItemStyle}>Find Similer</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleSearchMethod(SearchMethodEnum.ExectResult)} className={DropdownMenuItemStyle}>Find Exect</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Box>
                                <Button onClick={() => handleClose()} variant={'ghost'} className="p-0 text-xl !bg-transparent">
                                    <IoCloseOutline/>
                                </Button>
                            </VStack>
                        </Box>
                    </Fragment>
                )
            }
        </Fragment>
    )
}
