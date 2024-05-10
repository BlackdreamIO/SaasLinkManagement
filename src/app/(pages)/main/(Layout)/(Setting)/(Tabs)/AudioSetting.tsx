'use client'

import { useState, useEffect } from "react";
import { AudioContextType, useAudioContext } from "@/context/AudioContextAPI";
import useLocalStorage from "@/hook/useLocalStorage";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Box, VStack } from "@chakra-ui/react";
import { Label } from "@/components/ui/label";


export const AudioSetting = () => {

    const { audioContext, setAudioContext } = useAudioContext();
    const [audioContextLocalStorage, setAudioContextLocalStorage] = useLocalStorage<Partial<AudioContextType>>('audioSettings', {})

    const handleStartUpSound = (value : any) => {
        const enableStartAudio = value == 'enabled' ? true : false;
        setAudioContext((prev) => ({...prev, soundOnStartup: enableStartAudio}));
    }

    const handleSectionCreateSound = (value : any) => {
        const enableStartAudio = value == 'enabled' ? true : false;
        setAudioContext((prev) => ({...prev, soundOnSectionCreate: enableStartAudio}));
    }

    const handleExternalSound = (value : any) => {
        const enableStartAudio = value == 'enabled' ? true : false;
        setAudioContext((prev) => ({...prev, externalNotification: enableStartAudio}));
    }

    const handleInAppSound = (value : any) => {
        const enableStartAudio = value == 'enabled' ? true : false;
        setAudioContext((prev) => ({...prev, inAppNotificatiom: enableStartAudio}));
    }

    useEffect(() => {
        setAudioContextLocalStorage(audioContext);
    }, [audioContext])
    

    return (
        <Card className="!bg-transparent border-none">
            <CardHeader className="space-y-3 p-0 py-5">
                <CardTitle className="dark:text-white text-black">Audio Setting</CardTitle>
                <CardDescription className="dark:text-neutral-400 text-black">
                    you will find all advance options here. Click save when you have done.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <VStack className="space-y-5 p-0 mt-10 min-h-52">
                    <Box className="flex flex-row space-x-3 items-center w-full justify-between px-2">
                        <Label>ON APPLICATION STARTUP SOUND</Label>
                        <Select onValueChange={handleStartUpSound} defaultValue={audioContextLocalStorage.soundOnStartup ? "enabled" : "disabled"}>
                            <SelectTrigger className="w-[250px] dark:bg-theme-bgPrimary !border-none focus-visible:!outline-blue-500 focus-visible:!border-transparent">
                                <SelectValue placeholder="Select Option" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 bg-opacity-25 backdrop-blur-md">
                                <SelectGroup>
                                <SelectLabel>Audio</SelectLabel>
                                <SelectItem value="enabled">Enabled</SelectItem>
                                <SelectItem value="disabled">Disabled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Box>

                    <Box className="flex flex-row space-x-3 items-center w-full justify-between px-2">
                        <Label>ON NEW SECTION CREATE</Label>
                        <Select onValueChange={handleSectionCreateSound} defaultValue={audioContextLocalStorage.soundOnSectionCreate ? "enabled" : "disabled"}>
                            <SelectTrigger className="w-[250px] dark:bg-theme-bgPrimary border-none focus-visible:!outline-blue-500 focus-visible:!border-transparent">
                                <SelectValue placeholder="Select Option" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 bg-opacity-25 backdrop-blur-md">
                                <SelectGroup>
                                    <SelectLabel>Audio</SelectLabel>
                                    <SelectItem value="enabled">Enabled</SelectItem>
                                    <SelectItem value="disabled">Disabled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Box>

                    <Box className="flex flex-row space-x-3 items-center w-full justify-between px-2">
                        <Label>ON EXTERNAL NOTIFICATON</Label>
                        <Select disabled onValueChange={handleExternalSound} defaultValue={audioContextLocalStorage.externalNotification ? "enabled" : "disabled"}>
                            <SelectTrigger className="w-[250px] dark:bg-theme-bgPrimary border-none focus-visible:!outline-blue-500 focus-visible:!border-transparent">
                                <SelectValue placeholder="Only Client Supports" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 bg-opacity-25 backdrop-blur-md">
                                <SelectGroup>
                                    <SelectLabel>Audio</SelectLabel>
                                    <SelectItem value="enabled">Enabled</SelectItem>
                                    <SelectItem value="disabled">Disabled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Box>
                    
                    <Box className="flex flex-row space-x-3 items-center w-full justify-between px-2">
                        <Label>IN APP NOTIFICATON</Label>
                        <Select  onValueChange={handleInAppSound} defaultValue={audioContextLocalStorage.inAppNotificatiom ? "enabled" : "disabled"}>
                            <SelectTrigger className="w-[250px] dark:bg-theme-bgPrimary border-none focus-visible:!outline-blue-500 focus-visible:!border-transparent">
                                <SelectValue placeholder="Enabled" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 bg-opacity-25 backdrop-blur-md">
                                <SelectGroup>
                                    <SelectLabel>Audio</SelectLabel>
                                    <SelectItem value="enabled">Enabled</SelectItem>
                                    <SelectItem value="disabled">Disabled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Box>

                </VStack>
            </CardContent>
        </Card>
    )
}
