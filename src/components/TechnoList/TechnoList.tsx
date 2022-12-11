import {
  IonContent,
  IonPage,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import "./TechnoList.css";
import "../generalCSS/stylesheet.css";
import "../IonColor/color.css";
import { Techno } from "../../types/techno";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

const Register: React.FC<ContainerProps> = ({ endpoint, pathLogo }) => {
  const technosActive: Techno[] = [
    {
      name: "Pâtisserie",
      url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      active: true,
      href: "pat",
    },
    {
      name: "Boulangerie",
      url: "https://images.unsplash.com/photo-1605090930904-22cdf6dc608b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      active: true,
      href: "boul",
    },
  ];

  const technosDisable: Techno[] = [
    {
      name: "Charcuterie",
      url: "https://randomwordgenerator.com/img/picture-generator/gcc49c4df57f096dbc5fc4d59c9d9e8a62cddbcb14adaac85608e418c6fd6579e5526e396fd5a2bb1669fb38d790e2406_640.jpg",
      active: false,
      href: "",
    },
    {
      name: "Primeur",
      url: "https://randomwordgenerator.com/img/picture-generator/57e2d54a4c5bad14f1dc8460962e33791c3ad6e04e507440742f7cd7914dc7_640.jpg",
      active: false,
      href: "",
    },
    {
      name: "Chocolat",
      url: "https://randomwordgenerator.com/img/picture-generator/57e5d1464f53a414f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg",
      active: false,
      href: "",
    },
    {
      name: "Cuisine",
      url: "https://randomwordgenerator.com/img/picture-generator/55e7d7464b55a914f1dc8460962e33791c3ad6e04e507440762e7adc9e45c3_640.jpg",
      active: false,
      href: "",
    },
  ];

  return (
    <IonPage className="register">
      <IonContent color="primary">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <IonRow className="ion-justify-content-center">
                <IonCol size-lg="3" size="6" size-sm>
                  <IonImg src={pathLogo} alt="loginImage" className="loginImg" />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol id="technoList" size-lg="5" size-sm="10">
              {displayTitle()}
              {displayTechnoActive(technosActive)}
              {displaySeparator()}
              {displayTechnoDisabled(technosDisable)}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const displayTitle = () => {
  return (
    <IonRow className="ion-justify-content-center">
      <IonCol size-sm="12" size-lg="7">
        <IonText color="black" className="ion-text-start">
          <h1 className="bold uppercase">Bienvenue</h1>
          <h5 className="bold">Quel Module voulez-vous étudier ?</h5>
        </IonText>
      </IonCol>
    </IonRow>
  );
};

const displayTechnoActive = (arr: Techno[]) => {
  return arr.map(function (techno, i) {
    return (
      <IonRow className="ion-justify-content-center" key={i}>
        <IonCol
          size-sm="12"
          size-lg="7"
          className={"techno-item techno-active " + (i === 1 ? "last " : "")}
          style={{ backgroundImage: "url(" + techno.url + ")" }}
          onClick={function () {
            localStorage.setItem("techno", techno.href);
            window.location.href = "/login";
          }}
        >
          <IonRow className="ion-justify-content-start vertical-align">
            <IonText color="white">
              <h4 className="techno-name uppercase">{techno.name}</h4>
            </IonText>
          </IonRow>
        </IonCol>
      </IonRow>
    );
  });
};

const displayTechnoDisabled = (arr: Techno[]) => {
  return arr.map(function (techno, i) {
    return (
      <IonRow className="ion-justify-content-center" key={i}>
        <IonCol
          size-sm="12"
          size-lg="7"
          className="techno-item techno-disable"
          style={{ backgroundImage: "url(" + techno.url + ")" }}
        >
          <IonRow className="ion-justify-content-start vertical-align">
            <IonText color="white">
              <h4 className="techno-name uppercase">{techno.name}</h4>
            </IonText>
          </IonRow>
        </IonCol>
      </IonRow>
    );
  });
};

const displaySeparator = () => {
  return (
    <IonRow className="ion-justify-content-center">
      <IonCol size-sm="12" size-lg="7">
        <IonText color="black" className="ion-text-start">
          <h5 className="bold">À venir ...</h5>
        </IonText>
      </IonCol>
    </IonRow>
  );
};

export default Register;
