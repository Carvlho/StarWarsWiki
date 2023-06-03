import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const FooterContainer = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 32px;
`;

export const ContainerItens = styled.View`
  width: 47%;
`;

export const FooterButton = styled.TouchableOpacity``;

export const Icon = styled(Feather)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

export const FooterText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
`;
