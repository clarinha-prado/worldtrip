import { CityBox } from '../components/CityBox';
import { useBreakpointValue, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';

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
        <Wrap
            spacing="45px"
            justify={["center", "center", "center", "flex-start"]}
        >
            {props.param.map(city => {
                return (
                    <WrapItem key={city.id}>
                        <CityBox param={city} />
                    </WrapItem>
                );
            })}
        </Wrap>
    );
}