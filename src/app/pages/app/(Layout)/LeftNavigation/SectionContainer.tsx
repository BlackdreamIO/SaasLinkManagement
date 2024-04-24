import { Text, Flex } from "@chakra-ui/react";
import Section from "./(SectionsComponent)/Section";

export default function SectionContainer() 
{
    return (
        <Flex direction={'column'} className="space-y-3">
            <Text className="text-xl ml-5 text-gray-500">Sections</Text>
            <Section />
            <Section />
            <Section />
        </Flex>
    )
}
