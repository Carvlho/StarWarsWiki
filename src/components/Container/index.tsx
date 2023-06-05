import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  height: 100%;

  align-items: flex-start;
  justify-content: flex-start;

  padding: 20px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export default Container;
