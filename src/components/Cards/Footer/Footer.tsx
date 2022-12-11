import { IonRow } from "@ionic/react";

import "../../IonColor/color.css";

import Like from "./Like";

interface ContainerProps {
  like?: number;
  share?: number;
  comments: number;
  hidden: boolean;
  state: string;
}

const Footer: React.FC<ContainerProps> = ({ like }) => {
  return (
      <IonRow className="ion-justify-content-center">
        <Like like={like ? like : 0} />
      </IonRow>
  );
};

export default Footer;
