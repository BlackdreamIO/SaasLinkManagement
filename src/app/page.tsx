import AppView from './pages/app/AppView';
import Webview from './pages/web/Webview';
import { Toaster } from "@/components/ui/toaster"

export default function page() 
{
    return (
        <div className='dark:bg-[rgb(5,5,5)] min-h-screen max-h-auto no-scrollbar overflow-y-auto'>
            {/* <Webview /> */}
            <AppView/>
            <Toaster />
        </div>
    )
}
