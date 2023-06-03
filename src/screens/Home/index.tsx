import StarWarsLogo from "../../assets/StarWarsLogo.png";

import IconPeoples from "../../assets/IconPeoples.png";
import IconPlanets from "../../assets/IconPlanets.png";
import IconSpecies from "../../assets/IconSpecies.png";
import IconStarships from "../../assets/IconStarships.png";
import IconVehicles from "../../assets/IconVehicles.png";
import IconFilms from "../../assets/IconFilms.png";

import ButtonCategories from "../../components/ButtonCategories";

import { Container, ContainerButtons, Logo } from "./styles";

export default function Home() {
  return (
    <Container>
      <Logo source={StarWarsLogo} />

      <ContainerButtons>
        <ButtonCategories title="Pessoas" icon={IconPeoples} />
        <ButtonCategories title="Planetas" icon={IconPlanets} />
        <ButtonCategories title="Espécies" icon={IconSpecies} />
        <ButtonCategories title="Aeronaves" icon={IconStarships} />
        <ButtonCategories title="Veículos" icon={IconVehicles} />
        <ButtonCategories title="Filmes" icon={IconFilms} />
      </ContainerButtons>
    </Container>
  );
}
