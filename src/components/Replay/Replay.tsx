import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { days, monthsEntire, replayConst } from "./variables";

import "../generalCSS/stylesheet.css";
import "./Replay.css";
import { useEffect, useState } from "react";
import { makeGETRequest } from "../../request/rawRequest";
import { getDate } from "../../genericFunctions/date";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";

const nextLivesDisplay = (replayList: any[]) => {
  return (
    <IonRow>
      <IonCol className="border-radius">
        {replayList.map((replay, i) => {
          // const date = new Date(replay.date).toString();
          const date = getDate(replay.date.toString());
          return (
            <IonCard
              key={replay._id}
              color="tertiary"
              className="card border-radius card-live"
              href={"videoreplay?&id=" + replay._id}
            >
              <IonCardContent>
                <IonRow>
                  <p className="live-title black-text bold">
                    {replay.name} par {replay.host}
                  </p>
                </IonRow>
                <IonRow>
                  <p className="live-title">Le live a eu lieu le {date}</p>
                </IonRow>
                <IonRow>
                  <p className="live-title black-text bold">{replay.subject}</p>
                </IonRow>
                <IonRow
                  className="ion-justify-content-center"
                  onClick={() => {}}
                >
                  <IonCol size="12" size-lg="6" size-sm="12">
                    <IonText>
                      <p className="bold hover-underline btn">
                        Voir le replay !
                      </p>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonCol>
    </IonRow>
  );
};

const getReplays = async () => {
  let replays: any = [];
  await makeGETRequest("/event?type=replay").then((response) => {
    replays = response;
  });
  return replays;
};

interface ContainerProps {
  pathLogo: string;
}

const Replay: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [replayList, setReplayList] = useState<any[]>([]);

  useEffect(() => {
    getReplays().then((response) => {
      setReplayList(response);
    });
  }, []);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/generiques"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <TitlePage
                title="Replays"
                subTitle="Vous pouvez revoir les lives précendents ici."
              ></TitlePage>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              {nextLivesDisplay(replayList)}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Replay;
