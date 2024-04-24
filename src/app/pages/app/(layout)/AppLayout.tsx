import { Box, Flex } from "@chakra-ui/react";

import LeftNavigation from "./LeftNavigation/LeftNavigation";
import LinkSide from "./LinkSide/LinkSide";

export default function AppLayout() 
{
    return (
        <Flex dir="row" gap={5}>
            <LeftNavigation />
            <LinkSide />
        </Flex>
    )
}
