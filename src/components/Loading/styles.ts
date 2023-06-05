import styled from "styled-components/native";

export const ContainerLoading = styled.View`
  width: 100%;

  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  color: ${({ theme }) => theme.colors.white};
`;
