import { useBreakpointValue, Flex, Image, Text, FlexProps } from '@chakra-ui/react';
import { unsplashApi, PhotoProps } from '../services/upsplash';

interface CityProps {
    id: number;
    name: string;
    country: string;
    photoId: string;
    countryAbbrev: string;
    photoUrl: string;
}

interface CityBoxProps extends FlexProps {
    param: CityProps;
}

export function CityBox(props: CityBoxProps) {

    const urlFlag = `https://purecatamphetamine.github.io/country-flag-icons/1x1/${props.param.countryAbbrev}.svg`;

    return (
        <Flex key={props.param.id}
            direction="column"
        >     {/* cxa da miniatura + cxa de baixo */}
            <Image
                borderRadius="4px 4px 0 0"
                h="173px"
                w="256px"
                fit="cover"
                src={props.param.photoUrl}
                alt={props.param.name}
            />
            <Flex
                align="center"
                justify="space-between"
                direction="row"
                borderWidth="0 1px 1px"
                borderColor="yellow.400"
                borderRadius="0 0 4px 4px"
                fontFamily="Barlow, sans-serif"
                bg="white"
                px="24px"
                pt="18px"
                pb="25px"
            >      {/* cxa dos textos + bandeira */}
                <Flex direction="column">   {/* cxa dos 2 textos */}
                    <Text fontSize="20px" lineHeight="25px" fontWeight="600" mb="12px">{props.param.name}</Text>
                    <Text fontSize="16px" lineHeight="25px" fontWeight="500" color="gray.300">{props.param.country}</Text>
                </Flex>
                <Flex>
                    <Image
                        borderRadius="full"
                        boxSize="30px"
                        src={urlFlag}
                        fit="fill"
                        alt={props.param.country}
                        align-self="center"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}