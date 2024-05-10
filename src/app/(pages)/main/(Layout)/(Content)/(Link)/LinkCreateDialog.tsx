'use client'

import { useRef, forwardRef } from 'react';
import GenerateCryptoUUID from '@/globalFunction/GenerateCryptoUUID';

import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Box, VStack } from '@chakra-ui/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkItemScheme } from '@/scheme/LinkSection';

type LinkCreateDialogProps = {
    onLinkCreate? : (props : LinkItemScheme) => void;
    onDialogClose : () => void;
    openDialog : boolean;
}

export const LinkCreateDialog = forwardRef((props : LinkCreateDialogProps, ref) => {
    
    const { onLinkCreate, onDialogClose, openDialog } = props;

    const inputElementTitleRef = useRef<HTMLInputElement>(null);
    const inputElementUrlRef = useRef<HTMLInputElement>(null);

    const handleOnLinkCreate = () => {
        if(inputElementTitleRef.current?.value?.length && inputElementUrlRef.current?.value.length) {
            if(inputElementTitleRef.current.value.length > 2 && inputElementUrlRef.current.value.length > 2) {
                const randomUUID = GenerateCryptoUUID({ mode : 'randomUUID', length : 10 });
                const currentTitle = inputElementTitleRef.current.value;
                const currentUrl = inputElementUrlRef.current.value;
                onLinkCreate?.({
                    id : randomUUID,
                    title : currentTitle,
                    url : currentUrl,
                    created_at : new Date()
                });
            }
        }
    }
    
    return (
        <Dialog open={openDialog} onOpenChange={() => onDialogClose()}>
            <DialogContent className="dark:bg-theme-bgPrimary rounded-2xl">
                <DialogHeader>
                    <DialogTitle className='text-left text-lg max-sm:text-sm'>Create New Link</DialogTitle>
                    <DialogDescription className='text-left max-sm:text-xs'>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <VStack className='w-full mt-5 mb-5'>
                    <Box className='w-full space-y-3'>
                        <Label htmlFor='input-title' className='text-neutral-500 max-sm:text-xs'>Title</Label>
                        <Input
                            id='input-title'
                            ref={inputElementTitleRef}
                            className='dark:bg-theme-bgSecondary !ring-0 focus:!outline-blue-500'
                        />
                    </Box>
                    <Box className='w-full space-y-3'>
                        <Label htmlFor='input-url' className='text-neutral-500 max-sm:text-xs'>Url</Label>
                        <Input
                            id='input-url'
                            ref={inputElementUrlRef}
                            className='dark:bg-theme-bgSecondary !ring-0 focus:!outline-blue-500'
                        />
                    </Box>
                </VStack>
                <DialogFooter className='flex flex-row space-x-3 justify-end items-center'>
                    <Button type="submit" className='!bg-red-500 !text-white hover:!bg-red-600 focus:!outline-blue-500 max-sm:text-xs'
                        onClick={() => onDialogClose()}>
                        Discard Changes
                    </Button>
                    <Button 
                        type="submit" 
                        variant={'secondary'} 
                        className='focus:!outline-blue-500 max-sm:text-xs' 
                        onClick={() => handleOnLinkCreate()}>
                            Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
