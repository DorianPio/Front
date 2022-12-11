import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { months, nextLivesConst } from "./variables";

import { peopleOutline, timeOutline } from "ionicons/icons";

import "../generalCSS/stylesheet.css";
import "./NextLives.css";
import { Live } from "../../types/live";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import { useEffect, useState } from "react";
import { makeGETRequest } from "../../request/rawRequest";
import { dateEvent, getDate, getDateObject } from "../../genericFunctions/date";

interface ContainerProps {
  pathLogo: string;
}

/**
 * return 1 if @param a is higher than @param b, if egal 0, else -1
 */
const compareLivesDate = (a: Live, b: Live): number => {
  if (a.date.year < b.date.year) return 1;
  if (a.date.year > b.date.year) return -1;

  if (a.date.month < b.date.month) return 1;
  if (a.date.month > b.date.month) return -1;

  if (a.date.day < b.date.day) return 1;
  if (a.date.day > b.date.day) return -1;

  if (a.date.hoursStart < b.date.hoursStart) return 1;
  if (a.date.hoursStart > b.date.hoursStart) return -1;

  if (a.date.minutesStart < b.date.minutesStart) return 1;
  if (a.date.minutesStart > b.date.minutesStart) return -1;

  if (a.date.hoursEnd < b.date.hoursEnd) return 1;
  if (a.date.hoursEnd > b.date.hoursEnd) return -1;

  if (a.date.minutesEnd < b.date.minutesEnd) return 1;
  if (a.date.minutesEnd > b.date.minutesEnd) return -1;

  return 0;
};

const orderLives = (nextLives: Live[]): Live[] => {
  var orderedLives: Live[] = [];
  var isInsered = false;

  for (var i = 0; i < nextLives.length; i++) {
    isInsered = false;

    for (var j = 0; j < orderedLives.length && !isInsered; j++) {
      if (compareLivesDate(orderedLives[j], nextLives[i]) <= -1) {
        orderedLives.splice(j, 0, nextLives[i]);
        isInsered = true;
      }
    }

    if (!isInsered) {
      orderedLives.push(nextLives[i]);
    }
  }

  return orderedLives;
};

const nextLivesDisplay = (live: Live[]) => {
  const nextLivesConstOrder = orderLives(live);

  return (
    <IonRow>
      <IonCol className="border-radius">
        {nextLivesConstOrder.map((live, i) => {
          return (
            <IonCard
              key={i}
              href={live.link}
              color="tertiary"
              className="card border-radius card-live"
            >
              <IonCardContent>
                <IonRow className="live-row">
                  <IonCol>
                    <IonRow>
                      <p className="live-title black-text bold">{live.titre}</p>
                    </IonRow>
                    <IonRow>
                      <p className="live-host">par {live.host}</p>
                    </IonRow>
                  </IonCol>
                  <IonCol
                    size="3"
                    size-lg="2"
                    size-sm="3"
                    class="day-number-container"
                  >
                    <IonRow className="ion-justify-content-center bold day-number">
                      {live.date.day}
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      {months[live.date.month]}
                    </IonRow>
                  </IonCol>
                </IonRow>
                <IonRow className="live-row">
                  <IonCol size="12" size-lg="12">
                    <IonItem className="item-live">
                      <IonIcon
                        icon={timeOutline}
                        className="live-hours-icon"
                      ></IonIcon>
                      {live.date.hoursStart}h{live.date.minutesStart}-
                      {live.date.hoursEnd}h{live.date.minutesEnd}
                    </IonItem>
                    <IonItem className="item-live">
                      <p>{live.subject}</p>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow className="live-row">
                  <IonItem className="item-live">
                    <IonIcon
                      icon={peopleOutline}
                      className="live-hours-icon"
                    ></IonIcon>
                    Il y a {live.participants} participants.
                  </IonItem>
                </IonRow>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonCol>
    </IonRow>
  );
};

const NextLives: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [live, setLive] = useState<Live[]>([]);

  const fetchLive = async () => {
    let livetmp: Live;
    let tmp: Live[] = [];
    await makeGETRequest("/event?type=live").then((response) => {
      for (let i = 0; i < response.length; i++) {
        let startDate: dateEvent = getDateObject(response[i].date);
        let endDate: dateEvent = getDateObject(response[i].endDate);
        livetmp = {
          titre: response[i].titre,
          host: response[i].host,
          subject: response[i].subject,
          link: response[i].link,
          participants: response[i].participants,
          date: {
            day: startDate.day,
            dayDisplay: startDate.day,
            month: startDate.month,
            year: startDate.year,
            hoursStart: startDate.hour,
            minutesStart: startDate.minute,
            hoursEnd: endDate.hour,
            minutesEnd: endDate.minute,
          },
        };
        tmp.push(livetmp);
      }
      setLive(tmp);
    });
  };

  useEffect(() => {
    fetchLive();
  }, []);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/generiques"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <TitlePage
                title="Lives"
                subTitle="Afin d'améliorer votre apprentissage vous pourrez participer à
            des cours en direct proposé par nos experts"
              ></TitlePage>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              {nextLivesDisplay(live)}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NextLives;
