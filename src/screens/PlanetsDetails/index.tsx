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
  ContainerPlanetsDetails,
  LoadingIndicator,
  RelatedItemText,
  RelatedItemTitle,
  RelatedItems,
  TextDetail,
  Title,
  TitleDetail,
} from "./styles";

export default function PlanetsDetails() {
  const route = useRoute<any>();
  const { details } = route.params;

  const [fadeAnim] = useState(new Animated.Value(0));

  const [films, setFilms] = useState([]);
  const [residents, setResidents] = useState([]);

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

  async function getResidentsTitle() {
    try {
      const urls = details?.residents;
      const residentsTitle: any = [];

      for (const url of urls) {
        const { data } = await api.get(url);

        residentsTitle.push(data.name);
      }

      setResidents(residentsTitle);
    } catch (error) {
      console.error(
        "Ocorreu um erro ao obter os residentes do planeta:",
        error
      );
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([getFilmTitle(), getResidentsTitle()]);

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
    <ContainerPlanetsDetails>
      <Header title="Detalhes" />

      <CardDetails>
        <Title>{details?.name}</Title>
        <ContainerDetails>
          <ContainerDetail>
            <TitleDetail>Período de rotação:</TitleDetail>
            <TextDetail>{details?.rotation_period}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Diâmetro:</TitleDetail>
            <TextDetail>{details?.diameter}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Período orbital:</TitleDetail>
            <TextDetail>{details?.orbital_period}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Clima:</TitleDetail>
            <TextDetail>{details?.climate}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Gravidade:</TitleDetail>
            <TextDetail>{details?.gravity}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Terreno:</TitleDetail>
            <TextDetail>{details?.terrain}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>Água da superfície:</TitleDetail>
            <TextDetail>{details?.surface_water}</TextDetail>
          </ContainerDetail>

          <ContainerDetail>
            <TitleDetail>População:</TitleDetail>
            <TextDetail>{details?.population}</TextDetail>
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

          {residents[0] && (
            <RelatedItems>
              <RelatedItemTitle>Residentes Relacionados:</RelatedItemTitle>
              {residents.map((resident, index) => (
                <RelatedItemText key={index}> - {resident}</RelatedItemText>
              ))}
            </RelatedItems>
          )}
        </Animated.View>
      )}
    </ContainerPlanetsDetails>
  );
}
