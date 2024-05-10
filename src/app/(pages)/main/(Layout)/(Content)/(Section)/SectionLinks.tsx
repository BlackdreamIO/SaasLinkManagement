import { LinkItemScheme } from "@/scheme/LinkSection";

import { Flex, Text } from "@chakra-ui/react";
import { LinkItem } from "../(Link)/LinkItem";


export const SectionLinks = ({ Links } : { Links : LinkItemScheme[] }) => {
    return (
        <Flex direction={'column'} className="w-full space-y-5 p-3 dark:bg-theme-bgSecondary bg-neutral-200 pt-10 pb-5 rounded-xl">
            {
                Links.map(({ id, url, title, created_at }, index) => (
                    <LinkItem
                        id={id}
                        title={title}
                        url={url}
                        created_at={new Date()}
                        handleTitleEdit={() => {}}
                        handleUrlEdit={() => {}}
                        handleDelete={() => {}}
                    />
                ))
            }
            {
                Links.length < 1 && (
                    <>
                        <Text className="text-center dark:text-neutral-400">Empty Section</Text>
                    </>
                )
            }
        </Flex>
    )
}
