'use client';

import { useState, useEffect, Fragment } from "react";
import ScreenFull from 'screenfull';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";

import { AccountSetting } from "./(Tabs)/AccountSetting";
import { CustomizationSetting } from "./(Tabs)/CustomizationSetting";
import { AudioSetting } from "./(Tabs)/AudioSetting";
import { AdvanceSetting } from "./(Tabs)/AdvanceSetting";
import useFullscreenToggle from "@/hook/useFulscreenToggle";


type SettingProps = {
    openSetting : boolean,
    onOpenChange : (oepn : boolean) => void;
}

export default function Setting(props : SettingProps) 
{
    const { openSetting, onOpenChange } = props;
    
    const [userName, setUsername] = useState('khundugi');
    const [email, setEmail] = useState('usertest24@gmail.com');
    const [password, setPassword] = useState('password contianer');

    const handleOnAccountUpdate = (newData : any) => {
         
    }

    const TabsTriggerStyle = `dark:bg-transparent max-sm:dark:bg-neutral-200 outline-none dark:text-neutral-500 dark:hover:text-white focus-visible:outline-blue-500`;
    const TabsContentStyle = `w-full p-0 h-[500px] max-sm:h-[300px] overflow-x-hidden overflow-y-scroll dark:scrollbar-dark scrollbar-light !ring-0 !ring-transparent !outline-none`;

    return (
        <Dialog open={openSetting} onOpenChange={onOpenChange}>
            <DialogContent className="w-11/12 dark:bg-theme-bgSecondary rounded-xl transition-all duration-200 !outline-none">
                <DialogHeader>
                    <DialogTitle className="dark:text-white text-black">Setting</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="account" className="w-full mt-5 p-0">
                    <TabsList className="w-full flex flex-row justify-around max-md:justify-center max-sm:flex-wrap h-auto rounded-2xl dark:bg-theme-bgTartiary bg-theme-bgPrimaryLight">
                        <TabsTrigger className={TabsTriggerStyle} value="account">Account</TabsTrigger>
                        <TabsTrigger className={TabsTriggerStyle} value="customization">Customization</TabsTrigger>
                        <TabsTrigger className={TabsTriggerStyle} value="audio">Audio</TabsTrigger>
                        <TabsTrigger className={TabsTriggerStyle} value="advance">Advance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className={TabsContentStyle}>
                        <AccountSetting 
                            defaultUsername={userName}
                            defaultEmail={email}
                            defaultPassword={password}
                            onSaveChanges={handleOnAccountUpdate}
                        />
                    </TabsContent>
                    <TabsContent value="customization" className={TabsContentStyle}>
                        <CustomizationSetting />
                    </TabsContent>
                    <TabsContent value="audio" className={TabsContentStyle}>
                        <AudioSetting />
                    </TabsContent>
                    <TabsContent value="advance" className={TabsContentStyle}>
                        <AdvanceSetting />
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog>
    )
}
