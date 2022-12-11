import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { makeGETRequest, makePOSTRequest } from "../../request/rawRequest";
import { Comp } from "../../types/comp";
import "../generalCSS/stylesheet.css";
import "../IonColor/color.css";
import ListTheme from "../List/ListTheme";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import { td } from "./td";
import { tp } from "./tp";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

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
    "/skills?table=generic&type=" +
      sessionStorage.getItem("typeOfWork") +
      "&pole=" +
      sessionStorage.getItem("pole")
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

const Generique: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [compList, setCompList] = useState<Comp[]>([]);
  const comptemp: Promise<Comp[]> = competences();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          <IonLoading isOpen={isLoading} cssClass="loading" />
          <TitlePage title="Pratique" subTitle="" />
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
                      valid={false}
                      theme={comp.themes}
                      generique={true}
                    />
                  </details>
                );
              })}
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              {tp()}
              {td()}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Generique;
