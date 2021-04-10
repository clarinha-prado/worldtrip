import { Image, useBreakpointValue, Flex, Box, Divider, Text, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { Header } from '../components/Header';
import styles from '../styles/home.module.scss';
import { NavLink } from '../components/NavLink';
import { unsplashApi, PhotoProps } from '../services/upsplash';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

interface HomeProps {
  photo: PhotoProps;
}

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Home(props: HomeProps) {

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
  const continentsInfo = [

    {
      title: "América do Norte",
      subtitle: "A modernidade das metrópoles",
      imageUrl: "https://images.unsplash.com/photo-1570897620600-f5f649e4968c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTMxNzk&ixlib=rb-1.2.1&q=80&w="
    },

    {
      title: "América do Sul",
      subtitle: "A violência da colonização",
      imageUrl: "https://images.unsplash.com/photo-1589228710553-095226fc298b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTMzNDU&ixlib=rb-1.2.1&q=80&w="
    },

    {
      title: "Ásia",
      subtitle: "Cultura milenar",
      imageUrl: "https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTM2Mjc&ixlib=rb-1.2.1&q=80&w="
    },
    {
      title: "África",
      subtitle: "Natureza intocada",
      imageUrl: "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTM3NjU&ixlib=rb-1.2.1&q=80&w="
    },
    {
      title: "Europa",
      subtitle: "O continente mais antigo",
      imageUrl: "https://images.unsplash.com/photo-1520114878144-6123749968dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTI3OTc&ixlib=rb-1.2.1&q=80&w="
    },
    {
      title: "Oceania",
      subtitle: "A maravilha das ilhas",
      imageUrl: "https://images.unsplash.com/photo-1572295215355-60431b92883f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MTM4Njk&ixlib=rb-1.2.1&q=80&w="
    },
  ]
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