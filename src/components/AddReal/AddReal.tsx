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
import ReactS3Client from "react-aws-s3-typescript";
import { Carousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import { makeGETRequest, makePOSTRequest } from "../../request/rawRequest";
import {
  ACCESS_KEY,
  REGION,
  S3_BUCKET,
  SECRET_ACCESS_KEY,
} from "../../variables/s3Variables";
import "../generalCSS/stylesheet.css";
import "../IonColor/color.css";
import Me from "../Me/Me";
import TitlePage from "../TitlePage/TitlePage";
import "./AddReal.css";
// import { uploadFile } from "react-s3";
// import * as s3react from 'react-s3'
interface ContainerProps {
  pathLogo: string;
}

const s3Config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};
//SEE CONNECT TO AWS, FORBIDDEN ACCESS DENIED
// see the link: https://javascript.plainenglish.io/how-to-upload-files-to-aws-s3-in-react-591e533d615e

const AddReal: React.FC<ContainerProps> = ({ pathLogo }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const imagesLoad: any[] = [];
    const fileReaders = [];

    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReaders.push(fileReader);
      fileReader.onload = (e) => {
        const { result } = e.target!;
        if (result) {
          imagesLoad.push(result);
        }
        if (imagesLoad.length === files.length) {
          setImages([...imagesLoad]);
        }
      };
      fileReader.readAsDataURL(file);
    });
  }, [files]);

  const uploadToS3Bucket = async (files: File[]) => {
    let username: string = "";
    await makeGETRequest("/user").then((response) => {
      username = response.email;
    });

    const linkArray: Array<string> = [];
    const uuid = uuidv4();
    const s3 = new ReactS3Client({
      ...s3Config,
      dirName: `${username}/${uuid}`,
    });

    for (const file of files) {
      try {
        const res = await s3.uploadFile(file);
        linkArray.push(res.location);
      } catch (exception) {
      }
    }
    await makePOSTRequest("/realisation", {
      links: linkArray,
      uuid: uuid,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <IonPage>
      <IonContent color="primary">
        <IonGrid>
          <Me pathLogo={pathLogo} pathReturn="/generiques"></Me>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="4" size-sm="10">
              <TitlePage
                title="Ajoutez une réalisation"
                subTitle="Vous pouvez ajouter une réalisation qui sera vu par nos équipes"
              ></TitlePage>
              <IonRow className="ion-justify-content-center">
                <IonText color="black" className="ion-text-start">
                  Ajoutez plusieurs photos de votre réalisations. Vous pouvez en
                  ajouter jusqu'à 4.
                </IonText>
                <div className="empty-item"></div>
                <div className="input-container btn btn-shade">
                  <span className="input-file-button">
                    Selectionner vos photos
                  </span>
                  <input
                    className="input-file-hide"
                    type="file"
                    id="upload_input"
                    name="upload"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFiles((oldFiles) => {
                          const tempfiles = [e.target.files![0], ...oldFiles];

                          if (tempfiles.length > 4)
                            return tempfiles.splice(0, 4);
                          return tempfiles;
                        });
                      }
                    }}
                  />
                </div>
                <div
                  className="input-send btn"
                  onClick={() => uploadToS3Bucket(files)}
                >
                  Envoyer
                </div>
                <div className="empty-item"></div>
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
                  {images.map((img, i) => {
                    return (
                      <img
                        src={img}
                        key={i}
                        className="input-img"
                        alt={"realisations n°" + i}
                      ></img>
                    );
                  })}
                </Carousel>
              </IonRow>
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

export default AddReal;
