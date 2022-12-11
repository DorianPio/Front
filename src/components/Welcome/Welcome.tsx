import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { Part } from "../../types/part";
import { Pole } from "../../types/pole";
import "../generalCSS/stylesheet.css";
import "../IonColor/color.css";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./Welcome.css";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

const pole = (index: number) => {
  const href: string = index === 0 ? "competences" : "generiques";
  const poles: Pole[] =
    localStorage.getItem("techno") === "boul"
      ? index === 0
        ? [
            { title: "S1", value: 1 },
            { title: "S2", value: 2 },
            { title: "S3", value: 3 },
          ]
        : [{ title: "Acceder à la pratique", value: 1 }]
      : [
          { title: "Pôle 1", value: 1 },
          { title: "Pôle 2", value: 2 },
        ];

  return (
    <IonRow className="fullWidth ion-text-center pole ion-justify-content-center">
      {poles.map((p, i, arr) => {
        return (
          <IonCol
            key={i}
            size-lg={(1 / arr.length) * 12}
            size={((1 / arr.length) * 12).toString()}
            size-sm={(1 / arr.length) * 12}
            id={p.value > 1 ? "disabled" : ""}
            className="ion-justify-content-center"
          >
            <IonRow className="ion-justify-content-center">
              <IonCol
                onClick={() => {
                  localStorage.setItem("pole", p.value.toString());
                  window.location.href = href;
                }}
                className="btn fullWidth"
                size-sm="11"
                size="11"
                size-lg="11"
              >
                {p.title}
              </IonCol>
            </IonRow>
          </IonCol>
        );
      })}
    </IonRow>
  );
};

const Welcome: React.FC<ContainerProps> = ({ pathLogo }) => {
  const items: Part[] = [
    {
      id: "pat",
      title: "Technologie",
      subtitle: "Cliquez ici pour accèder à la partie technologie",
      icon: "assets/logo/touch.png",
    },
    {
      id: "pat",
      title: "Pratique",
      subtitle: "Cliquez ici pour accèder à la partie pratique",
      icon: "assets/logo/pencil.png",
    },
    {
      id: "pat",
      title: "PSE",
      subtitle: "Cliquez ici pour accèder à la partie PSE",
      icon: "assets/logo/marking.png",
      href: "pse",
    },
    {
      id: "pat",
      title: "Livre de Synthèse",
      subtitle: "Cliquez ici pour accèder au livre de synthèse",
      icon: "assets/logo/synthesis.png",
      href: "book/?type=synthese",
    },
    {
      id: "pat",
      title: "Livre de Technologie",
      subtitle: "Cliquez ici pour accèder au livre de technologie",
      icon: "assets/logo/techno.png",
      href: "book/?type=technologie",
    },
    {
      id: "boul",
      title: "Savoirs associés",
      subtitle: "Cliquez ici pour accèder à la partie Savoirs associés",
      icon: "assets/logo/touch.png",
    },
    {
      id: "boul",
      title: "Pratique",
      subtitle: "Cliquez ici pour accèder à la partie pratique",
      icon: "assets/logo/pencil.png",
    },
    {
      id: "boul",
      title: "PSE",
      subtitle: "Cliquez ici pour accèder à la partie PSE",
      icon: "assets/logo/marking.png",
      href: "pse",
    },
    {
      id: "boul",
      title: "livre de Sciences appliquées",
      subtitle: "Cliquez ici pour accèder au livre de sciences appliquées",
      icon: "assets/logo/marking.png",
      href: "book/?type=sciencesappliquees",
    },
    {
      id: "boul",
      title: "livre de Gestions appliquées",
      subtitle: "Cliquez ici pour accèder au livre de gestions appliquées",
      icon: "assets/logo/marking.png",
      href: "book/?type=gestionsappliquees",
    },
    {
      id: "boul",
      title: "livre de Synthèse",
      subtitle: "Cliquez ici pour accèder au livre de synthèse",
      icon: "assets/logo/marking.png",
      href: "book/?type=synthese",
    },
    {
      id: "boul",
      title: "livre de Technologie",
      subtitle: "Cliquez ici pour accèder au livre de technologie",
      icon: "assets/logo/marking.png",
      href: "book/?type=technologie",
    },
  ];

  const [displayPole, setDisplayPole] = useState<boolean[]>([false, false]);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn=""></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="4" size-sm="10">
              <TitlePage
                title="Cours"
                subTitle="
                  Développez l'ensemble de vos compérences en suivant nos cours
                  de formations !"
              ></TitlePage>
              {items.map((item, i) => {
                if (item.id === localStorage.getItem("techno")) {
                  let index = i;
                  if (index === 5) {
                    index = 0;
                  } else if (index === 6) {
                    index = 1;
                  }

                  return (
                    <IonRow key={i} id={i > 1 ? "disabled" : ""}>
                      <IonCol>
                        <IonRow
                          className="ion-justify-content-center part hoverable"
                          onClick={() => {
                            if (item.href) {
                              window.location.href = item.href;
                            } else {
                              if (index < 2) {
                                displayPole[index === 1 ? 0 : 1] = false;
                                displayPole[index] = !displayPole[index];
                                setDisplayPole([
                                  displayPole[0],
                                  displayPole[1],
                                ]);
                              }
                            }
                          }}
                        >
                          <IonCol size-lg="1" size="3" size-sm="2">
                            <IonImg
                              src={item.icon}
                              alt="loginImage"
                              className="imgPart"
                            />
                          </IonCol>
                          <IonCol>
                            <IonText
                              color="black"
                              className="ion-text-start txtPart"
                            >
                              <h1 className="bold">{item.title}</h1>
                              {item.subtitle}
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                      {index < 2 ? (displayPole[index] ? pole(index) : "") : ""}
                    </IonRow>
                  );
                }
                return "";
              })}
              <IonRow>
                <IonItem color="transparent"></IonItem>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
