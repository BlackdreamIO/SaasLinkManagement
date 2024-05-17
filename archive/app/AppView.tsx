import AppLayout from "./(layout)/AppLayout";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";

export default function AppView() 
{
    return (
        <div className="w-full max-w-3xl m-auto select-none">
            <AppNavbar />
            <AppLayout/>
            {/* <AppFooter/> */}
        </div>
    )
}
