import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import StarWarsLogo from "../../assets/StarWarsLogo.png";

import IconPeoples from "../../assets/IconPeoples.png";
import IconPlanets from "../../assets/IconPlanets.png";
import IconSpecies from "../../assets/IconSpecies.png";
import IconStarships from "../../assets/IconStarships.png";
import IconVehicles from "../../assets/IconVehicles.png";
import IconFilms from "../../assets/IconFilms.png";

import ButtonCategories from "../../components/ButtonCategories";

import { RootStackParams } from "../../utils/RootStackParams";

import { Container, ContainerButtons, Logo } from "./styles";

type ScreenStack = NativeStackNavigationProp<RootStackParams>;

export default function Home() {
  const navigation = useNavigation<ScreenStack>();

  function handleNavigatePeoples() {
    navigation.navigate("PeoplesList");
  }

  function handleNavigationPlanets() {
    navigation.navigate("PlanetsList");
  }

  function handleNavigationSpecies() {
    navigation.navigate("SpeciesList");
  }

  function handleNavigationStarships() {
    navigation.navigate("StarshipsList");
  }

  function handleNavigationVehicles() {
    navigation.navigate("VehiclesList");
  }

  function handleNavigationFilms() {
    navigation.navigate("FilmsList");
  }
  
  return (
    <Container>
      <Logo source={StarWarsLogo} />

      <ContainerButtons>
        <ButtonCategories
          title="Pessoas"
          icon={IconPeoples}
          onPress={handleNavigatePeoples}
        />
        <ButtonCategories
          title="Planetas"
          icon={IconPlanets}
          onPress={handleNavigationPlanets}
        />
        <ButtonCategories
          title="Espécies"
          icon={IconSpecies}
          onPress={handleNavigationSpecies}
        />
        <ButtonCategories
          title="Aeronaves"
          icon={IconStarships}
          onPress={handleNavigationStarships}
        />
        <ButtonCategories
          title="Veículos"
          icon={IconVehicles}
          onPress={handleNavigationVehicles}
        />
        <ButtonCategories
          title="Filmes"
          icon={IconFilms}
          onPress={handleNavigationFilms}
        />
      </ContainerButtons>
    </Container>
  );
}
