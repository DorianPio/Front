import {
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonSplitPane,
  IonButton,
  IonIcon,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseUrl, makeGETRequest } from "../../request/rawRequest";
import { User } from "../../types/user";
import { chevronBackCircleOutline } from "ionicons/icons";

import "./Me.css";

interface Prop {
  pathLogo: string;
  pathReturn: string;
}

const getTitle = (): string => {
  const techno = localStorage.getItem("techno");

  switch (techno) {
    case "pat":
      return "Pâtisserie";
    case "boul":
      return "Boulangerie";
  }
  return "";
};

const getTechnoImg = (): string => {
  const techno = localStorage.getItem("techno");

  switch (techno) {
    case "pat":
      return "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";
    case "boul":
      return "https://images.unsplash.com/photo-1605090930904-22cdf6dc608b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
  }
  return "";
};
const getNotifLength = async (): Promise<number> => {
  await makeGETRequest("/notifications").then((res) => {
    return res.length;
  });
  return -1;
};

const Me: React.FC<Prop> = ({ pathLogo, pathReturn }) => {
  const notifNumber = useRef(0);
  const [user, setUser] = useState<User>({
    creationDate: "",
    email: "",
    firstName: "",
    lastName: "",
    level: 0,
    phoneNumber: "",
    pictureUrl: "",
    role: "",
    validated: false,
  });

  const getUserData = async () => {
    if (user.email === "") {
      const myData = await axios({
        method: "get",
        url: baseUrl + "/user",
        headers: {
          Authorization: localStorage.getItem("authToken") ?? "nullToken",
        },
      });
      setUser(myData.data);
    }
  };

  useEffect(() => {
    getNotifLength().then((res: number) => {
      notifNumber.current = res;
    });

    getUserData();
  }, [user]);

  return (
    <>
      <IonRow className="ion-justify-content-center">
        <IonCol
          size-lg="5"
          size-sm="10"
          className="ion-align-items-center flex "
        >
          <IonButton
            color="secondary"
            fill="outline"
            shape="round"
            className="white-bg"
            onClick={() => (window.location.href = pathReturn)}
            hidden={pathReturn.length <= 0}
          >
            <IonIcon
              icon={chevronBackCircleOutline}
              className="live-hours-icon"
              color="secondary"
            ></IonIcon>
            <IonText color="secondary">Retour</IonText>
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol
          size-lg="5"
          size-sm="10"
          className="background-picture"
          style={{ backgroundImage: "url(" + getTechnoImg() + ")" }}
        >
          <IonRow className="space">
            <IonCol
              size-lg="4"
              size="5"
              size-sm
              onClick={() => {
                window.location.href = "/home";
              }}
              className="ion-align-items-center flex ion-justify-content-center"
            >
              <IonRow className="ion-justify-content-center default-cursor">
                <span className="background-title">{getTitle()}</span>
              </IonRow>
            </IonCol>
            <IonCol size-lg="4" size="5" size-sm>
              <IonRow className="ion-justify-content-end">
                <IonCol
                  className="ion-justify-content-end "
                  size="8"
                  sizeMd="5"
                >
                  <IonImg
                    onClick={() => (window.location.href = "/account")}
                    className={
                      "app-logo round-avatar " +
                      (notifNumber.current > 0 ? "notif " : "")
                    }
                    src={user.pictureUrl}
                    alt="profil pic"
                  />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    </>
  );
};

export default Me;
