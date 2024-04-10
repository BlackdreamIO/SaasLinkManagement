import AppView from './pages/app/AppView';
import Webview from './pages/web/Webview';

export default function page() 
{
    return (
        <div className='bg-black min-h-screen max-h-auto no-scrollbar overflow-y-auto'>
            {/* <Webview /> */}
            <AppView/>
        </div>
    )
}
