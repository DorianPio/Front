import {
  IonCol,
  IonContent,
  IonGrid,
  IonLoading,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { makeGETRequest, makePOSTRequest } from "../../request/rawRequest";
import { Comp } from "../../types/comp";
import { Video } from "../../types/video";
import "../IonColor/color.css";
import ListTheme from "../List/ListTheme";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./Competence.css";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

const getVideos = (index: number): Video[] => {
  const videos: Video[] = [];

  for (var i = 0; i < index; i++) {
    videos.push({
      name: "video n°" + i + " belong to theme n°" + index,
      id: i,
      vignette:
        "https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg",
      link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      desc: "Cupidatat amet quis duis qui non sit laboris voluptate do irure.",
      viewed: false,
    });
  }
  return videos;
};

const loadTheme = async (idComp: Array<any>): Promise<any> => {
  let themes: any = null;
  if (!idComp || idComp[0] == "") {
    return;
  }
  await makePOSTRequest("/themes", { ids: idComp }).then((response) => {
    themes = response.themes;
  });
  return themes;
};

const competences = async (): Promise<Comp[]> => {
  const competences: Comp[] = [];

  await makeGETRequest(
    "/skills?table=technology&type=" +
      localStorage.getItem("techno") +
      "&pole=" +
      localStorage.getItem("pole")
  ).then(async (response) => {
    for (let i: number = 0; i < response.skills.length; i++) {
      competences.push({
        id: response.skills[i]._id,
        name: response.skills[i].name,
        themesID: Object.is(response.skills[i].id_themes, [""])
          ? null
          : response.skills[i].id_themes,
        themes:
          (await loadTheme(response.skills[i].id_themes)) === undefined
            ? null
            : await loadTheme(response.skills[i].id_themes),
      });
    }
  });

  return competences;
};

const Competence: React.FC<ContainerProps> = ({ endpoint, pathLogo }) => {
  const validComp: boolean = false;
  const [compList, setCompList] = useState<Comp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const comptemp: Promise<Comp[]> = competences();

  useEffect(() => {
    comptemp.then((response) => {
      setCompList(response);
    });
  }, []);

  useEffect(() => {
    if (compList.length > 0) setIsLoading(false);
  }, [compList]);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/welcome"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <IonLoading isOpen={isLoading} cssClass="loading" />
              <TitlePage
                title={
                  localStorage.getItem("techno") === "boul"
                    ? "Savoirs associés"
                    : "Technologies"
                }
                subTitle=""
              ></TitlePage>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              {compList.map((comp, i) => {
                const index = i;
                return (
                  <details key={i} className="details details-theme">
                    <summary>{comp.name}</summary>
                    <ListTheme
                      key={index}
                      idComp={index}
                      comp={compList}
                      valid={validComp}
                      theme={comp.themes}
                    />
                  </details>
                );
              })}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Competence;
