import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Box, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export const AdvanceSetting = () => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openResetDialog, setOpenResetDialog] = useState(false);

    return (
        <Card className="!bg-transparent border-none">
            <CardHeader className="space-y-3 p-0 py-5">
                <CardTitle className="dark:text-white max-sm:text-sm">Advance</CardTitle>
                <CardDescription className="dark:text-neutral-400 max-sm:text-xs">
                    you will find all advance options here. Click save when you have done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-0 mt-10 min-h-52">
                <Box className="space-y-5">
                    <Text>App</Text>
                    <Box className="w-full dark:bg-theme-bgPrimary bg-theme-bgSecondary bg-opacity-20 max-sm:bg-opacity-100 py-5 flex justify-center rounded-xl">
                        <Button 
                            variant={'default'} 
                            className="w-11/12 focus-visible:!outline-blue-500 focus-visible:border-none" 
                            onClick={() => setOpenResetDialog(true)}>
                                Reset All Settings
                        </Button>
                        <Dialog open={openResetDialog} onOpenChange={() => setOpenResetDialog(false)}>
                        <DialogContent className="dark:bg-theme-bgSecondary rounded-xl !ring-0 !outline-none dark:border border-black max-sm:border-neutral-700">
                            <DialogHeader>
                                <DialogTitle className="dark:text-yellow-500 text-yellow-400">Warning</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <DialogTitle className="dark:text-white text-black mb-2 max-sm:text-sm">Reset All Settings</DialogTitle>
                                <Text className="max-sm:text-xs">Warning Once You Have Reset Settings You May Get Logged Out</Text>
                            </DialogDescription>
                            <DialogFooter className="flex-col">
                                <Button 
                                    onClick={() => setOpenDeleteDialog(false)} 
                                    variant={'destructive'} 
                                    className="my-2 focus-visible:!outline-blue-500 focus-visible:!border-none">
                                        Confirm
                                </Button>
                                <Button 
                                    onClick={() => setOpenDeleteDialog(false)} 
                                    className="focus-visible:!outline-blue-500 dark:focus-visible:!border-none">
                                        Cancell
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    </Box>
                </Box>
                
                <Box className="space-y-5">
                    <Text>Account Setting</Text>
                    <Box className="w-full dark:bg-theme-bgPrimary bg-theme-bgSecondary bg-opacity-20 max-sm:bg-opacity-100 py-5 flex justify-center rounded-xl">
                        <Button 
                            variant={'destructive'} 
                            className="w-11/12 focus-visible:!outline-blue-500 focus-visible:!border-none" 
                            onClick={() => setOpenDeleteDialog(true)}>
                                Delete Acccount
                        </Button>
                    </Box>
                    <Dialog open={openDeleteDialog} onOpenChange={() => setOpenDeleteDialog(false)}>
                        <DialogContent className="dark:bg-theme-bgSecondary rounded-xl !ring-0 !outline-none  dark:border border-black max-sm:border-neutral-700">
                            <DialogHeader>
                                <DialogTitle className="dark:text-yellow-500 text-yellow-400">Warning</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <DialogTitle className="dark:text-white text-black mb-2 max-sm:text-sm">Delete This Account</DialogTitle>
                                <Text className="max-sm:text-xs">Warning Once You Have Delete The Account You Can Never Restore Your Data Back</Text>
                            </DialogDescription>
                            <DialogFooter className="flex-col">
                                <Button 
                                    onClick={() => setOpenDeleteDialog(false)} 
                                    variant={'destructive'} 
                                    className="my-2 focus-visible:!outline-blue-500 focus-visible:!border-none">
                                        Confirm
                                </Button>
                                <Button 
                                    onClick={() => setOpenDeleteDialog(false)} 
                                    className="focus-visible:!outline-blue-500 focus-visible:!border-none">
                                        Cancell
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Box>
                
            </CardContent>
        </Card>
    )
}
