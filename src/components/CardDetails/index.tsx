import { ReactNode } from "react";
import { ContainerCardDetails } from "./styles";

type CardDetailsProps = {
  children: ReactNode;
};

export default function CardDetails({ children }: CardDetailsProps) {
  return (
    <ContainerCardDetails testID="card-details">
      {children}
    </ContainerCardDetails>
  );
}
