import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Box, VStack, Text, HStack, Flex } from "@chakra-ui/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AccountSettingType = {
    defaultUsername : string,
    defaultEmail : string,
    defaultPassword : string,
    onSaveChanges : (userName : string, email : string, password : string) => void;
}

export const AccountSetting = (props : AccountSettingType) => {
    const { defaultUsername, defaultEmail, defaultPassword, onSaveChanges } = props;
    
    const [userName, setUsername] = useState('khundugi');
    const [email, setEmail] = useState('usertest24@gmail.com');
    const [password, setPassword] = useState('password contianer');

    const handleOnSaveChanges = () => {
        if(userName.length > 3 && email.length > 3 && password.length > 3) {
            onSaveChanges(userName, email, password);
        }
    }

    const inputStyle = `dark:bg-theme-bgSecondary py-6 rounded-lg max-sm:py-3 dark:placeholder:text-neutral-500 placeholder:text-neutral-500 focus-visible:outline-blue-500`;

    return (
        <Card className="!bg-transparent p-0 w-full !outline-none !border-none">
            <CardHeader className="space-y-3 p-0 py-5 !outline-none !border-none">
                <CardTitle className="dark:text-white">Account</CardTitle>
                <CardDescription className="dark:text-neutral-400 ">
                    Make changes to your account here. Click save when you have done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-0 py-5 !outline-none !border-none ">
                <Box className="space-y-1">
                    <Text className="dark:text-neutral-500 max-sm:text-xs">Username</Text>
                    <Input 
                        defaultValue={defaultUsername} 
                        className={inputStyle} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
                <Box className="space-y-1">
                    <Text className="dark:text-neutral-500 max-sm:text-xs">Email</Text>
                    <Input 
                        defaultValue={defaultEmail} 
                        className={inputStyle}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box className="space-y-1">
                    <Text className="dark:text-neutral-500 max-sm:text-xs">Password</Text>
                    <Input 
                        defaultValue={defaultPassword}
                        className={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

            </CardContent>
            <CardFooter>
                <Button onClick={handleOnSaveChanges} className="focus-visible:!outline-blue-500 focus-visible:!border-transparent">Save changes</Button>
            </CardFooter>
        </Card>
    )
}
