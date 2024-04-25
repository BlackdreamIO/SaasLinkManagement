import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Box, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function AdvanceSetting() 
{
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    return (
        <Card className="!bg-transparent border-none">
            <CardHeader className="space-y-3 p-0 py-5">
                <CardTitle className="dark:text-white text-black">Advance</CardTitle>
                <CardDescription className="dark:text-neutral-400 text-black">
                    you will find all advance options here. Click save when you have done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-0 mt-10 min-h-52">
                <Box className="space-y-5">
                    <Text>Account Setting</Text>
                    <Box className="w-full dark:bg-theme-bgPrimary bg-opacity-20 py-5 flex justify-center">
                        <Button variant={'destructive'} className="w-11/12" onClick={() => setOpenDeleteDialog(true)}>Delete Acccount</Button>
                    </Box>
                    <Dialog open={openDeleteDialog} onOpenChange={() => setOpenDeleteDialog(false)}>
                        <DialogContent className="dark:bg-theme-bgTartiary rounded-xl">
                            <DialogHeader>
                                <DialogTitle className="dark:text-white text-black">Advance</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <DialogTitle className="dark:text-white text-black mb-2">Delete This Account</DialogTitle>
                                <Text>Warning Once You Have Delete The Account You Can Never Restore Your Data Back</Text>
                            </DialogDescription>
                            <DialogFooter className="flex-col">
                                <Button onClick={() => setOpenDeleteDialog(false)} variant={'destructive'} className="my-2">Confirm</Button>
                                <Button onClick={() => setOpenDeleteDialog(false)}>Cancell</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Box>
            </CardContent>
        </Card>
    )
}
