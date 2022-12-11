import { TextFieldTypes } from "@ionic/core";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import { useEffect, useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import {
  makeGETRequest,
  makePATCHRequest,
  makePOSTRequest,
} from "../../request/rawRequest";
import { Input } from "../../types/input";
import { Notification } from "../../types/notification";
import {
  ACCESS_KEY,
  REGION,
  S3_BUCKET,
  SECRET_ACCESS_KEY,
} from "../../variables/s3Variables";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./Account.css";

const s3Config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

interface Prop {
  pathLogo: string;
}

interface NotifProps {}

const logout = async () => {
  await makePOSTRequest("/logout").then((resp) =>
    console.log("succesfully logout !")
  );
};

const valued = async () => {
  let temp: Input[] = [];
  await makeGETRequest("/user").then((response) => {
    const InputsDefault: Input[] = [
      { name: "Nom", value: response.lastName, type: "text", change: false },
      {
        name: "Prénom",
        value: response.firstName,
        type: "text",
        change: false,
      },
      {
        name: "Téléphone",
        value: response.phoneNumber,
        type: "tel",
        change: false,
      },
      { name: "Email", value: response.email, type: "email", change: false },
    ];
    temp = InputsDefault;
  });
  return temp;
};

const GetNotification: React.FC<NotifProps> = ({}) => {
  const [notif, setNotif] = useState<Notification[]>([
    { title: "test", desc: "il y a ceci de nouveau", viewed: false },
    { title: "test", desc: "il y a ceci de nouveau", viewed: false },
    { title: "test", desc: "il y a ceci de nouveau", viewed: false },
    { title: "test", desc: "il y a ceci de nouveau", viewed: false },
  ]);
  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    const notViewed = notif.filter((n) => n.viewed === true);
    const viewed = notif.filter((n) => n.viewed === false);
    setNotif([...viewed, ...notViewed]);
    setFilter(false);
  }, [filter]);

  return (
    <>
      {notif.map((n, i) => {
        return (
          <IonCard
            key={i}
            color="tertiary"
            className="border-radius"
            onClick={(e) => {
              setNotif((old) => [
                ...old.slice(0, i),
                {
                  ...old[i],
                  viewed: true,
                },
                ...old.slice(i + 1, old.length),
              ]);
              setFilter(true);
            }}
          >
            <IonCardContent>
              <IonRow>
                <IonCol size="1" sizeLg="1" sizeSm="1" hidden={n.viewed}>
                  <IonImg
                    src="https://cdn-icons-png.flaticon.com/512/7999/7999875.png"
                    alt="alert icon"
                    className="imgPart"
                  ></IonImg>
                </IonCol>
                <IonCol>
                  <>
                    <p
                      className={
                        "bold " + (n.viewed ? " grey-text" : " black-text")
                      }
                    >
                      {n.title}
                    </p>
                    <p className={n.viewed ? " grey-text" : " black-text"}>
                      {n.desc}
                    </p>
                  </>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        );
      })}
    </>
  );
};

const Account: React.FC<Prop> = ({ pathLogo }) => {
  // const [response, setResponse] = useState<Input[]>([]);
  const [response] = useState<Input[]>([]);
  const [inputs, setInputs] = useState<Input[]>(response);
  const [file, setFile] = useState<File>();

  const fetchInfos = async () => {
    await valued().then((response) => {
      setInputs(response);
    });
  };

  const uploadToAWS = async () => {
    const s3 = new ReactS3Client({
      ...s3Config,
      dirName: `pictureFolder`,
    });

    try {
      if (file) {
        const res = await s3.uploadFile(file).then(async (response) => {
          await makePATCHRequest("/user", {
            lastName: inputs[0].value,
            firstName: inputs[1].value,
            phoneNumber: inputs[2].value,
            email: inputs[3].value,
            pictureUrl: response.location,
          }).then(() => {
            window.location.reload();
          });
        });
      }
    } catch (exception) {}
  };

  const uploadWithoutPicture = async () => {
    const profile = await makeGETRequest("/user").then(async (response) => {
      await makePATCHRequest("/user", {
        lastName: inputs[0].value,
        firstName: inputs[1].value,
        phoneNumber: inputs[2].value,
        email: inputs[3].value,
        pictureUrl: response.pictureUrl,
      }).then(() => {
        window.location.reload();
      });
    });
  };

  const handleClick = async () => {
    if (!file) {
      uploadWithoutPicture();
    } else {
      await uploadToAWS();
    }
  };

  useEffect(() => {
    fetchInfos();
  }, []);
  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn=""></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <TitlePage
                title="Bienvenue"
                subTitle="Voici vos informations sur votre compte"
              ></TitlePage>
              <IonRow>
                <IonCol>
                  <IonAccordionGroup>
                    <IonAccordion value="first">
                      <IonItem slot="header" color="light">
                        <IonLabel>Mes notifications</IonLabel>
                      </IonItem>
                      <div className="ion-padding" slot="content">
                        <GetNotification />
                      </div>
                    </IonAccordion>
                    <IonAccordion value="second">
                      <IonItem slot="header" color="light">
                        <IonLabel>Modifier mes informations</IonLabel>
                      </IonItem>
                      <div className="ion-padding" slot="content">
                        <IonList>
                          {inputs.map((input, i) => {
                            return (
                              <IonItem key={i}>
                                <IonLabel position="stacked" color="black">
                                  {input.name}
                                </IonLabel>
                                <IonInput
                                  value={input.value}
                                  type={input.type as TextFieldTypes}
                                  onKeyUp={(e) => {
                                    setInputs((old) => [
                                      ...old.slice(0, i),
                                      {
                                        ...old[i],
                                        change: true,
                                        value: (e.target as HTMLInputElement)
                                          .value!,
                                      },
                                      ...old.slice(i + 1, old.length),
                                    ]);
                                  }}
                                ></IonInput>
                              </IonItem>
                            );
                          })}
                          <IonButton>
                            <input
                              accept="image/*"
                              type="file"
                              onChange={(e) => {
                                if (e.target.files) {
                                  setFile(e.target.files[0]);
                                }
                              }}
                            ></input>
                          </IonButton>
                          <IonGrid>
                            <IonRow className="ion-justify-content-center">
                              <IonCol
                                size="12"
                                sizeSm="12"
                                sizeLg="6"
                                className="ion-justify-content-center"
                              >
                                <IonText
                                  className="btn fullWidth ion-justify-content-center flex"
                                  onClick={handleClick}
                                >
                                  Changez vos informations
                                </IonText>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonList>
                      </div>
                    </IonAccordion>
                    <IonAccordion value="third">
                      <IonItem slot="header" color="light">
                        <IonLabel>Voir mes statistiques</IonLabel>
                      </IonItem>
                      <div className="ion-padding" slot="content">
                        STATS HERE SOON
                      </div>
                    </IonAccordion>
                  </IonAccordionGroup>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol
                  size="12"
                  sizeSm="12"
                  sizeLg="6"
                  className="ion-justify-content-center"
                >
                  <IonText
                    className="btn fullWidth ion-justify-content-center flex"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                      logout();
                    }}
                  >
                    Se déconnecter
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

export default Account;
