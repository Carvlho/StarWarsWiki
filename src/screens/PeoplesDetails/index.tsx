import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";

import api from "../../services/api";

import Header from "../../components/Header";

import {
  ContainerDetail,
  ContainerDetails,
  ContainerInformation,
  ContainerLoading,
  ContainerPeoplesDetails,
  TextDetail,
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
    <ContainerPeoplesDetails>
      <Header title="Detalhes" />
      <ContainerDetails>
        <ContainerDetail>
          <TitleDetail>Nome:</TitleDetail>
          <TextDetail>{details?.name}</TextDetail>
        </ContainerDetail>

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

      {isLoading ? (
        <ContainerLoading>
          <ActivityIndicator size="large" color="white" />
        </ContainerLoading>
      ) : (
        <>
          {films[0] && (
            <ContainerInformation>
              <TitleDetail>Filmes:</TitleDetail>
              {films.map((film) => (
                <TextDetail key={film}>{film}</TextDetail>
              ))}
            </ContainerInformation>
          )}

          {species[0] && (
            <ContainerInformation>
              <TitleDetail>Espécies:</TitleDetail>
              {species.map((specie) => (
                <TextDetail key={specie}>{specie}</TextDetail>
              ))}
            </ContainerInformation>
          )}

          {vehicles[0] && (
            <ContainerInformation>
              <TitleDetail>Veículos:</TitleDetail>
              {vehicles.map((vehicle) => (
                <TextDetail key={vehicle}>{vehicle}</TextDetail>
              ))}
            </ContainerInformation>
          )}

          {starships[0] && (
            <ContainerInformation>
              <TitleDetail>Naves Estelares:</TitleDetail>
              {starships.map((starship) => (
                <TextDetail key={starship}>{starship}</TextDetail>
              ))}
            </ContainerInformation>
          )}
        </>
      )}
    </ContainerPeoplesDetails>
  );
}
