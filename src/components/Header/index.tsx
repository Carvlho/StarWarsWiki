import { useNavigation } from "@react-navigation/native";

import { ButtonIcon, Container, Icon, Title } from "./styles";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <ButtonIcon onPress={handleGoBack}>
        <Icon name="arrow-left" />
      </ButtonIcon>
      <Title>{title}</Title>
    </Container>
  );
}
