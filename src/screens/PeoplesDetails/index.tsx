import { useRoute } from "@react-navigation/native";

import Header from "../../components/Header";

import { ContainerPeoplesDetails } from "./styles";

export default function PeoplesDetails() {
  const route = useRoute<any>();

  const { details } = route.params;

  return (
    <ContainerPeoplesDetails>
      <Header title="Detalhes" />
    </ContainerPeoplesDetails>
  );
}
