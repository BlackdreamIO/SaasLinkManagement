'use client'

import Webview from './Webview';

export default function page() 
{
    return (
        <div onContextMenu={(e) => e.preventDefault()} className='dark:bg-black min-h-screen max-h-auto no-scrollbar overflow-y-auto'>
            <Webview />
        </div>
    )
}
