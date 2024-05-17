import { Fragment } from "react";
import { Text } from "@chakra-ui/react";

export const FilterStatus = ({ enable, data } : { enable : boolean, data : any[] }) => {
    return (
        <Fragment>
            {
                enable && (
                    data.length > 0 ? (
                        <Text className="text-lime-300 mt-2 text-center uppercase underline underline-offset-8 text-sm">
                            {data.length} found
                        </Text>
                    )
                    : (
                        <Text className="text-neutral-600 mt-2 text-center uppercase underline underline-offset-8 text-sm">
                            no result were found
                        </Text>
                    )
                )
            }
        </Fragment>
    )
}

