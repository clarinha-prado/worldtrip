import { useBreakpointValue, Flex, Image, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import styles from '../styles/europe.module.scss';
import { unsplashApi, PhotoProps } from '../services/upsplash';
import { RiInformationLine } from 'react-icons/ri';
import { api } from '../services/api';
import { CityList } from '../components/CityList';

interface HomeProps {
  // photo: PhotoProps;
  continent: ContinentProps;
  url: string;
}

interface CityProps {
  id: number;
  name: string;
  country: string;
  photoId: string;
  countryAbbrev: string;
  photoUrl: string;
}

interface ContinentProps {
  id: number;
  name: string;
  subtitle: string;
  photoHomePageId: string;
  countriesQtt: number;
  idiomsQtt: number;
  cities100Qtt: number;
  cities: CityProps[];
}

export default function Home(props: HomeProps) {

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true
  })

  let bannerEurope = "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MzIzNjc&ixlib=rb-1.2.1&q=80&w=1080";

  return (
    <>
      <Header />

      <div className={styles.bannerContinent}>
        <Image
          htmlWidth="100vw"
          fit="cover"
          src={bannerEurope}
          alt={`${props.continent.name} - ${props.continent.subtitle}`}
          style={{ filter: "brightness(60%)" }}
        />
        <Text
          fontWeight="600"
          fontSize={["20px", "20px", "48px"]}
          lineHeight={["30px", "30px", "72px"]}
          color="white"
          ml="140px"
          style={{ position: "absolute", top: "441px" }}
        >
          {props.continent.name}
        </Text>
      </div>

      <Flex direction="column" my="80px" mx="140px" >
        <Flex mb={["20px", "20px", "3rem"]}>
          <Text mr="70px" fontWeight="400" fontSize={["20px", "20px", "24px"]} lineHeight={["30px", "30px", "36px"]} align="justify">
            A Europa é, por convenção, um dos seis continentes do mundo. Compreendendo a península ocidental da Eurásia, a Europa geralmente divide-se da Ásia a leste pela divisória de águas dos montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste.
      </Text>
          <Flex>

            <Flex mr="50px" direction="column">
              <Text align="center" color="yellow.400" fontSize="48px" fontWeight="600" lineHeight="62px">
                {props.continent.countriesQtt}
              </Text>
              <Text align="center" fontSize="24px" fontWeight="600" lineHeight="36px">
                países
              </Text>
            </Flex>

            <Flex mr="50px" direction="column">
              <Text align="center" color="yellow.400" fontSize="48px" fontWeight="600" lineHeight="62px">
                {props.continent.idiomsQtt}
              </Text>
              <Text align="center" fontSize="24px" fontWeight="600" lineHeight="36px">
                línguas
              </Text>
            </Flex>

            <Flex w="188px" direction="column">
              <Text align="center" color="yellow.400" fontSize="48px" fontWeight="600" lineHeight="62px">
                {props.continent.cities100Qtt}
              </Text>
              <Flex direction="row" align="center">
                <Text align="center" mr="9px" fontSize="24px" fontWeight="600" lineHeight="36px">
                  cidades +100
                </Text>
                <RiInformationLine color="gray.300" opacity="0.5" size="19px" />
              </Flex>
            </Flex>

          </Flex>
        </Flex>

        <Flex direction="column">
          <Text mb="40px" fontSize="36px" fontWeight="500" lineHeight="54px">Cidades +100</Text>

          <CityList param={props.continent.cities} />

        </Flex>
      </Flex>

      <Flex h="3.25rem"></Flex>
    </>
  );
}

export async function getStaticProps() {

  /*   let response;
  
    try {
      response = await unsplashApi.photos
        .get({ photoId: "EXdXLrZXS9Q" });
    } catch {
      console.log("something went wrong!");
    } */
  let continent = await api.get('/continents/1')
    .then(
      (response) => { return response.data; }
    ).catch(
      (err) => { console.log("deu erro na busca dos dados no json server: " + err.message) }
    )

  // busca foto das cidades
  for (let i = 0; i < continent.cities.length; i++) {
    continent.cities[i].photoUrl = await getPhoto(continent.cities[i].photoId);
  }

  return {
    props: {
      continent,
      // photo: response.response,
    },
    revalidate: 60 * 60 * 24 * 7 // 1 semana
  }
}


async function getPhoto(id: string) {
  let url: string;
  try {
    await unsplashApi.photos
      .get({ photoId: id }).then((data) => { url = data.response.urls.thumb });
  } catch (err) {
    console.log("erro ao buscar foto da cidade: " + err.message);
  }
  return url;
}

