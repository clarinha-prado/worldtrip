import { Center, Image } from '@chakra-ui/react';

export function Header() {

    return (
        <Center bg="#F5F8FA" w="100vw" h={["11vw", "11vw", "4.7vw"]} mx="0" py={["6px", "8px", "0.3vw"]} p="0">
            < Image w={["27vw", "27vw", "12.5vw"]} src="/logo.svg" alt="worldtrip" />
        </Center >
    );
}