import { Text } from "react-native";

import Header from "../../components/Header";

import { ContainerPlanets } from "./styles";

export default function Planets() {
  return (
    <ContainerPlanets>
      <Header title="Planetas" />

      <Text>View Planets</Text>
    </ContainerPlanets>
  );
}
