'use client';

import { Box, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import { useState, useEffect, Fragment } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AccountSetting } from "./(Tabs)/AccountSetting";
import { CustomizationSetting } from "./(Tabs)/CustomizationSetting";
import AdvanceSetting from "./(Tabs)/AdvanceSetting";


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

    return (
        <Dialog open={openSetting} onOpenChange={onOpenChange}>
            <DialogContent className="w-11/12 dark:bg-theme-bgTartiary bg-theme-bgTartiaryLight rounded-xl transition-all duration-200">

                <DialogHeader>
                    <DialogTitle className="dark:text-white text-black">Setting</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="account" className="w-full mt-5 p-0">
                    <TabsList className="w-full flex flex-row justify-around max-md:justify-center max-sm:flex-wrap h-auto rounded-2xl dark:bg-theme-bgPrimary bg-theme-bgPrimaryLight">
                        <TabsTrigger className="!bg-transparent outline-none dark:text-neutral-500 dark:hover:text-white text-neutral-500 hover:text-black" value="account">Account</TabsTrigger>
                        <TabsTrigger className="!bg-transparent outline-none dark:text-neutral-500 dark:hover:text-white text-neutral-500 hover:text-black" value="customization">Customization</TabsTrigger>
                        <TabsTrigger className="!bg-transparent outline-none dark:text-neutral-500 dark:hover:text-white text-neutral-500 hover:text-black" value="audio">Audio</TabsTrigger>
                        <TabsTrigger className="!bg-transparent outline-none dark:text-neutral-500 dark:hover:text-white text-neutral-500 hover:text-black" value="advance">Advance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="w-full p-0 h-[500px] max-sm:h-[300px] overflow-x-hidden overflow-y-scroll dark:scrollbar-dark scrollbar-light">
                        <AccountSetting 
                            defaultUsername={userName}
                            defaultEmail={email}
                            defaultPassword={password}
                            onSaveChanges={handleOnAccountUpdate}
                        />
                    </TabsContent>
                    <TabsContent value="customization" className="w-full p-0 h-[500px] max-sm:h-[300px] overflow-x-hidden overflow-y-scroll dark:scrollbar-dark scrollbar-light !outline-none">
                        <CustomizationSetting />
                    </TabsContent>
                    <TabsContent value="audio" className="w-full !bg-transparent p-0 h-[500px] max-sm:h-[300px] overflow-x-hidden overflow-y-scroll dark:scrollbar-dark scrollbar-light">
                        <CustomizationSetting />
                    </TabsContent>
                    <TabsContent value="advance" className="w-full !bg-transparent p-0 h-[500px] max-sm:h-[300px] overflow-x-hidden overflow-y-scroll dark:scrollbar-dark scrollbar-light">
                        <AdvanceSetting />
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog>
    )
}
