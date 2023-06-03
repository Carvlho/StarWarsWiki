import { CardItemContainer, CardItemSubtitle, CardItemTitle } from "./styles";

interface CardItemProps {
  name: string;
}

export default function CardItem({ name }: CardItemProps) {
  return (
    <CardItemContainer>
      <CardItemTitle>{name}</CardItemTitle>
      <CardItemSubtitle>Acessar os detalhes</CardItemSubtitle>
    </CardItemContainer>
  );
}
