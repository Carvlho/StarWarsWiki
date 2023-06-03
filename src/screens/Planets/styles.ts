import styled from "styled-components/native";

export const ContainerPlanets = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;

  padding: 20px;

  background-color: ${({ theme }) => theme.colors.background};
`;
