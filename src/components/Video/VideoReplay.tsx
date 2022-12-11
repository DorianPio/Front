import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { makeGETRequest } from "../../request/rawRequest";
import "../IonColor/color.css";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./Video.css";

interface ContainerProps {
  pathLogo: string;
}

type VideoTest = {
  link: string;
  titre: string;
};

const VideoReplay: React.FC<ContainerProps> = ({ pathLogo }) => {
  const params = new URLSearchParams(window.location.search);
  let video: VideoTest = {
    link: "",
    titre: "",
  };

  const fetchVideo = async () => {
    await makeGETRequest("/eventbyId?id=" + params.get("id")).then(
      (response) => {
        video.link = response.link;
        video.titre = response.titre;
        // setVideo(response);
      }
    );
  };

  useEffect(() => {
    fetchVideo();
  }, []);
  // const video = {
  //   name: "This video is about something intresting 0",
  //   vignette: "./assets/cardImage/image-0.jpg",
  //   id: 0,
  //   link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  //   desc: "",
  //   viewed: true,
  // };
  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/generiques"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol class="ion-justify-content-center" size-lg="5" size-sm="10">
              <TitlePage title={video.titre} subTitle=""></TitlePage>
              <IonRow class="ion-justify-content-center">
                <IonCol class="video-container">
                  <iframe
                    src={video.link}
                    title="The Hardest Trip - Mandelbrot Fractal Zoom"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VideoReplay;
