import { Box, Flex, Text } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { unsplashApi } from '../../services/upsplash';
import { RiInformationLine } from 'react-icons/ri';
import { axiosApi } from '../../services/axios';
import { CityList } from '../../components/CityList';

interface HomeProps {
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
  imageUrl: string;
  countriesQtt: number;
  idiomsQtt: number;
  cities100Qtt: number;
  cities: CityProps[];
}

export default function Home(props: HomeProps) {

  let bannerEurope = "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNzZ8MHwxfGFsbHx8fHx8fHx8fDE2MTc4MzIzNjc&ixlib=rb-1.2.1&q=80&w=1080";

  return (
    <>
      <Header />

      <Flex
        h={["150px", "225px", "300px", "500px"]}
        bgImage={`url(${bannerEurope})`}
        bgPosition={["100% 40%", "100% 50%"]}
        bgRepeat="no-repeat"
        bgSize="cover"
      >

        <Flex
          justify={["center", "flex-start"]}
          w="100%"
          mx="auto"
          align={["center", "flex-end"]}
          pl={["0px", "70px", "140px"]}
        >

          <Text
            align={["center", "left"]}
            w="100%"
            color="white"
            fontWeight="600"
            fontSize={["20px", "32px", "48px"]}
            lineHeight={["30px", "30px", "72px"]}
            mb={[0, 16]}
          >
            {props.continent.name}

          </Text>
        </Flex>

      </Flex>

      <Flex direction="column" my={["24px", "42px", "60px", "80px"]} mx={["3%", "4%", "5%", "9%"]} >
        <Flex direction={["column", "column", "column", "row"]} mb={["20px", "20px", "3rem"]}>
          <Text
            mr={["0px", "0px", "0px", "70px"]}
            fontWeight="400"
            fontSize={["14px", "19px", "24px"]}
            lineHeight={["21px", "30px", "36px"]}
            align="justify"
          >
            A Europa é, por convenção, um dos seis continentes do mundo. Compreendendo a península ocidental da Eurásia, a Europa geralmente divide-se da Ásia a leste pela divisória de águas dos montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste.
          </Text>
          <Flex
            align="center"
            justify="center"
            direction={["row"]}
            mt={["16px", "20px", "48px", "0px"]}
          >

            <Flex mr="50px" direction="column" align={["start", "center"]}>
              <Text align="center" color="yellow.400" fontSize={["24px", "48px"]} fontWeight="600" lineHeight={["36px", "62px"]}>
                {props.continent.countriesQtt}
              </Text>
              <Text align="center" fontSize={["18px", "24px"]} fontWeight={["400", "600"]} lineHeight={["27px", "36px"]}>
                países
              </Text>
            </Flex>

            <Flex mr="50px" direction="column" align={["start", "center"]}>
              <Text align="center" color="yellow.400" fontSize={["24px", "48px"]} fontWeight="600" lineHeight={["36px", "62px"]}>
                {props.continent.idiomsQtt}
              </Text>
              <Text align="center" fontSize={["18px", "24px"]} fontWeight={["400", "600"]} lineHeight={["27px", "36px"]}>
                línguas
              </Text>
            </Flex>

            <Flex w="188px" direction="column" align={["start", "center"]}>
              <Text align="center" color="yellow.400" fontSize={["24px", "48px"]} fontWeight="600" lineHeight={["36px", "62px"]}>
                {props.continent.cities100Qtt}
              </Text>
              <Flex direction="row" align="center">
                <Text align="center" fontSize={["18px", "24px"]} fontWeight={["400", "600"]} lineHeight={["27px", "36px"]}>
                  cidades +100
                </Text>
                <Box w={["10px", "19px"]} ml={["10px", "5px"]}>
                  <RiInformationLine color="gray.300" opacity="0.5" size="100%" />
                </Box>
              </Flex>
            </Flex>

          </Flex>
        </Flex>

        <Flex direction="column">
          <Text
            mb={["20px", "40px"]}
            fontSize={["24px", "36px"]}
            fontWeight="500"
            lineHeight={["36px", "54px"]}
            w="100%"
          >
            Cidades +100
            </Text>

          <CityList param={props.continent.cities} />

        </Flex>
      </Flex>

      <Flex h="3.25rem"></Flex>
    </>
  );
}
export async function getStaticPaths() {
  return {
    paths: [
      // só gerar em tempo de build a página Europa
      { params: { id: '1' } }
    ],
    fallback: false  // false retorna 404 para páginas q ñ estão no 'paths'
  };
}

export async function getStaticProps() {

  let continent = await axiosApi.get('/continents/1')
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

