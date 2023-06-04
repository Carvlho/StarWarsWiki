import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useRoute } from "@react-navigation/native";

import api from "../../services/api";

import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";

import {
  ContainerDetail,
  ContainerDetails,
  ContainerLoading,
  ContainerStarshipsDetails,
  LoadingIndicator,
  RelatedItemText,
  RelatedItemTitle,
  RelatedItems,
  TextDetail,
  Title,
  TitleDetail,
} from "./styles";

export default function StarshipsDetails() {
  const route = useRoute<any>();
  const { details } = route.params;

  const [fadeAnim] = useState(new Animated.Value(0));

  const [films, setFilms] = useState([]);
  const [pilots, setPilots] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

  async function getPilotsTitle() {
    try {
      const urls = details?.pilots;
      const pilotsTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);

        pilotsTitle.push(data.name);
      }

      setPilots(pilotsTitle);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os pilotos da nave:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([getFilmTitle(), getPilotsTitle()]);

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
    <ContainerStarshipsDetails>
      <Header title="Detalhes" />

      <CardDetails>
        <Title>{details?.name}</Title>
        <ContainerDetails>
          <ContainerDetail>
            <TitleDetail>Modelo:</TitleDetail>
            <TextDetail>{details?.model}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Fabricante:</TitleDetail>
            <TextDetail>{details?.manufacturer}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Custo em créditos:</TitleDetail>
            <TextDetail>{details?.cost_in_credits}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Comprimento:</TitleDetail>
            <TextDetail>{details?.length}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Velocidade atmosférica máxima:</TitleDetail>
            <TextDetail>{details?.max_atmosphering_speed}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Capacidade de carga:</TitleDetail>
            <TextDetail>{details?.cargo_capacity}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Consumíveis:</TitleDetail>
            <TextDetail>{details?.consumables}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Avaliação hiperdrive:</TitleDetail>
            <TextDetail>{details?.hyperdrive_rating}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>MGLT:</TitleDetail>
            <TextDetail>{details?.MGLT}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Aula de nave estelar:</TitleDetail>
            <TextDetail>{details?.starship_class}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Nº de Passageiros:</TitleDetail>
            <TextDetail>{details?.passengers}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Nº de Equipe:</TitleDetail>
            <TextDetail>{details?.crew}</TextDetail>
          </ContainerDetail>
        </ContainerDetails>
      </CardDetails>

      {isLoading ? (
        <ContainerLoading>
          <LoadingIndicator size="large" />
        </ContainerLoading>
      ) : (
        <Animated.View style={{ width: "100%", opacity: fadeAnim }}>
          {films[0] && (
            <RelatedItems>
              <RelatedItemTitle>Filmes Relacionados:</RelatedItemTitle>
              {films.map((film, index) => (
                <RelatedItemText key={index}> - {film}</RelatedItemText>
              ))}
            </RelatedItems>
          )}

          {pilots[0] && (
            <RelatedItems>
              <RelatedItemTitle>Pilotos Relacionadas:</RelatedItemTitle>
              {pilots.map((pilot, index) => (
                <RelatedItemText key={index}> - {pilot}</RelatedItemText>
              ))}
            </RelatedItems>
          )}
        </Animated.View>
      )}
    </ContainerStarshipsDetails>
  );
}
