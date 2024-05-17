import { Box, HStack, Text } from "@chakra-ui/react"


export const HorizontalIndicator = ({ horizontalIndicatorColor, label } : { horizontalIndicatorColor : string, label : string }) => {
    return (
        <HStack gap={0} className="w-full space-x-0">
            <div style={{ background : horizontalIndicatorColor }} className="h-[1px] flex-grow rounded-md transition-all duration-200"></div>
            { label.length > 0 && <Text className="text-sm text-neutral-300 uppercase">{label}</Text> }
            <div style={{ background : horizontalIndicatorColor }} className="h-[1px] flex-grow rounded-md transition-all duration-200"></div>
        </HStack>
    )
}
