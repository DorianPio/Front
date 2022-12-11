import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { play, playSkipBack, playSkipForward } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { makePOSTRequest } from "../../request/rawRequest";

import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";

import "../IonColor/color.css";
import "./Video.css";
import "../generalCSS/stylesheet.css";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

export type VideoGen = {
  _id: string;
  name: string;
  link: string;
  viewed: boolean;
  index: number;
};

const VideoGen: React.FC<ContainerProps> = ({ endpoint, pathLogo }) => {
  const params = new URLSearchParams(window.location.search);
  const theme: string = params.get("theme")!;
  const id: string = params.get("id")!;
  const [video, setVideo] = useState<VideoGen>({
    _id: "",
    name: "",
    link: "",
    viewed: false,
    index: 0,
  });
  const [otherVideos, setOtherVideos] = useState<VideoGen[]>([]);
  const [sortedOV, setSortedOV] = useState<VideoGen[]>([]);
  const idMax = useRef(0);

  const fetchVideo = async (id?: string): Promise<VideoGen> => {
    const ret: VideoGen = {
      _id: "",
      name: "",
      link: "",
      viewed: false,
      index: 0,
    };

    await makePOSTRequest("/vid", { ids: id ?? params.get("id") }).then(
      (data) => {
        ret._id = data[0]._id;
        ret.name = data[0].name;
        ret.link = data[0].link;
        ret.viewed = data[0].viewed;
        ret.index = data[0].index;
      }
    );
    return ret;
  };

  const fetchTheme = async () => {
    await makePOSTRequest("/themes", { ids: params.get("theme") }).then(
      (response) => {
        for (let i = 0; i < response.themes[0].id_videos.length; i++) {
          setOtherVideos([]);
          fetchVideo(response.themes[0].id_videos[i]).then((resp) => {
            setOtherVideos((old) => [...old, resp]);
          });
        }
        idMax.current = response.themes[0].id_videos.length - 1;
      }
    );
  };

  useEffect(() => {
    setSortedOV([...otherVideos].sort((a, b) => a.index - b.index));
  }, [otherVideos]);

  useEffect(() => {
    if (video._id === "") {
      fetchVideo().then((resp) => {
        setVideo(resp);
      });

      fetchTheme();
    }
  }, [video]);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/generiques"></Me>

          <IonRow className="ion-justify-content-center">
            <IonCol class="ion-justify-content-center" size-lg="5" size-sm="10">
              <IonRow className="ion-justify-content-left">
                <TitlePage title={video.name} subTitle=""></TitlePage>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <IonCol>
                  <video
                    controls={true}
                    controlsList="nodownload"
                    className="video"
                    src={video.link}
                  >
                    <source src={video.link} type="video/mp4" />
                  </video>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol
              className="ion-justify-content-center"
              size-lg="5"
              size-sm="10"
            >
              <IonRow className="ion-justify-content-center">
                <IonCol
                  size="3"
                  size-lg="3"
                  size-sm="3"
                  id={
                    sortedOV[0] !== undefined &&
                    params.get("id") === sortedOV[0]._id
                      ? "disabled"
                      : ""
                  }
                  onClick={() => {
                    window.location.href =
                      "videogen?theme=" +
                      theme +
                      "&id=" +
                      sortedOV[sortedOV.findIndex((v) => v._id === id) - 1]._id;
                  }}
                >
                  <div className="btn buttonVideo">
                    <IonIcon
                      className="black-text nextVideoButton live-hours-icon ion-justify-content-center"
                      icon={playSkipBack}
                    ></IonIcon>
                  </div>
                </IonCol>
                <IonCol
                  size="3"
                  size-lg="3"
                  size-sm="3"
                  id={
                    sortedOV[0] !== undefined &&
                    params.get("id") === sortedOV[sortedOV.length - 1]._id
                      ? "disabled"
                      : ""
                  }
                  onClick={() => {
                    window.location.href =
                      "videogen?theme=" +
                      theme +
                      "&id=" +
                      sortedOV[sortedOV.findIndex((v) => v._id === id) + 1]._id;
                  }}
                >
                  <div className="btn buttonVideo">
                    <IonIcon
                      className="black-text nextVideoButton live-hours-icon"
                      icon={playSkipForward}
                    ></IonIcon>
                  </div>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <div className="otherVideos fullWidth">
              {sortedOV.map((otherVideo, i) => {
                return (
                  <IonCol
                    key={i}
                    size="5"
                    size-lg="2"
                    size-sm="5"
                    className="black-text hover-underline"
                    onClick={() => {
                      window.location.href =
                        "videogen?theme=" + theme + "&id=" + sortedOV[i]._id;
                    }}
                  >
                    <IonRow className="fullWidth">
                      <IonCol
                        key={i}
                        className={
                          "otherVideo" +
                          (otherVideo.viewed ? " video-viewed" : "")
                        }
                        style={{
                          backgroundImage:
                            "url(https://randomwordgenerator.com/img/picture-generator/5ee9d1444a4faa0df7c5d57bc32f3e7b1d3ac3e45658724e742779d697_640.jpg)",
                        }}
                      >
                        <IonIcon
                          className="black-text nextVideoButton play live-hours-icon"
                          icon={play}
                          color="secondary"
                        ></IonIcon>
                      </IonCol>
                    </IonRow>
                    <IonRow className="black-text">{otherVideo.name}</IonRow>
                  </IonCol>
                );
              })}
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VideoGen;
