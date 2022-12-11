import {
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { makeGETRequest } from "../../request/rawRequest";
import { RealMarkedType } from "../../types/real";
import "../generalCSS/stylesheet.css";
import "../IonColor/color.css";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./realMarked.css";

interface ContainerProps {
  pathLogo: string;
}

const RealMarked: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [markedReal, setMarkedReal] = useState<RealMarkedType[]>([]);
  // const [markedReal, setMarkedReal] = useState<Real[]>([
  //   {
  //     desc: "Votre travail a bien été vu par nos équipe et nous en pensons que ce sont de belles photos",
  //     images: [
  //       "https://randomwordgenerator.com/img/picture-generator/54e7dd4b485bad14f1dc8460962e33791c3ad6e04e507441722978d6904ec2_640.jpg",
  //       "https://randomwordgenerator.com/img/picture-generator/54e6d4454851a814f1dc8460962e33791c3ad6e04e507440762879dc974fcd_640.jpg",
  //       "https://randomwordgenerator.com/img/picture-generator/52e9d4454352a514f1dc8460962e33791c3ad6e04e5074417d2e72d29048c6_640.jpg",
  //       "https://randomwordgenerator.com/img/picture-generator/paprika-4336024_640.jpg",
  //     ],
  //   },
  //   {
  //     desc: "Votre travail a bien été vu par nos équipe et nous en pensons que ce sont de belles photos",
  //     images: [
  //       "https://randomwordgenerator.com/img/picture-generator/54e7dd4b485bad14f1dc8460962e33791c3ad6e04e507441722978d6904ec2_640.jpg",
  //       "https://randomwordgenerator.com/img/picture-generator/54e6d4454851a814f1dc8460962e33791c3ad6e04e507440762879dc974fcd_640.jpg",
  //       "https://randomwordgenerator.com/img/picture-generator/52e9d4454352a514f1dc8460962e33791c3ad6e04e5074417d2e72d29048c6_640.jpg",
  //       "https://randomwordgenerator.com/img/picture-generator/paprika-4336024_640.jpg",
  //     ],
  //   },
  // ]);

  const fetchRealisation = async () => {
    await makeGETRequest("/realisationMarked").then((response) => {
      setMarkedReal(response);
    });
  };

  useEffect(() => {
    fetchRealisation();
  }, []);

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/generiques"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="4" size-sm="10">
              <IonRow>
                <IonCol className="ion-justify-content-center">
                  <TitlePage title="Vos Travaux notés" subTitle=""></TitlePage>
                </IonCol>
              </IonRow>
              {markedReal?.map((m, i) => {
                return (
                  <IonRow key={i} className="ion-padding-top">
                    <Carousel
                      autoPlay={false}
                      infiniteLoop={true}
                      showArrows={true}
                      showStatus={false}
                      showThumbs={false}
                      showIndicators={true}
                      emulateTouch={true}
                      swipeable={true}
                      className="input-carousel"
                    >
                      {m?.link.map((img, i) => {
                        return (
                          <img src={img} key={i} className="input-img"></img>
                        );
                      })}
                    </Carousel>
                    <IonItem color="light">
                      <IonText color="black">
                        {m?.comment} <br />
                        Note: {m?.mark}/20
                      </IonText>
                    </IonItem>
                  </IonRow>
                );
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

export default RealMarked;
