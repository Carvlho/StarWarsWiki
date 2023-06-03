import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 150px;
  max-width: 150px;
  height: auto;

  align-items: center;
  justify-content: center;

  padding: 24px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_yellow};
`;

export const ImageButton = styled.Image`
  width: 50px;
  height: 50px;

  margin-bottom: 8px;
`;

export const ButtonTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.dark};
`;
