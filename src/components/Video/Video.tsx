import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { makePATCHRequest, makePOSTRequest } from "../../request/rawRequest";
import "../IonColor/color.css";
import Me from "../Me/Me";
import QCM from "../Quiz/QCM";
import TitlePage from "../TitlePage/TitlePage";
import "./Video.css";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

const setVideoViewed = async (id: any) => {
  await makePATCHRequest("/vid?id_video=" + id);
};

export type QuizzBack = {
  awnser: Array<string>;
  question: string;
  valide: Array<string>;
};

export type VideoBackType = {
  _id: string;
  name: string;
  link: string;
  viewed: boolean;
  quizz: Array<QuizzBack>;
};

const defaultType: VideoBackType = {
  _id: "",
  name: "",
  link: "",
  viewed: false,
  quizz: [],
};

const VideoDisplay: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [videoEnd, setVideoEnded] = useState<boolean>(false);
  const [videoLists, setvideoList] = useState<VideoBackType>(defaultType);
  const urlParams = new URLSearchParams(window.location.search);
  let videoList: VideoBackType = defaultType;

  const fetchVideo = async () => {
    await makePOSTRequest("/vid", { ids: urlParams.get("id") }).then((data) => {
      const test: VideoBackType = {
        _id: data[0]._id,
        name: data[0].name,
        link: data[0].link,
        viewed: data[0].viewed,
        quizz: data[0].quizz,
      };
      videoList = test;
      setvideoList(videoList);
    });
  };

  useEffect(() => {
    if (videoLists._id === "") {
      fetchVideo();
    }
    setVideoEnded(videoLists.viewed);
  }, [videoLists]);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/competences" />
          <IonRow className="ion-justify-content-center">
            <IonCol class="ion-justify-content-center" size-lg="5" size-sm="10">
              <TitlePage title={videoLists.name} subTitle=""></TitlePage>
              <IonRow class="ion-justify-content-center">
                <IonCol>
                  <video
                    autoPlay={true}
                    controls={true}
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    onEnded={() => {
                      setVideoEnded(true);
                      setVideoViewed(videoLists._id);
                    }}
                    controlsList="nodownload"
                    className="video"
                    src={videoLists.link}
                  >
                    <source src={videoLists.link} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-left">
                <IonText>
                  <p className="video-title bold">Quizz</p>
                </IonText>
              </IonRow>
              <QCM videoQuizz={videoLists} videoEnded={videoEnd} />
              <IonRow className="ion-justify-content-left">
                <IonText>
                  <p className="video-title bold">Réf Livre</p>
                </IonText>
              </IonRow>
              <IonRow>
                <IonCol size-lg="12" size-sm="12">
                  <IonText>
                    <p className="black-text">
                      Pour en savoir plus, cliquez ici
                    </p>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-lg="12" size-sm="12">
                  <IonText>
                    <p className="bold hover-underline response-button">Lire</p>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VideoDisplay;
