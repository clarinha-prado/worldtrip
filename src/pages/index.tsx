import { useBreakpointValue, Flex, Spacer, Divider, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import styles from '../styles/home.module.scss';
import { NavLink } from '../components/NavLink';
import React, { useState } from 'react';
import { Photo } from '../components/Photo';
import { unsplashApi, PhotoProps } from '../services/upsplash';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

interface HomeProps {
  photo: PhotoProps;
}

SwiperCore.use([Navigation, Pagination]);

export default function Home(props: HomeProps) {

  const photoIds = [
    'q1XSXdBlOik',

  ]

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
      subtitle: "O continente mais antigo",
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc3OTI2MDg&ixlib=rb-1.2.1&q=80&w=1080"
    },

    {
      title: "América do Sul",
      subtitle: "O continente mais antigo",
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MDIzMDQ&ixlib=rb-1.2.1&q=80&w=1080"
    },

    {
      title: "Europa",
      subtitle: "O continente mais antigo",
      imageUrl: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MDIzNTU&ixlib=rb-1.2.1&q=80&w=1080"
    },
  ]
  for (let i = 0; i < 3; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} >
        <div style={{ position: "relative" }}>
          <img
            src={continentsInfo[i].imageUrl}
            alt={`Slide ${i}`}
          />

          <Text lineHeight="72px" color="black" fontWeight="700" fontSize="48px">
            {continentsInfo[i].title}
          </Text>
          <Text lineHeight="36px" color="white" fontWeight="700" fontSize="24px">
            {continentsInfo[i].subtitle}


          </Text>
        </div>
      </SwiperSlide>
    );
  };

  return (
    <>
      <Header />

      <div className={styles.banner}>
        <img src={banner} alt="5 continentes - infinitas possibilidades" />
      </div>

      <Flex maxW="1140px" mt="4rem" mx="auto">

        <NavLink image="cocktail.svg" href="/">vida noturna</NavLink>
        <Spacer />
        <NavLink image="surf.svg" href="/">praia</NavLink>
        <Spacer />
        <NavLink image="building.svg" href="/">moderno</NavLink>
        <Spacer />
        <NavLink image="museum.svg" href="/">clássico</NavLink>
        <Spacer />
        <NavLink image="earth.svg" href="/">e mais...</NavLink>

      </Flex>

      <Flex w="100%" align="center" direction="column">
        <Divider mt="5rem" mb="3.25rem" w="5.63rem" border="2px" borderColor="gray.400" opacity="1" />

        <Text fontWeight="500" fontSize="2.25rem" lineHeight="3.375rem" align="center" mb="3rem">
          Vamos nessa?<br />
          Então escolha seu continente
      </Text>

        <Swiper
          className=""
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
      .get({ photoId: "OD9EOzfSOh0" });
  } catch {
    console.log("something went wrong!");
  }

  return {
    props: {
      photo: response.response,
    },

    revalidate: 60 * 60 * 24 * 7 // 1 semana
  }
}