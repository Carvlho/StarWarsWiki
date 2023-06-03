import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;

  padding: 20px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 32px;
  margin-bottom: 60px;
`;

export const List = styled.FlatList`
  width: 100%;
`;

export const ContainerLoading = styled.View`
  width: 100%;

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  color: ${({ theme }) => theme.colors.white};
`;
