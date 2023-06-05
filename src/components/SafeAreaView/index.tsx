import styled from "styled-components/native";

const SafeArea = styled.SafeAreaView`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.colors.background};
`;

export default SafeArea;
