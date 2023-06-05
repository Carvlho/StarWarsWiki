import { useEffect, useState } from "react";
import { Animated } from "react-native";
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

export default function FilmsDetails() {
  const route = useRoute<any>();
  const { details } = route.params;

  const [fadeAnim] = useState(new Animated.Value(0));

  const [peoples, setPeoples] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  async function getPeoplesTitle() {
    try {
      const urls = details?.characters;
      const peoplesTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);

        peoplesTitle.push(data.name);
      }

      setPeoples(peoplesTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os personagens:", error);
    }
  }

  async function getPlanetsTitle() {
    try {
      const urls = details?.planets;
      const planetsTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);

        planetsTitle.push(data.name);
      }

      setPlanets(planetsTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os títulos dos planetas:", error);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([
          getPeoplesTitle(),
          getPlanetsTitle(),
          getSpeciesTitle(),
          getStarshipsTitle(),
          getVehiclesTitle(),
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: isLoading ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  return (
    <SafeArea>
      <Container>
        <Header title="Detalhes" />

        <CardDetails>
          <Title>{details?.title}</Title>
          <ContainerDetails>
            <ContainerDetail>
              <TitleDetail>Episódios:</TitleDetail>
              <TextDetail>{details?.episode_id}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Diretor:</TitleDetail>
              <TextDetail>{details?.director}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Produtor:</TitleDetail>
              <TextDetail>{details?.producer}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Data de lançamento:</TitleDetail>
              <TextDetail>{details?.release_date}</TextDetail>
            </ContainerDetail>
          </ContainerDetails>
        </CardDetails>

        {isLoading ? (
          <Loading />
        ) : (
          <Animated.View style={{ width: "100%", opacity: fadeAnim, flex: 1 }}>
            <Scroll>
              {peoples[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Pessoas Relacionadas:</RelatedItemTitle>
                  {peoples.map((people, index) => (
                    <RelatedItemText key={index}> - {people}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {planets[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Planetas Relacionados:</RelatedItemTitle>
                  {planets.map((planet, index) => (
                    <RelatedItemText key={index}> - {planet}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {starships[0] && (
                <RelatedItems>
                  <RelatedItemTitle>
                    Naves Estelares Relacionadas:
                  </RelatedItemTitle>
                  {starships.map((starship, index) => (
                    <RelatedItemText key={index}> - {starship}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {vehicles[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Veículos Relacionados:</RelatedItemTitle>
                  {vehicles.map((vehicle, index) => (
                    <RelatedItemText key={index}> - {vehicle}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {species[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Espécies Relacionadas:</RelatedItemTitle>
                  {species.map((specie, index) => (
                    <RelatedItemText key={index}> - {specie}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}
            </Scroll>
          </Animated.View>
        )}
      </Container>
    </SafeArea>
  );
}
