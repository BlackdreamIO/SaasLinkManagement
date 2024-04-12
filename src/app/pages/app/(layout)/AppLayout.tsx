'use client'

import { useState } from 'react';
import { Reorder } from "framer-motion";

import Section from './(Section)/Section';
import AppNavbarFilter from './(TopArea)/AppNavbarFilter';
import { SectionProps } from '@/types/types';

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function AppLayout() {
    
    const [items, setItems] = useState(initialItems);

    return (
        <div className='w-full space-y-5'>
            <AppNavbarFilter />
            <Reorder.Group axis="y" onReorder={setItems} values={items} className='m-auto min-h-screen max-h-auto flex flex-col items-center justify-start space-y-5'>
                {
                    items.map((item) => (
                        <Section sectionItems={[]} sectionTitle={item} key={item} />
                    ))
                }
            </Reorder.Group>
        </div>
    )
}
