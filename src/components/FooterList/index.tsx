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
  maxPages: number;
}

export default function Footer({
  prevPage,
  nextPage,
  currentPage,
  maxPages,
}: FooterProps) {
  return (
    <FooterContainer testID="footer_list">
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
        {currentPage != maxPages && (
          <FooterButton onPress={nextPage} testID="btn-next-page">
            <Icon name="arrow-right" />
          </FooterButton>
        )}
      </ContainerItens>
    </FooterContainer>
  );
}
