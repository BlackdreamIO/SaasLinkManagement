"use client"

import { useEffect, useState, useMemo, useCallback, Suspense, lazy } from "react";
import { FilterUpdateModeEnum, SearchMethodEnum, FilterSearchForEnum, FilterShortByEnum } from "@/enum/index";
import { useSectionContext } from "@/context/SectionContextAPI";
import { useFilterContext } from "@/context/FilterContextAPI";
import useGetTheme from "@/hook/useGetCurrentTheme";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSettingsOutline } from "react-icons/io5";
import { HorizontalIndicator } from "./HorizontalIndicator";

const FilterStatus = lazy(() => import("./FilterStatus").then(module => ({ default: module.FilterStatus })));
const SearchFilterSetting = lazy(() => import("./SearchFilterSetting").then(module => ({ default: module.SearchFilterSetting })));
const AdvanceFilterDialog = lazy(() => import("./AdvanceFilterDialog").then(module => ({ default: module.AdvanceFilterDialog })));

// MEMORIZATION 
// FAST RESPONSIVE

export default function ViewLayout() 
{
    const { 
        enableFilterContextSections, 
        setEnableFilterContextSections, 
        setFilteredContextSections, 
        filteredContextSections,
        contextSections
    } = useSectionContext()!;

    const {
        filterUpdateMode,
        searchMethod,
        filterSearchFor,
        filterSortBy,

        setSearchText,
        searchText,

        PerformSearchFilter,
        PerformHighlightSearchFilter
    } = useFilterContext()!;
    
   
    const [openSearchFilterSetting, setOpenSearchFilterSetting] = useState(false);
    const [openAdvanceFilter, setOpenAdvanceFilter] = useState(false);

    const currentTheme = useGetTheme();
    const InitialHorizontalIndicatorColor = currentTheme == "dark" ? '#262626' : '#262626';
    const [horizontalIndicatorColor, setHorizontalIndicatorColor] = useState<string>(InitialHorizontalIndicatorColor);

    const handleSearchFilter = (triggerType : "click" | "keybaord", event? : any) => {
        if (filterUpdateMode === FilterUpdateModeEnum.ReplaceData) {
            if ((triggerType === 'keybaord' && event?.key === 'Enter') || triggerType === 'click') {
                PerformSearchFilter();
            }
        }
        else if (filterUpdateMode == FilterUpdateModeEnum.HighlightOnly) {
            if ((triggerType === 'keybaord' && (event?.key === 'Enter' || event?.key === 'Spacae')) || triggerType === 'click') {
                PerformHighlightSearchFilter(searchText);
            }
        }
    }

    useEffect(() => {
        if(searchText == '') {
            setEnableFilterContextSections(false);
            setFilteredContextSections([]);
        }
    }, [searchText, enableFilterContextSections, filterUpdateMode])

    useEffect(() => {
        currentTheme == 'dark' ? setHorizontalIndicatorColor('white') : setHorizontalIndicatorColor('skyblue');
        const timeoutID = setTimeout(() => {
            setHorizontalIndicatorColor(InitialHorizontalIndicatorColor);
        }, 700);
 
        return () => clearTimeout(timeoutID);
    }, [filteredContextSections]);
    
    useEffect(() => {
        switch (currentTheme) {
            case 'dark':
                setHorizontalIndicatorColor('cyan');
                break;
            case 'light':
                setHorizontalIndicatorColor('cyan');
                break;
        }
        const timeoutID = setTimeout(() => {
            setHorizontalIndicatorColor(InitialHorizontalIndicatorColor);
        }, 700);
 
        return () => clearTimeout(timeoutID);
    }, [filterUpdateMode, searchMethod, filterSortBy, filterSearchFor])
    

    return (
        <Box className="w-10/12 m-auto rounded-2xl border border-neutral-800 mt-2 dark:bg-theme-bgPrimary">
            <VStack className="w-full space-y-4 p-5">
                <Flex className="w-full flex flex-row items-center justify-between space-x-3">

                    <Box className="flex flex-row items-center justify-center space-x-3">
                        <Button
                            variant={'secondary'}
                            className="w-32 rounded-lg py-5 dark:bg-theme-bgSecondary dark:hover:bg-theme-bgTartiary border focus-visible:!border-blue-500 !ring-0"
                            onClick={() => setOpenAdvanceFilter(true)}>
                            Filter
                        </Button>
                    </Box>
                    
                    <HorizontalIndicator 
                        horizontalIndicatorColor={horizontalIndicatorColor}
                        label={filteredContextSections.length > 0 ? `${filteredContextSections.length} found` : ''}
                    />

                    <Box className="flex flex-row items-center justify-center space-x-3">
                        <Input
                            placeholder="Search >" 
                            className="!ring-0 w-96 py-5 dark:bg-theme-bgPrimary placeholder:text-center text-center focus-visible:border-blue-500  rounded-lg" 
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => handleSearchFilter('keybaord', e)}
                        />
                        <Button
                            variant={'secondary'}
                            className="w-32 rounded-lg py-5 dark:bg-theme-bgSecondary dark:hover:bg-theme-bgTartiary border focus-visible:!border-blue-500 !ring-0"
                            onClick={() => handleSearchFilter('click')}>
                            Search
                        </Button>

                        <Button
                            variant={'ghost'}
                            className="p-0 !bg-transparent text-xl"
                            onClick={() => setOpenSearchFilterSetting(!openSearchFilterSetting)}>
                            <IoSettingsOutline/>
                        </Button>
                    </Box>
                </Flex>

                { /* Suspense And Lazy Loading Also Dynamic Rendering Has Been Use To Improve The Performance */ }
                

                <Suspense fallback={<Text>loading</Text>}>
                    {
                        openSearchFilterSetting && (
                            <SearchFilterSetting 
                                enable={openSearchFilterSetting}
                                onClose={() => setOpenSearchFilterSetting(false)}
                            />
                        )
                    }
                </Suspense>

                <Suspense fallback={<Text>loading</Text>}>
                    {
                        openAdvanceFilter && (
                            <AdvanceFilterDialog
                                enable={openAdvanceFilter}
                                onClose={() => setOpenAdvanceFilter(false)}
                            />
                        )
                    }
                </Suspense>

            </VStack>
        </Box>
    )
}
