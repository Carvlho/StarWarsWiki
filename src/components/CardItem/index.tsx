import { CardItemContainer, CardItemSubtitle, CardItemTitle } from "./styles";

interface CardItemProps {
  name: string;
  handleDetails: () => void;
}

export default function CardItem({ name, handleDetails }: CardItemProps) {
  return (
    <CardItemContainer onPress={handleDetails}>
      <CardItemTitle>{name}</CardItemTitle>
      <CardItemSubtitle>Acessar os detalhes</CardItemSubtitle>
    </CardItemContainer>
  );
}
