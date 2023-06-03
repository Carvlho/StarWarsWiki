import { ButtonIcon, Container, Icon, Title } from "./styles";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <Container>
      <ButtonIcon>
        <Icon name="arrow-left" />
      </ButtonIcon>
      <Title>{title}</Title>
    </Container>
  );
}
