import { Image, useBreakpointValue, Flex, Box, Divider, Text, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { NavLink } from '../components/NavLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { axiosApi } from '../services/axios';

interface ContinentProps {
  id: number,
  name: string,
  subtitle: string,
  imageUrl: string
}

interface HomeProps {
  continents: ContinentProps[]
}

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Home(props: HomeProps) {

  console.log("props recebidas - item 0: ", props.continents[0]);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true
  })

  let banner: string;
  let imageWidth: string;
  if (isWideVersion) {
    banner = "banner-wide.svg";
    imageWidth = "1080";
  } else {
    banner = "banner-mobile.svg"
    imageWidth = "400";
  };

  const slides = [];
  const continentsInfo = props.continents;

  for (let i = 0; i < 6; i += 1) {
    slides.push(

      <SwiperSlide key={`slide-${i}`} >
        <Image
          w="100%"
          h={["250px", "450px"]}
          fit="cover"
          src={`${continentsInfo[i].imageUrl}${imageWidth}`}
          alt={`Slide ${i}`}
          style={{ filter: "brightness(60%)" }}
        />
        <Box w="100%" position="absolute" top={["80px", "140px", "180px"]} >
          <Link style={{ textDecoration: "none" }} href={`/continents/${continentsInfo[i].id}`}>
            <Text align="center" lineHeight={["36px", "48px", "72px"]} color="white" fontWeight="700" fontSize={["24px", "36px", "48px"]}>
              {continentsInfo[i].name}
            </Text>
            <Text align="center" lineHeight={["21px", "15px", "36px"]} color="white" fontWeight="700" fontSize={["14px", "19px", "24px"]}>
              {continentsInfo[i].subtitle}
            </Text>
          </Link>
        </Box>
      </SwiperSlide >
    );
  };

  return (
    <>
      <Header />

      <Flex w="100vw">
        <Image w="100%" src={banner} alt="5 continentes - infinitas possibilidades" />
      </Flex>

      <Wrap
        mt={["20px", "32px"]}
        w="100%"
        mx="auto"
        px={["10px", "20px"]}
        maxW="1120px"
        justify="center"
        spacing={["20px", "25px", "60px", "100px"]}
      >
        <WrapItem>
          <NavLink image="cocktail.svg" href="/">vida noturna</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink image="surf.svg" href="/">praia</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink image="building.svg" href="/">moderno</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink image="museum.svg" href="/">clássico</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink image="earth.svg" href="/">e mais...</NavLink>
        </WrapItem>

      </Wrap>

      <Flex w="100%" align="center" direction="column">
        <Divider mt={["24px", "24px", "5rem"]} mb={["24px", "24px", "3.25rem"]} w={["3.375rem", "3.375rem", "5.63rem"]} h={["1px", "1px", "2px"]} bg="gray.400" opacity="1" />

        <Text fontWeight="500" fontSize={["20px", "20px", "2.25rem"]} lineHeight={["30px", "30px", "3.375rem"]} align="center" mb={["20px", "20px", "3rem"]}>
          Vamos nessa?<br />
          Então escolha seu continente
      </Text>

        <Flex w="100%" h={["250px", "450px"]} >
          <Swiper
            id="main"
            navigation
            pagination
            autoplay={{ delay: 4000 }}
          >
            {slides}
          </Swiper>
        </Flex>

      </Flex>
      <Flex h="3.25rem"></Flex>
    </>
  );
}

export async function getStaticProps() {

  let continents = await axiosApi.get('/continents')
    .then(
      (response) => { return response.data; }
    ).catch(
      (err) => { console.log("deu erro na busca dos dados no json server: " + err.message) }
    )

  return {
    props: {
      continents,
    },
    revalidate: 60 * 60 * 24 * 7 // 1 semana
  }
}