import { useEffect, useState } from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import api from "../../services/api";

import {
  CardDetails,
  Container,
  Header,
  Loading,
  SafeArea,
  Scroll,
} from "../../components";

import {
  ContainerDetail,
  ContainerDetails,
  RelatedItemText,
  RelatedItemTitle,
  RelatedItems,
  TextDetail,
  Title,
  TitleDetail,
} from "./styles";

export default function PeoplesDetails() {
  const route = useRoute<any>();

  const { details } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [films, setFilms] = useState([]);
  const [homeworlds, setHomeworlds] = useState();
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  function getHomeworlds() {
    return api.get(details?.homeworld).then((res) => {
      setHomeworlds(res.data.name);
    });
  }

  async function getFilmTitle() {
    try {
      const urls = details?.films;
      const filmsTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);
        filmsTitle.push(data.title);
      }

      setFilms(filmsTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os títulos dos filmes:", error);
    }
  }

  async function getSpeciesTitle() {
    try {
      const urls = details?.species;
      const speciesTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);
        speciesTitle.push(data.name);
      }

      setSpecies(speciesTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os títulos das espécies:", error);
    }
  }

  async function getVehiclesTitle() {
    try {
      const urls = details?.vehicles;
      const vehiclesTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);
        vehiclesTitle.push(data.name);
      }

      setVehicles(vehiclesTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os títulos dos veículos:", error);
    }
  }

  async function getStarshipsTitle() {
    try {
      const urls = details?.starships;
      const starshipsTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);
        starshipsTitle.push(data.name);
      }

      setStarships(starshipsTitle);
    } catch (error) {
      console.error(
        "Ocorreu um erro ao obter os títulos das naves estelares:",
        error
      );
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([
          getHomeworlds(),
          getFilmTitle(),
          getSpeciesTitle(),
          getVehiclesTitle(),
          getStarshipsTitle(),
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeArea>
      <Container>
        <Header title="Detalhes" />
        <CardDetails>
          <Title>{details?.name}</Title>

          <ContainerDetails>
            <ContainerDetail>
              <TitleDetail>Altura:</TitleDetail>
              <TextDetail>{details?.height} cm</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Cor dos Olhos:</TitleDetail>
              <TextDetail>{details?.eye_color}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Cor da Pele:</TitleDetail>
              <TextDetail>{details?.skin_color}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Cor do Cabelo:</TitleDetail>
              <TextDetail>{details?.hair_color}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Ano de Nascimento:</TitleDetail>
              <TextDetail>{details?.birth_year}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Gênero:</TitleDetail>
              <TextDetail>{details?.gender}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Planeta Natal:</TitleDetail>
              <TextDetail>{homeworlds}</TextDetail>
            </ContainerDetail>
          </ContainerDetails>
        </CardDetails>

        {isLoading ? (
          <Loading />
        ) : (
          <View testID="relatedThings-view" style={{ flex: 1 }}>
            <Scroll>
              {films[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Filmes Relacionados:</RelatedItemTitle>
                  {films.map((film) => (
                    <RelatedItemText key={film}>- {film}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {species[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Espécies Relacionadas:</RelatedItemTitle>
                  {species.map((specie) => (
                    <RelatedItemText key={specie}>- {specie}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {vehicles[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Veículos Relacionados:</RelatedItemTitle>
                  {vehicles.map((vehicle) => (
                    <RelatedItemText key={vehicle}>- {vehicle}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {starships[0] && (
                <RelatedItems>
                  <RelatedItemTitle>
                    Naves Estelares Relacionadas:
                  </RelatedItemTitle>
                  {starships.map((starship) => (
                    <RelatedItemText key={starship}>
                      - {starship}
                    </RelatedItemText>
                  ))}
                </RelatedItems>
              )}
            </Scroll>
          </View>
        )}
      </Container>
    </SafeArea>
  );
}
