import styled from "styled-components/native";

const Scroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 40,
  },
}))`
  width: 100%;
`;

export default Scroll;
