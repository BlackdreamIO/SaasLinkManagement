import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Box, Text, Divider, Flex, HStack, VStack } from "@chakra-ui/react";

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { IoAddCircleOutline } from "react-icons/io5";

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { LinkItemScheme } from "@/scheme/LinkSection";

export default function LinkCreator({ onLinkCreate } : { onLinkCreate : ( linkData : LinkItemScheme ) => void }) 
{
    const [date, setDate] = useState<Date>();
    
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const handleCreateLink = () => {
        const newInstanceDate : Date | any = date;

        const createData : any = {
            title : currentTitle,
            link : currentUrl,
            created_at : newInstanceDate
        }

        onLinkCreate?.(createData);
        setCurrentTitle('');
        setCurrentUrl('');
        setDate(new Date);
        setOpenCreateDialog(false)
    }

    const handleCloseDialog = () => {
        setOpenCreateDialog(false);
    }

    return (
        <Dialog open={openCreateDialog} onOpenChange={() => setOpenCreateDialog(!openCreateDialog)}>
            <DialogTrigger className="w-full flex flex-row items-center justify-center pb-5" asChild>
                <Button className="w-1/12 m-auto !bg-transparent text-neutral-500 hover:text-white" variant="ghost">
                    <IoAddCircleOutline size={'2rem'}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <Box className="dark:bg-neutral-900 bg-neutral-100 shadow-md p-3 w-full rounded-lg border border-transparent hover:border-neutral-700 space-y-6">
                    <Text>Create New Link</Text>
                    <VStack className="space-y-2">
                        <Input onChange={(e) => setCurrentTitle(e.target.value)} className="dark:bg-neutral-950 py-5" placeholder="Enter Title" />
                        <Input onChange={(e) => setCurrentUrl(e.target.value)} className="dark:bg-neutral-950 py-5" placeholder="Enter Url" />
                    </VStack>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground" )}>
                            
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </Box>
                <DialogFooter className="flex flex-col space-y-5">
                    <Button type="submit" variant={'ghost'} className="bg-black font-bold h-10" onClick={handleCreateLink}> Create Link </Button>
                    <Button type="submit" variant={'ghost'} className="bg-black font-bold h-10" onClick={handleCloseDialog}> Discard </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
