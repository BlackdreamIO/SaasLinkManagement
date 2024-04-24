'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { RxStretchHorizontally } from "react-icons/rx";

export default function AppNavbarFilter() 
{
    const [toggleFilter, setToggleFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('date');


    const RenderComponentBasedOnFilter = () => {
        if(!toggleFilter) return <>  </>;
        switch (selectedFilter) 
        {
            case 'date':
                return <div>date section</div>
            
            case 'category' :
                return categoryFilterSection();
            
            case 'title' :
                return titleFilterSection();

            default:
                break;
        }
    }

    const categoryFilterSection = () => {
        return (
            <HStack className='w-full space-x-3 flex-wrap'>
                <Text className='text-slate-500 text-sm dark:hover:text-white hover:text-black rounded-2xl px-5 py-1 bg-neutral-950 cursor-pointer'>Link</Text>
                <Text className='text-slate-500 text-sm dark:hover:text-white hover:text-black rounded-2xl px-5 py-1 bg-neutral-950 cursor-pointer'>Video Link</Text>
                <Text className='text-slate-500 text-sm dark:hover:text-white hover:text-black rounded-2xl px-5 py-1 bg-neutral-950 cursor-pointer'>Song Link</Text>
                <Text className='text-slate-500 text-sm dark:hover:text-white hover:text-black rounded-2xl px-5 py-1 bg-neutral-950 cursor-pointer'>Office</Text>
                <Text className='text-slate-500 text-sm dark:hover:text-white hover:text-black rounded-2xl px-5 py-1 bg-neutral-950 cursor-pointer'>Crack Gta v link</Text>
                <Text className='text-slate-500 text-sm dark:hover:text-white hover:text-black rounded-2xl px-5 py-1 bg-neutral-950 cursor-pointer'>Devin of the day</Text>
            </HStack>
        )
    }

    const titleFilterSection = () => {
        return (
            <HStack className='space-x-3'>
                <Input className='dark:bg-neutral-900 w-5/12 !p-5' placeholder='search seciton or item'/>
            </HStack>
        )
    }

    return (
        <Box className={`w-full dark:bg-black p-4 rounded-lg border ${toggleFilter ? 'border-sky-400' : 'border-neutral-700'} transition-all duration-150 space-y-5`}>
           
            <Flex justify={'space-between'} className='w-full items-center px-4'>
                <HStack className='space-x-5'>
                    <Text
                        onClick={() => setToggleFilter(!toggleFilter)} 
                        className={`${toggleFilter ? 'text-black dark:text-white' : 'text-neutral-500'}
                                dark:hover:text-white hover:text-black cursor-pointer`}>
                            Filter
                    </Text>
                    <Box className={`${toggleFilter ? 'flex' : 'hidden'} flex-row space-x-5 bg-neutral-900 py-2 px-5 rounded-3xl`}>
                        <Text onClick={() => setSelectedFilter('date')} className='text-neutral-500 dark:hover:text-white hover:text-black cursor-pointer'>Date</Text>
                        <Text onClick={() => setSelectedFilter('category')} className='text-neutral-500 dark:hover:text-white hover:text-black cursor-pointer'>Category</Text>
                        <Text onClick={() => setSelectedFilter('title')} className='text-neutral-500 dark:hover:text-white hover:text-black cursor-pointer'>Title</Text>
                    </Box>
                </HStack>

                <HStack justify={'end'} className='w-6/12'>
                    <Input className='w-6/12 !p-5' placeholder='search seciton or item'/>
                    <Button>Search</Button>
                </HStack>
            </Flex>

            { RenderComponentBasedOnFilter() }

        </Box>
    )
}
