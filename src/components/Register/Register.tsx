import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { signUp } from "../../genericFunctions/signUp";
import { item, paramsSingup } from "../../types/types";
import "../IonColor/color.css";
import TechnoListButton from "../TechnoListButton/TechnoListButton";
import "./Register.css";

interface ContainerProps {
  endpoint: string;
  pathLogo: string;
}

const itemConstructor = (
  label: string,
  name: string,
  type: string,
  key: number,
  errorMsg: string
): item => {
  return {
    key: key,
    label: label,
    name: name,
    type: type,
    value: "",
    valid: false,
    errorMsg: errorMsg,
  };
};

const checkPwdValidity = (pwd: string): boolean => {
  if (
    pwd.match(/[a-z]/) &&
    pwd.match(/[A-Z]/) &&
    pwd.match(/[0-9]/) &&
    pwd.length >= 8
  )
    return true;
  return false;
};

const checkPwdConfValidity = (pwd: string, pwdConf: string): boolean => {
  if (pwd === pwdConf) return true;
  return false;
};

const Register: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [items, setItems] = useState<item[]>([
    itemConstructor("Nom", "lastName", "text", 0, ""),
    itemConstructor("Prénom", "firstName", "text", 1, ""),
    itemConstructor("Email", "email", "email", 2, ""),
    itemConstructor(
      "Téléphone",
      "phoneNumber",
      "tel",
      3,
      "Entrer un numéro de téléphone avec au moins 10 chiffres"
    ),
    itemConstructor(
      "Mot de passe",
      "password",
      "password",
      4,
      "Votre mot de passe doit contenir une majuscule, une minuscule et un chiffre pour un total de 8 caractères"
    ),
    itemConstructor(
      "Confirmer le mot de passe",
      "passwordConfirmation",
      "password",
      5,
      "Vos mots de passe ne correspondent pas"
    ),
    itemConstructor("Statut", "statut", "select", 6, ""),
    itemConstructor("Etablissement", "etablissement", "select", 7, ""),
    itemConstructor("CFA", "cfa", "select", 8, ""),
    itemConstructor("Nom du Formateur", "prof", "select", 9, ""),
    itemConstructor("Classe", "classe", "select", 10, ""),
  ]);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("none");

  const [etablissement, setEtablissement] = useState<string[]>([
    "établissement1",
    "établissement2",
    "établissement3",
    "établissement4",
  ]);
  const [CFA, setCFA] = useState<string[]>(["cfa1", "cfa2", "cfa3", "cfa4"]);
  const [profs, setProfs] = useState<string[]>([]);

  useEffect(() => {
    switch (items[8].value) {
      case "cfa1":
        setProfs([
          "formateurA_CFA1",
          "formateurB_CFA1",
          "formateurC_CFA1",
          "formateurC_CFA1",
          "formateurD_CFA1",
          "formateurE_CFA1",
        ]);
        break;
      case "cfa2":
        setProfs([
          "formateurA_CFA2",
          "formateurB_CFA2",
          "formateurC_CFA2",
          "formateurC_CFA2",
          "formateurD_CFA2",
          "formateurE_CFA2",
        ]);
        break;

      case "cfa3":
        setProfs([
          "formateurA_CFA3",
          "formateurB_CFA3",
          "formateurC_CFA3",
          "formateurC_CFA3",
          "formateurD_CFA3",
          "formateurE_CFA3",
        ]);
        break;

      case "cfa4":
        setProfs([
          "formateurA_CFA4",
          "formateurB_CFA4",
          "formateurC_CFA4",
          "formateurC_CFA4",
          "formateurD_CFA4",
          "formateurE_CFA4",
        ]);
        break;

      default:
        break;
    }
  }, [items]);

  const handleRegister = async () => {
    items.forEach((item, i) => handleChange(item, item.value, i));
    if (items.some((i) => i.valid === false)) return;
    const params: paramsSingup = {
      lastName: items[0].value,
      firstName: items[1].value,
      email: items[2].value,
      phoneNumber: items[3].value,
      password: items[4].value,
      etablissement: items[7].value,
      cap: items[8].value,
      formateur: items[9].value,
      classe: items[10].value,
    };
    await signUp(params, setMessage);
    if (message !== "none") {
      setShowToast(true);
    }
  };

  const handleChange = (item: item, value: string, index: number) => {
    let isValid = false;
    isValid = value.length >= 1;
    if (item.name === "password") {
      isValid = checkPwdValidity(value);
    } else if (item.name === "passwordConfirmation") {
      isValid = checkPwdConfValidity(
        value,
        items.filter((i) => i.name === "password")[0].value
      );
    } else if (item.name === "phoneNumber") {
      isValid = !(value.length < 10);
    }
    setItems((old) => [
      ...old.slice(0, index),
      { ...old[index], value: value, valid: isValid },
      ...old.slice(index + 1, old.length),
    ]);
  };

  return (
    <IonPage className="register">
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

      {/* Display REGISTER */}
      <IonContent color="primary">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <IonRow className="ion-justify-content-center">
                <IonCol size-lg="3" size="6" size-sm>
                  <IonImg
                    src={pathLogo}
                    alt="loginImage"
                    className="loginImg"
                  />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="5" size-sm="10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                <IonRow className="ion-justify-content-center">
                  <IonText color="black" className="ion-text-center">
                    <h1>Connexion</h1>
                    <h5>Veuillez entrer vos informations</h5>
                  </IonText>
                </IonRow>
                {items.map(function (item, i) {
                  if (item.name === "statut")
                    return (
                      <IonItem color="transparent" key={i}>
                        <IonLabel color="black" position="floating">
                          {items[i].label}
                        </IonLabel>
                        <IonSelect
                          aria-required="true"
                          interface="popover"
                          onIonChange={(e) => {
                            setItems((old) => [
                              ...old.slice(0, i),
                              { ...old[i], value: e.detail.value },
                              ...old.slice(i + 1, old.length),
                            ]);
                          }}
                        >
                          <IonSelectOption value="eleve">Elève</IonSelectOption>
                          <IonSelectOption value="enseignant">
                            Enseignant
                          </IonSelectOption>
                          <IonSelectOption value="autre">Autre</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    );
                  else if (item.name === "etablissement")
                    return (
                      <IonItem
                        color="transparent"
                        key={i}
                        hidden={!(items[6].value === "eleve")}
                      >
                        <IonLabel color="black" position="floating">
                          {items[i].label}
                        </IonLabel>
                        <IonSelect
                          aria-required="true"
                          interface="popover"
                          onIonChange={(e) => {
                            setItems((old) => [
                              ...old.slice(0, i),
                              { ...old[i], value: e.detail.value },
                              ...old.slice(i + 1, old.length),
                            ]);
                          }}
                        >
                          {etablissement.map((e, i) => {
                            return (
                              <IonSelectOption value={e} key={i}>
                                {e}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      </IonItem>
                    );
                  else if (item.name === "cfa")
                    return (
                      <IonItem
                        color="transparent"
                        key={i}
                        hidden={!(items[6].value === "eleve")}
                      >
                        <IonLabel color="black" position="floating">
                          {items[i].label}
                        </IonLabel>
                        <IonSelect
                          aria-required="true"
                          interface="popover"
                          onIonChange={(e) => {
                            setItems((old) => [
                              ...old.slice(0, i),
                              { ...old[i], value: e.detail.value },
                              ...old.slice(i + 1, old.length),
                            ]);
                          }}
                        >
                          {CFA.map((c, i) => {
                            return (
                              <IonSelectOption value={c} key={i}>
                                {c}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      </IonItem>
                    );
                  else if (item.name === "prof")
                    return (
                      <IonItem
                        color="transparent"
                        key={i}
                        hidden={!(items[6].value === "eleve")}
                      >
                        <IonLabel color="black" position="floating">
                          {items[i].label}
                        </IonLabel>
                        <IonSelect
                          aria-required="true"
                          interface="popover"
                          onIonChange={(e) => {
                            setItems((old) => [
                              ...old.slice(0, i),
                              { ...old[i], value: e.detail.value },
                              ...old.slice(i + 1, old.length),
                            ]);
                          }}
                        >
                          {profs.map((p, i) => {
                            return (
                              <IonSelectOption value={p} key={i}>
                                {p}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      </IonItem>
                    );
                  return (
                    <IonItem
                      color="transparent"
                      key={i}
                      className={item.valid ? "ion-valid" : "ion-invalid"}
                      hidden={
                        !(items[6].value === "eleve") && item.name === "classe"
                      }
                    >
                      <IonLabel color="black" position="floating">
                        {item.label}
                      </IonLabel>
                      <IonInput
                        className="border-bottom"
                        name={item.name}
                        type={item.type}
                        value={item.value}
                        onKeyUp={(e) => {
                          handleChange(
                            item,
                            (e.target as HTMLInputElement).value!,
                            i
                          );
                        }}
                        // onIonChange={(e) => (item.value = e.detail.value!)}
                        required
                      ></IonInput>
                      <IonNote slot="error">{item.errorMsg}</IonNote>
                    </IonItem>
                  );
                })}

                <IonRow>
                  <IonItem color="transparent"></IonItem>
                </IonRow>

                <IonRow className="ion-justify-content-center">
                  <IonCol size="12" size-sm="12" size-lg="6">
                    <IonItem color="transparent">
                      <button
                        color="transparent"
                        type="submit"
                        className="btn btn-shade bold"
                      >
                        Créez votre compte
                      </button>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" size-sm="12" size-lg="6">
                    <IonItem color="transparent">
                      <button
                        className="btn btn-login"
                        onClick={() => {
                          window.location.href = "/login";
                        }}
                      >
                        Déjà un compte
                      </button>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <TechnoListButton />
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
