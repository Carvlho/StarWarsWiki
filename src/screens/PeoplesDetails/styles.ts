import styled from "styled-components/native";

export const ContainerDetails = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.dark};

  margin-bottom: 16px;
`;

export const ContainerDetail = styled.View`
  width: 45%;

  align-items: flex-start;
  justify-content: center;

  overflow: hidden;
`;

export const TitleDetail = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

export const TextDetail = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark};
  text-transform: capitalize;

  margin-top: 4px;
  margin-left: 8px;
`;

export const RelatedItems = styled.View`
  gap: 8px;

  margin-top: 32px;
`;

export const RelatedItemTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const RelatedItemText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;
