import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonToast,
} from "@ionic/react";
import { SetStateAction, useState } from "react";
import { makePATCHRequest, makePOSTRequest } from "../../request/rawRequest";
import "../generalCSS/stylesheet.css";
import "../IonColor/color.css";
import TechnoListButton from "../TechnoListButton/TechnoListButton";
import "./Login.css";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

const Login: React.FC<ContainerProps> = ({ endpoint, pathLogo }) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const signIn = async () => {
    await makePOSTRequest("/login", { email: email, password: password })
      .then(async (response) => {
        localStorage.setItem("authToken", response.authToken);
        await makePATCHRequest("/pole?pole=" + localStorage.getItem("techno"))
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            localStorage.removeItem("authToken");
          });
      })
      .catch((error) => {
        console.error(error.response.status);
        const errorDisplay: SetStateAction<string> = error.response.data.error;
        setMessage(errorDisplay);
        setShowToast(true);
      });
  };

  return (
    <IonPage>
      {/* Displaying error on login */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        position="middle"
        color="danger"
        duration={5000}
        buttons={[
          {
            icon: "close",
            role: "Fermer",
            handler: () => {},
          },
        ]}
      />
      {/* End of dislplaying error on login */}

      {/* Display LOGIN */}
      <IonContent color="primary" className="">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <IonRow className="ion-justify-content-center">
                <IonCol size-lg="3" size="6" size-sm>
                  <IonImg src={pathLogo} alt="loginImage" className="loginImg"/>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <form>
                <IonRow className="ion-justify-content-center">
                  <IonText color="black" className="ion-text-center">
                    <h1>Connexion</h1>
                    <h5>Veuillez entrer vos informations</h5>
                  </IonText>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" size-sm="12" size-lg="8">
                    <IonItem color="transparent">
                      <IonLabel color="black" position="floating">
                        Email
                      </IonLabel>
                      <IonInput
                        name="email"
                        type="email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                        required
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" size-sm="12" size-lg="8">
                    <IonItem color="transparent">
                      <IonLabel color="black" position="floating">
                        Mot De Passe
                      </IonLabel>
                      <IonInput
                        name="password"
                        type="password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        required
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </form>

              <IonRow className="ion-justify-content-center">
                <IonCol size="12" size-sm="12" size-lg="6">
                  <IonItem color="transparent">
                    <IonText
                      className="btn btn-shade"
                      onClick={() => (window.location.href = "register")}
                    >
                      Pas encore de compte ?
                    </IonText>
                  </IonItem>
                </IonCol>
                <IonCol size="12" size-sm="12" size-lg="6">
                  <IonItem color="transparent">
                    <IonText class="btn btn-login" onClick={(e) => signIn()}>
                      Se Connecter
                    </IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonItem color="transparent">
                  <IonText color="black" onClick={() => function () {}}>
                    <h6 className="italic thin hover-underline default-cursor">
                      Mot de passe oublié ?
                    </h6>
                  </IonText>
                </IonItem>
              </IonRow>
              <TechnoListButton />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
