import styled from "styled-components/native";

export const ContainerPeoplesDetails = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 20px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerDetails = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin-top: 10%;
  margin-bottom: 15%;
`;

export const ContainerDetail = styled.View`
  width: 45%;
`;

export const TitleDetail = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TextDetail = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;

  padding-top: 4px;
  padding-left: 24px;
`;

export const ContainerInformation = styled.View`
  width: 100%;

  margin-top: 12px;
`;

export const ContainerLoading = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;
`;
