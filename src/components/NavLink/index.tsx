import { Text, Link as ChakraLink, LinkProps, Flex, Image } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
    image: string;
    children: ReactNode;
    href: string;
}

export function NavLink({ image = null, children, href, ...rest }: NavLinkProps) {

    return (
        <ChakraLink {...rest} >
            <Flex direction="column" justify="space-between" w="9.87rem" h="9.01rem" align="center" >
                <Image boxSize="5.3rem" src={image}></Image>
                <Text fontFamily="Poppins, sans-serif" layerStyle="menu">{children}</Text>
            </Flex>
        </ChakraLink>

    );
}