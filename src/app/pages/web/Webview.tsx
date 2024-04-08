import Footer from "./Footer";
import HeroSectioon from "./HeroSectioon";
import Navbar from "./Navbar";

export default function Webview() 
{
    return (
        <div className="space-y-5">
            <Navbar />
                <HeroSectioon/>
            <Footer/>
        </div>
    )
}
