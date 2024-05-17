"use client"

import { Fragment, useState, useEffect } from "react";
import { FilterSearchForEnum, FilterShortByEnum } from "@/enum/index";
import { useFilterContext } from "@/context/FilterContextAPI";
import useGetTheme from "@/hook/useGetCurrentTheme";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";

type AdvanceFilterDialogProps = {
    enable : boolean;
    onClose : () => void;
}

export const AdvanceFilterDialog = (props : AdvanceFilterDialogProps) => {

    const { enable, onClose } = props;
    
    const {
        filterSearchFor,
        setFilterSearchFor,
        filterSortBy,
        setFilterSortBy,
        
        PerformSortBySize
    } = useFilterContext()!;

    const currentTheme = useGetTheme();
    const intialSettingBorderColor = currentTheme == 'dark' ? '#171717' : '#737373';
    const [currentSettingBorderColor, setCurrentSettingBorderColor] = useState<string>(intialSettingBorderColor);

    const handleSearchType = (searchType : FilterSearchForEnum) => {
        setFilterSearchFor(searchType);
    }

    const handleSortType = (sortType : FilterShortByEnum) => {
        setFilterSortBy(sortType);
    }

    const handleApply = () => {
        setCurrentSettingBorderColor('skyblue');
        
        const timeout = setTimeout(() => {
            setCurrentSettingBorderColor(intialSettingBorderColor);
            onClose();
        }, 700);

        return () => clearTimeout(timeout);
    }
    const handleClose = () => {
        setTimeout(() => {
            setCurrentSettingBorderColor(intialSettingBorderColor);
            onClose();
        }, 50);
    };

    useEffect(() => {
        switch (filterSortBy) {
            case FilterShortByEnum.SectionSize:
                PerformSortBySize()
                break;
            
            default:
                break;
        }
    }, [filterSortBy])
    

    const OptionStyle = 'w-full flex flex-row items-center justify-between border-b-2 py-4 px-4 rounded-xl';
    const DropdownMenuContentStyle = `text-sm mt-2 dark:bg-theme-bgPrimary/60 bg-theme-bgPrimaryLight/60 backdrop-blur-lg min-w-56 space-y-2`;
    const DropdownMenuItemStyle = `py-2 dark:hover:bg-neutral-300 dark:hover:text-black dark:hover:font-bold transition-none 
        data-[highlight]:dark:bg-neutral-300 data-[highlight]:dark:text-black data-[highlight]:dark:font-bold`;

    if(enable) {
        return (
            <Fragment>
                <div className={`${true ? 'opacity-70' : 'opacity-0  pointer-events-none'} fixed bg-black/90 w-full h-screen z-30 -top-0 transition-all duration-150 !backdrop-blur-sm`}></div>
                <Box
                    style={{ border : `1px solid ${currentSettingBorderColor}` }}
                    transition={'0.3s ease-in-out'}
                    className="w-full dark:bg-theme-bgPrimary bg-theme-bgSecondaryLight border shadow-lg p-4 rounded-lg space-y-5 z-50">
                        <Box className={OptionStyle}>
                            <Text className="text-center text-sm dark:text-neutral-300">Search For</Text>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-sm capitalize">
                                    {filterSearchFor}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={DropdownMenuContentStyle}>
                                    <DropdownMenuItem onClick={() => handleSearchType(FilterSearchForEnum.SearchSection)} className={DropdownMenuItemStyle}>Section {`(default)`}</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSearchType(FilterSearchForEnum.SearchLinks)} className={DropdownMenuItemStyle}>Link</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Box>
                        <Box className={OptionStyle}>
                            <Text className="text-center text-sm dark:text-neutral-300">Sort By</Text>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-sm capitalize">
                                    {filterSortBy}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={DropdownMenuContentStyle}>
                                    <DropdownMenuItem onClick={() => handleSortType(FilterShortByEnum.SectionDefault)} className={DropdownMenuItemStyle}>Default {`(SCM)`}</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortType(FilterShortByEnum.SectionSize)} className={DropdownMenuItemStyle}>Size</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortType(FilterShortByEnum.SectionTime)} className={DropdownMenuItemStyle}>Latest</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortType(FilterShortByEnum.SectionTitle)} className={DropdownMenuItemStyle}>Title</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Box>
                        <Box className="w-full grid place-content-center">
                            <Button onClick={() => handleClose()} variant={'ghost'} className="p-0 text-xl !bg-transparent">
                                <IoCloseOutline/>
                            </Button>
                        </Box>
                    </Box>
            </Fragment>
        )
    }
    else {
        return <></>
    }
}
