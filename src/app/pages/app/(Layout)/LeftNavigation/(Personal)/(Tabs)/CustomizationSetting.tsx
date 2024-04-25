import { useState, useEffect } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Box, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import Image from "next/image";

import AppDarkThemeImage from '../../../../../../../../public/images/appDarkTheme.png';
import AppLightThemeImage from '../../../../../../../../public/images/appLightTheme.png';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useTheme from "@/hook/useTheme";
import useLocalStorage from "@/hook/useLocalStorage";

export const CustomizationSetting = () => {
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [theme, setTheme] = useTheme({ theme : 'system' });
    const [localStorageTheme ] = useLocalStorage('theme');

    useEffect(() => {
        setCurrentTheme(theme);
    }, [currentTheme, theme, localStorageTheme])

    return (
        <Card className="!bg-transparent border-none">
            <CardHeader className="space-y-3 mt-5 p-0">
                <CardTitle className="max-sm:text-sm dark:text-white text-black">Customization</CardTitle>
                <CardDescription  className="max-sm:text-xs dark:text-neutral-500 text-black">
                    Customization The Look And Make It Gorgius
                </CardDescription>
                <CardTitle className="text-lg max-sm:text-sm dark:text-white text-black">Theme</CardTitle>
                <CardDescription className="text-neutral-500 max-sm:text-xs">
                    DARK : The dark mode is ideal for reducing eye strain in low-light conditions and conserving battery power.
                </CardDescription>
                <CardDescription className="text-neutral-500 max-sm:text-xs">
                    LIGHT : The light mode can improve reading comprehension, speed and might even foster creativity.
                </CardDescription>
                <CardContent className="w-full space-y-4 p-0">
                    <Flex justifyContent={'center'} alignItems={'center'} className="flex-row max-md:flex-col space-x-3 max-md:space-x-0 max-md:space-y-3">
                        <Card className="w-6/12 max-md:w-full shadow-black shadow-lg border border-transparent hover:border-emerald-500 p-2 space-y-3
                        max-sm:text-xs dark:bg-neutral-950 bg-theme-bgSecondaryLight"
                        onClick={() => setTheme('dark')}>
                            <CardTitle className={`${currentTheme == 'dark' ? 'dark:text-sky-500 text-sky-500' : 'dark:text-white text-black*'}`}>
                                DARK THEME
                                {
                                    currentTheme == 'dark' ? ' (current)' : ''
                                }
                            </CardTitle>
                            <AspectRatio ratio={16/10}>
                                <Image
                                    src={AppDarkThemeImage.src}
                                    alt="image dark mode was not found"
                                    className="w-full rounded-xl"
                                    width={100}
                                    height={100}
                                    quality={100}
                                    unoptimized
                                />
                            </AspectRatio>
                        </Card>
                        <Card className="w-6/12 max-md:w-full shadow-black shadow-lg border border-transparent hover:border-emerald-500 p-2 space-y-3
                        max-sm:text-xs dark:bg-neutral-950 bg-theme-bgSecondaryLight"
                        onClick={() => setTheme('light')}>
                            <CardTitle className={`${currentTheme == 'light' ? 'dark:text-sky-500 text-sky-500' : 'dark:text-white text-black'}`}>
                                LIGHT THEME
                                {
                                    currentTheme != 'dark' ? ' (current)' : ''
                                }
                            </CardTitle>
                            <AspectRatio ratio={16/10}>
                                <Image
                                    src={AppLightThemeImage.src}
                                    alt="image dark mode was not found"
                                    className="w-full rounded-xl"
                                    width={100}
                                    height={100}
                                    quality={100}
                                    unoptimized
                                />
                            </AspectRatio>
                        </Card>
                    </Flex>
                </CardContent>
                <CardDescription className="max-sm:text-xs">
                    Theme are not synced with our server so each time your clear your browser cache theme will be reset
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
