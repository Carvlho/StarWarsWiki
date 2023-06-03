import styled from "styled-components/native";

export const CardItemContainer = styled.TouchableOpacity`
  width: 100%;

  padding: 16px;
  margin-bottom: 12px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_yellow};
`;

export const CardItemTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

export const CardItemSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};

  margin-top: 4px;
`;
