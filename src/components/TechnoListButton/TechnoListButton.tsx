import { IonCol, IonItem, IonRow, IonText } from "@ionic/react";
import "./TechnoListButton.css";

const TechnoListButton: React.FC = ({}) => {
  return (
    <IonRow className="ion-justify-content-center">
      <IonCol size="12" size-sm="12" size-lg="6">
          <IonItem color="transparent"></IonItem>
        <IonItem color="transparent">
          <IonText
            className="btn btn-shade"
            onClick={() => (window.location.href = "")}
          >
            Retour
          </IonText>
        </IonItem>
      </IonCol>
    </IonRow>
  );
};

export default TechnoListButton;
