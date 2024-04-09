import AppView from './pages/app/AppView';
import Webview from './pages/web/Webview';

export default function page() 
{
    return (
        <div className='bg-black min-h-screen max-h-auto'>
            {/* <Webview /> */}
            <AppView/>
        </div>
    )
}
