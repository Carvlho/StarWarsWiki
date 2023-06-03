import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 32px;

  padding: 20px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Logo = styled.Image`
  max-width: 300px;
  height: 20%;
`;

export const ContainerButtons = styled.View`
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
