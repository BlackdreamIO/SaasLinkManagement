"use client"

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, useCallback, useMemo } from 'react';
import { FilterUpdateModeEnum, SearchMethodEnum, FilterSearchForEnum, FilterShortByEnum } from '@/enum';
import { useSectionContext } from './SectionContextAPI';
import { FilterSectionScheme } from '@/scheme/SectionScheme';
import useLocalStorage from '@/hook/useLocalStorage';
import useDebounce from '@/hook/useDebounce';

interface IFilterContextData {
    filterUpdateMode: FilterUpdateModeEnum;
    setFilterUpdateMode: Dispatch<SetStateAction<FilterUpdateModeEnum>>;

    searchMethod: SearchMethodEnum;
    setSearchMethod: Dispatch<SetStateAction<SearchMethodEnum>>;

    filterSearchFor : FilterSearchForEnum;
    setFilterSearchFor: Dispatch<SetStateAction<FilterSearchForEnum>>;

    filterSortBy : FilterShortByEnum;
    setFilterSortBy: Dispatch<SetStateAction<FilterShortByEnum>>;

    searchText : string;
    setSearchText: Dispatch<SetStateAction<string>>;
}

interface IFilterContextFilterFunctions {
    PerformSearchFilter : () => void;
    PerformHighlightSearchFilter: (searchText : string) => void;
    PerformSortBySize : () => void;
}

interface IFilterContext extends IFilterContextData, IFilterContextFilterFunctions {};
interface ILocalStorageFilter {
    filterUpdateMode : FilterUpdateModeEnum;
    searchMethod : SearchMethodEnum;
    filterSearchFor : FilterSearchForEnum;
    filterSortBy : FilterShortByEnum
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

export const useFilterContext = () => useContext(FilterContext);

export const FilterContextProvider = ({children} : { children : ReactNode }) => {

    const [filterUpdateMode, setFilterUpdateMode] = useState<FilterUpdateModeEnum>(FilterUpdateModeEnum.ReplaceData);
    const [searchMethod, setSearchMethod] = useState<SearchMethodEnum>(SearchMethodEnum.SimilerResult);

    const [filterSearchFor, setFilterSearchFor] = useState<FilterSearchForEnum>(FilterSearchForEnum.SearchSection);
    const [filterSortBy, setFilterSortBy] = useState<FilterShortByEnum>(FilterShortByEnum.SectionDefault);

    const [localStorageFilterSettings, setFilterSettingsLocalStorage] = useLocalStorage<ILocalStorageFilter>('filterSettings');

    const [searchText, setSearchText] = useState<string>('');

    const { 
        setEnableFilterContextSections,
        setFilteredContextSections,
        contextSections
    } = useSectionContext()!;

    const PerformSearchFilter = useCallback(() => {
        if(searchText == '') return; 
        
        const filteredSecitons = contextSections.filter((section : FilterSectionScheme) => {
            if(searchMethod == SearchMethodEnum.SimilerResult) {
                return section.id.toLowerCase().includes(searchText.toLowerCase());
            }
            return section.id.toLowerCase() === searchText.toLowerCase();
        })
        setFilteredContextSections(filteredSecitons);
        setEnableFilterContextSections(true);
    }, [contextSections, searchText])


    const PerformHighlightSearchFilter = useMemo(() => {
        return (x: string ) => {
            if (searchText === '') return;
    
            const filteredSections = contextSections.map((section) => {
                const isMatched = searchMethod === SearchMethodEnum.SimilerResult ?
                    section.id.toLowerCase().includes(searchText.toLowerCase()) :
                    section.id.toLowerCase() === searchText.toLowerCase();
    
                return {
                    ...section,
                    highlightBody: isMatched
                };
            });
    
            setFilteredContextSections(filteredSections);
            setEnableFilterContextSections(true);
        };
    }, [contextSections, setFilteredContextSections, setEnableFilterContextSections, searchText]);


    const PerformSortBySize = () => {
        const newArray = [];
        const filteredSections = contextSections.slice().sort((a, b) => a.data.length - b.data.length);     
        newArray.push(...filteredSections.map((x) => x.id));
        console.log('filteredSections : ' + newArray);
        //setFilteredContextSections(filteredSections);
        //setEnableFilterContextSections(true);
    }

    useEffect(() => {
        setFilterSettingsLocalStorage({
            filterUpdateMode : filterUpdateMode,
            searchMethod : searchMethod,
            filterSearchFor : filterSearchFor,
            filterSortBy : filterSortBy
        });
    }, [filterUpdateMode, searchMethod, filterSearchFor, filterSortBy])
    
    useEffect(() => {
        setFilterUpdateMode(localStorageFilterSettings?.filterUpdateMode);
        setSearchMethod(localStorageFilterSettings?.searchMethod);
        setFilterSearchFor(localStorageFilterSettings?.filterSearchFor);
        setFilterSortBy(localStorageFilterSettings?.filterSortBy);
    }, [])
    

    const FilterContextValues : IFilterContext = {
        filterUpdateMode, setFilterUpdateMode,
        searchMethod, setSearchMethod,
        filterSearchFor, setFilterSearchFor,
        filterSortBy, setFilterSortBy,

        searchText,
        setSearchText,

        PerformSearchFilter,
        PerformHighlightSearchFilter,
        PerformSortBySize
    }

    return (
        <FilterContext.Provider value={FilterContextValues}>
            {children}
        </FilterContext.Provider>
    )
}