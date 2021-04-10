import { Text, Link as ChakraLink, LinkProps, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
    image: string;
    children: ReactNode;
    href: string;
}

export function NavLink({ image = null, children, href, ...rest }: NavLinkProps) {

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true
    });

    if (isWideVersion) {
        return (
            <ChakraLink {...rest} >
                <Flex direction="column" justify="space-between" h="8.01rem" align="center" >
                    <Image boxSize={["0.5rem", "1rem", "4.3rem"]} src={image}>

                    </Image>
                    <Text align="center" fontFamily="Poppins, sans-serif" layerStyle="menu">{children}</Text>
                </Flex>
            </ChakraLink>

        );
    } else {
        return (
            <ChakraLink {...rest} >
                <Flex align="center" justify="center" >
                    <Image mr="0.5rem" boxSize={["0.5rem", "0.5rem", "5.3rem"]} src="bullet.svg">
                    </Image>
                    <Text fontFamily="Poppins, sans-serif" layerStyle="menuMobile">{children}</Text>
                </Flex>
            </ChakraLink>
        )
    }
}