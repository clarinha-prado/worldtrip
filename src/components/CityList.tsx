import { CityBox } from '../components/CityBox';
import { useBreakpointValue, Flex, Text, SimpleGrid } from '@chakra-ui/react';

interface CityProps {
    id: number;
    name: string;
    country: string;
    photoId: string;
    countryAbbrev: string;
    photoUrl: string;
}
interface CityListProps {
    param: CityProps[];
}

export function CityList(props: CityListProps) {

    return (
        <SimpleGrid columns={4} spacing="45px">

            {props.param.map(city => {
                return (
                    <CityBox key={city.id} param={city} />
                );
            })}

        </SimpleGrid>
    );
}