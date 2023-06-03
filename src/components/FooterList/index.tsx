import { View } from "react-native";
import {
  ContainerItens,
  FooterButton,
  FooterContainer,
  FooterText,
  Icon,
} from "./styles";

interface FooterProps {
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
}

export default function Footer({
  prevPage,
  nextPage,
  currentPage,
}: FooterProps) {
  return (
    <FooterContainer>
      <ContainerItens>
        {currentPage != 1 && (
          <FooterButton onPress={prevPage}>
            <Icon name="arrow-left" />
          </FooterButton>
        )}
      </ContainerItens>
      <ContainerItens>
        <FooterText>{currentPage}</FooterText>
      </ContainerItens>
      <ContainerItens>
        {currentPage != 9 && (
          <FooterButton onPress={nextPage}>
            <Icon name="arrow-right" />
          </FooterButton>
        )}
      </ContainerItens>
    </FooterContainer>
  );
}
