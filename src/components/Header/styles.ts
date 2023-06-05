import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  position: relative;

  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-bottom: 24px;
`;

export const ButtonIcon = styled.TouchableOpacity`
  position: absolute;
  left: 0;

  margin-right: 8px;
`;

export const Icon = styled(Feather)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;
