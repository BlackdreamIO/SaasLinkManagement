import { LinkItemScheme } from "@/scheme/LinkSection";
import Error from "./error";

import { Flex, Text } from "@chakra-ui/react";
import { LinkItem } from "../(Link)/LinkItem";
import { SectionScheme } from "@/scheme/SectionScheme";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export const SectionLinks = ({ Links, parentSection } : { Links : LinkItemScheme[], parentSection : SectionScheme }) => {
    
    return (
        <Flex direction={'column'} className="w-full space-y-5 p-3 dark:bg-theme-bgSecondary bg-neutral-200 pt-10 pb-5 rounded-xl">
            <ErrorBoundary errorComponent={Error}>
                {
                    Object.values(Links).map((link, index) => (
                        <LinkItem
                            id={link.id}
                            title={link.title}
                            url={link.url}
                            created_at={new Date()}
                            section={parentSection}
                            handleTitleEdit={() => {}}
                            handleUrlEdit={() => {}}
                            handleDelete={() => {}}
                            key={link.id}
                        />
                    ))
                }
                {
                    Object.values(Links).length < 1 && (
                        <>
                            <Text className="text-center dark:text-neutral-400">Empty Section</Text>
                        </>
                    )
                }
            </ErrorBoundary>
        </Flex>
    )
}
