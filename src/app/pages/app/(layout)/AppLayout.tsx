'use client'

import { useState } from 'react';
import { Reorder } from "framer-motion";

import Section from './(Section)/Section';
import AppNavbarFilter from './(TopArea)/AppNavbarFilter';

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function AppLayout() {
    const [items, setItems] = useState(initialItems);

    return (
        <div className='space-y-5'>
            <AppNavbarFilter />
            <Reorder.Group axis="y" onReorder={setItems} values={items} className='space-y-5'>
                {
                    items.map((item) => (
                        <Section sectionTitle={item} key={item} />
                    ))
                }
            </Reorder.Group>
        </div>
    )
}
