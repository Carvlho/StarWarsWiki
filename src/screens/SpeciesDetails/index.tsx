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

export default function SpeciesDetails() {
  const route = useRoute<any>();
  const { details } = route.params;

  const [fadeAnim] = useState(new Animated.Value(0));

  const [homeworlds, setHomeworlds] = useState("N/A");
  const [films, setFilms] = useState([]);
  const [peoples, setPeoples] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

  async function getPeoplesTitle() {
    try {
      const urls = details?.people;
      const peoplesTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);

        peoplesTitle.push(data.name);
      }

      setPeoples(peoplesTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter as pessoas da espécie:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([getHomeworlds(), getFilmTitle(), getPeoplesTitle()]);

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
          <Title>{details?.name}</Title>
          <ContainerDetails>
            <ContainerDetail>
              <TitleDetail>Classificação:</TitleDetail>
              <TextDetail>{details?.classification}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Designação:</TitleDetail>
              <TextDetail>{details?.designation}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Altura média:</TitleDetail>
              <TextDetail>{details?.average_height}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Cores de pele:</TitleDetail>
              <TextDetail>{details?.skin_colors}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Cores de cabelo:</TitleDetail>
              <TextDetail>{details?.hair_colors}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Cores dos olhos:</TitleDetail>
              <TextDetail>{details?.eye_colors}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Média de vida:</TitleDetail>
              <TextDetail>{details?.average_lifespan}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Planeta Natal:</TitleDetail>
              <TextDetail>{homeworlds}</TextDetail>
            </ContainerDetail>

            <ContainerDetail>
              <TitleDetail>Língua:</TitleDetail>
              <TextDetail>{details?.language}</TextDetail>
            </ContainerDetail>
          </ContainerDetails>
        </CardDetails>

        {isLoading ? (
          <Loading />
        ) : (
          <Animated.View style={{ width: "100%", opacity: fadeAnim, flex: 1 }}>
            <Scroll>
              {films[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Filmes Relacionados:</RelatedItemTitle>
                  {films.map((film, index) => (
                    <RelatedItemText key={index}> - {film}</RelatedItemText>
                  ))}
                </RelatedItems>
              )}

              {peoples[0] && (
                <RelatedItems>
                  <RelatedItemTitle>Personagens Relacionadas:</RelatedItemTitle>
                  {peoples.map((people, index) => (
                    <RelatedItemText key={index}> - {people}</RelatedItemText>
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
