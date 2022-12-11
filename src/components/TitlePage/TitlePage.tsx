import {
  IonCol, IonRow,
  IonText
} from "@ionic/react";
import "./TitlePage.css";

interface Prop {
  title: string;
  subTitle: string;
}

const TitlePage: React.FC<Prop> = ({ title, subTitle }) => {
  return (
    <IonRow>
      <IonCol className="ion-justify-content-center">
        <IonText color="black" className="ion-text-center">
          <h1 className="bold uppercase">{title}</h1>
          <h5 className="bold">{subTitle}</h5>
        </IonText>
      </IonCol>
    </IonRow>
  );
};

export default TitlePage;
