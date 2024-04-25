import PersonalSection from "./(Personal)/PersonalSection";
import SectionContainer from "./SectionContainer";

export default function LeftNavigations() 
{
    return (
        <div className="w-[25%] dark:bg-theme-bgPrimary h-screen">
            <PersonalSection />
            <SectionContainer />
        </div>
    )
}
