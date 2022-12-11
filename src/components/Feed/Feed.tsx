import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import Cards from "../Cards/Cards";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./Feed.css";

interface ContainerProps {
  pathLogo: string;
}

const Feed: React.FC<ContainerProps> = ({ pathLogo }) => {
  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/account"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol class="ion-justify-content-center" size-lg="5" size-sm="10">
              <TitlePage
                title="Mur Social"
                subTitle="Voici ce que l'ensemble des élèves ont pu faire"
              ></TitlePage>
              <Cards endpoint="feed" state="feed" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
