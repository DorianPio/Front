import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
} from "@ionic/react";
import "./PageNotFound.css";

const PageNotFound: React.FC = () => {
  return (
    <IonContent className="content404">
      <IonGrid className="grid404">
        <IonHeader className="header404">Error 404</IonHeader>
        <IonItem className="item404">
          Looks like this page is not available
        </IonItem>
        <div className="ion-text-center">
          <IonButton href="/" className="button404">
            Back to home
          </IonButton>
        </div>
      </IonGrid>
    </IonContent>
  );
};

export default PageNotFound;
