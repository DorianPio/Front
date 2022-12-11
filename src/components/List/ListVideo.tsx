import {
  IonCard,
  IonCardContent,
  IonCol,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { makePOSTRequest } from "../../request/rawRequest";
import { Theme } from "../../types/theme";
import { Video } from "../../types/video";

import "../generalCSS/stylesheet.css";
import "./List.css";
interface ContainerProps {
  idTheme: number;
  themes: Theme[];
  generique: boolean;
  id_videos: Array<any>;
}

const getVideosByTheme = async (id_videos: any) => {
  let vids: any = [];
  await makePOSTRequest("/vid", { ids: id_videos }).then((data) => {
    vids = data;
  });
  // WHERE TRUE ?
  return vids;
};

const videoCard = (video: any, idTheme: number, id: any, href: string) => {
  return (
    <IonCard
      key={id}
      href={href + "?theme=" + idTheme + "&id=" + video._id}
      color="tertiary"
      className="card card-theme"
    >
      <IonCardContent
        className={
          "card-content card-content-theme " +
          (video.viewed && video.viewed === true ? "video-viewed" : "")
        }
      >
        <IonRow>
          <IonCol size-lg="3" size-sm="12" size="12">
            <IonImg
              src={video.pictureUrl}
              className="element-card-image"
              alt="defaultCard"
            />
          </IonCol>
          <IonCol>
            <IonText className="element-card-text">
              <p className="card-title">{video.name}</p>
              <p className="card-desc">{video.desc}</p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

const viewedVideos = (videoList: Video[], idTheme: number) => {
  if (!videoList || videoList.length <= 0) return;
  return (
    <details>
      <summary>Vidéos vues</summary>
      {videoList.map((video, i) => {
        return videoCard(video, idTheme, i, "videogen");
      })}
    </details>
  );
};

const ListVideo: React.FC<ContainerProps> = ({
  idTheme,
  themes,
  generique,
  id_videos,
}) => {
  const [videoLists, setvideoList] = useState<any[]>([]);
  useEffect(() => {
    const videos = getVideosByTheme(id_videos);
    videos.then((data) => {
      let vids: any = [];
      for (let i = 0; i < data.length; i++) {
        vids.push(data[i]);
      }
      setvideoList(vids);
    });
  }, []);

  const videoList: any[] = videoLists;
  const videoListViewed: Video[] = videoList.filter(
    (video) => video.viewed === true
  );
  const videoListNoViewed: any[] = videoList.filter(
    (video) => video.viewed === false
  );
  return (
    <IonRow>
      <IonCol size="12" size-sm="12" size-lg="12">
        {generique ? viewedVideos(videoListViewed!, idTheme) : ""}
        {generique
          ? videoListNoViewed.map((video, i) => {
              return videoCard(video, idTheme, video._id, "videogen");
            })
          : videoList.map((video, i) => {
              return videoCard(video, idTheme, video._id, "video");
            })}
      </IonCol>
    </IonRow>
  );
};

export default ListVideo;
