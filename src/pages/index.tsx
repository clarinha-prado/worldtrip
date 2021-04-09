import { useBreakpointValue, Flex, Box, Divider, Text, Link } from '@chakra-ui/react';
import { Header } from '../components/Header';
import styles from '../styles/home.module.scss';
import { NavLink } from '../components/NavLink';
import { unsplashApi, PhotoProps } from '../services/upsplash';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

interface HomeProps {
  photo: PhotoProps;
}

SwiperCore.use([Navigation, Pagination]);

export default function Home(props: HomeProps) {

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true
  })

  let banner: string;
  if (isWideVersion) {
    banner = "banner-wide.svg"
  } else {
    banner = "banner-mobile.svg"
  };

  const slides = [];
  const continentsInfo = [

    {
      title: "América do Norte",
      subtitle: "A modernidade das metópoles",
      imageUrl: "https://images.unsplash.com/photo-1570897620600-f5f649e4968c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTMxNzk&ixlib=rb-1.2.1&q=80&w=1080"
    },

    {
      title: "América do Sul",
      subtitle: "A violência da colonização",
      imageUrl: "https://images.unsplash.com/photo-1589228710553-095226fc298b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTMzNDU&ixlib=rb-1.2.1&q=80&w=1080"
    },

    {
      title: "Ásia",
      subtitle: "Cultura milenar",
      imageUrl: "https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTM2Mjc&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      title: "África",
      subtitle: "Natureza intocada",
      imageUrl: "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTM3NjU&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      title: "Europa",
      subtitle: "O continente mais antigo",
      imageUrl: "https://images.unsplash.com/photo-1520114878144-6123749968dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTI3OTc&ixlib=rb-1.2.1&q=80&w=1080"
    },
    {
      title: "Oceania",
      subtitle: "A maravilha das ilhas",
      imageUrl: "https://images.unsplash.com/photo-1572295215355-60431b92883f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTM4Njk&ixlib=rb-1.2.1&q=80&w=1080"
    },
  ]
  for (let i = 0; i < 6; i += 1) {
    slides.push(

      <SwiperSlide key={`slide-${i}`} >
        <img
          src={continentsInfo[i].imageUrl}
          alt={`Slide ${i}`}
          style={{ filter: "brightness(60%)" }}
        />
        <Box w="100%" position="absolute" top={["80px", "140px", "180px"]} >
          <Link style={{ textDecoration: "none" }} href="/europe">
            <Text align="center" lineHeight={["36px", "48px", "72px"]} color="white" fontWeight="700" fontSize={["24px", "36px", "48px"]}>
              {continentsInfo[i].title}
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

      <div className={styles.banner}>
        <img src={banner} alt="5 continentes - infinitas possibilidades" />
      </div>

      <Flex
        wrap={(isWideVersion ? ("nowrap") : ("wrap"))}
        direction="row"
        w="100%"
        maxW="1080px"
        mt={["1.3rem", "2.3rem", "4rem"]}
        mx="auto"
        px={["10px", "10px", "5px"]}
        justify="center"
      >

        <NavLink mr={["0%", "3%", "0%", "3%"]} image="cocktail.svg" href="/">vida noturna</NavLink>
        <NavLink mr={["0%", "3%", "0%", "3%"]} image="surf.svg" href="/">praia</NavLink>
        <NavLink mr={["0%", "3%", "0%", "3%"]} image="building.svg" href="/">moderno</NavLink>
        <NavLink mr={["0%", "3%", "0%", "3%"]} image="museum.svg" href="/">clássico</NavLink>
        <NavLink image="earth.svg" href="/">e mais...</NavLink>

      </Flex>

      <Flex w="100%" align="center" direction="column">
        <Divider mt={["24px", "24px", "5rem"]} mb={["24px", "24px", "3.25rem"]} w={["3.375rem", "3.375rem", "5.63rem"]} h={["1px", "1px", "2px"]} bg="gray.400" opacity="1" />

        <Text fontWeight="500" fontSize={["20px", "20px", "2.25rem"]} lineHeight={["30px", "30px", "3.375rem"]} align="center" mb={["20px", "20px", "3rem"]}>
          Vamos nessa?<br />
          Então escolha seu continente
      </Text>

        <Swiper

          id="main"
          navigation
          pagination
        >
          {slides}
        </Swiper>

      </Flex>
      <Flex h="3.25rem"></Flex>
    </>
  );
}

export async function getStaticProps() {

  let response;

  try {
    response = await unsplashApi.photos
      .get({ photoId: "cOT7bImb07A" });
  } catch {
    console.log("something went wrong!");
  }

  console.log(response.response.urls.regular);

  return {
    props: {
      photo: response.response,
    },

    revalidate: 60 * 60 * 24 * 7 // 1 semana
  }
}