import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { baseUrl } from "../../request/rawRequest";
import { Quizz, Responses, VideoQuizz } from "../../types/video";
import { video } from "../Video/Quizz";
import { QuizzBack, VideoBackType } from "../Video/Video";

interface Props {
  videoQuizz: VideoBackType;
  videoEnded: boolean;
}

const getSentenceByScore = (score: number) => {
  let response = " ";
  if (score <= 0.5) response += "Révisez grâce au lien du livre ci-dessous.";
  else response += "Vous avez validé ce thème ! Bravo !";
  return <IonText>{response}</IonText>;
};

const quizzConvert = (videoQuizz: Array<QuizzBack>, id: string): Quizz[] => {
  const quizz: Quizz[] = [];

  for (let i = 0; i < videoQuizz.length; i++) {
    let responsesArray: Responses[] = [];
    for (let j = 0; j < videoQuizz[i].awnser.length; j++) {
      let tmpResponse: Responses = {
        title: videoQuizz[i].awnser[j],
        checked: false,
      };
      responsesArray.push(tmpResponse);
    }
    let tmpQuizz: Quizz = {
      id_quizz: id,
      question: videoQuizz[i].question,
      responses: responsesArray,
      correction: videoQuizz[i].valide,
    };
    quizz.push(tmpQuizz);
  }
  return quizz;
};

const myConvert = (videoQuizz: any) => {
  const testConvert: VideoQuizz = {
    id: videoQuizz._id,
    name: videoQuizz.name,
    vignette: "string",
    link: videoQuizz.link,
    desc: "",
    viewed: videoQuizz.viewed,
    quizz: quizzConvert(videoQuizz.quizz, videoQuizz._id),
  };
  return testConvert;
};

const QCM: React.FC<Props> = ({ videoQuizz, videoEnded }) => {
  const [_videoQuizz, updateVideoQuizz] = useImmer<VideoQuizz>(
    myConvert(videoQuizz)
  );
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [videoEnd, setVideoEnd] = useState<boolean>(false);
  const [iCurrentQuestion, setICurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const urlParams = new URLSearchParams(window.location.search);

  function handleClick(e: any, iQ: number, iR: number) {
    updateVideoQuizz((old) => {
      old.quizz[iQ].responses[iR].checked = e.target.checked;
    });
  }

  const getQuizzVideo = async () => {
    if (_videoQuizz.id.length === 0) {
      const myData = await axios({
        method: "POST",
        url: baseUrl + "/vid",
        headers: {
          Authorization: localStorage.getItem("authToken") ?? "nullToken",
        },
        data: { ids: urlParams.get("id") },
      });
      const videoDatas: VideoBackType = {
        _id: myData.data[0]._id,
        name: myData.data[0].name,
        link: myData.data[0].link,
        viewed: myData.data[0].viewed,
        quizz: myData.data[0].quizz,
      };
      updateVideoQuizz(myConvert(videoDatas));
    }
  };

  useEffect(() => {
    setVideoEnd(videoEnded);
  }, [videoEnded]);

  useEffect(() => {
    getQuizzVideo();
    setScore(0);
    let tempScore = 0;
    let scoreSum = 0;
    _videoQuizz.quizz.map((q, i) => {
      tempScore = 0;
      q.responses.map((r, j) => {
        if (q.correction.includes(j.toString()) && r.checked) {
          tempScore += 1;
        } else if (!q.correction.includes(j.toString()) && !r.checked) {
          tempScore += 0;
        } else {
          tempScore -= 0.25;
        }
      });
      if (tempScore < 0) tempScore = 0;
      scoreSum += tempScore / q.correction.length;
    });
    setScore((scoreSum / _videoQuizz.quizz.length) * 20);
  }, [_videoQuizz]);

  return (
    <>
      {_videoQuizz && _videoQuizz.quizz && _videoQuizz.quizz.length > 0 ? (
        <div>
          <IonGrid hidden={!videoEnd}>
            <IonRow hidden={showAnswers}>
              <p className="hover-underline black-text">
                Questions restantes : {iCurrentQuestion + 1}/
                {_videoQuizz.quizz.length}
              </p>
              <IonCol size="12" size-lg="12" size-sm="12" hidden={showAnswers}>
                <IonRow className="ion-justify-content-start">
                  <IonText></IonText>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                  <IonText>
                    <p className="hover-underline black-text">
                      {_videoQuizz.quizz[iCurrentQuestion].question}
                    </p>
                  </IonText>
                </IonRow>
              </IonCol>
              {_videoQuizz.quizz[iCurrentQuestion].responses.map((r, i) => {
                return (
                  <IonCol key={"resp" + i} size-lg="6" size="12" size-sm="12">
                    <IonText>
                      <IonGrid className="bold btn">
                        <IonRow>
                          <IonCol size-lg="1" size="1" size-sm="1">
                            <input
                              type="checkbox"
                              className="quizz-checkbox"
                              id={"scales" + i}
                              name="scales"
                              onChange={(e) =>
                                handleClick(e, iCurrentQuestion, i)
                              }
                            ></input>
                          </IonCol>
                          <IonCol>
                            <label htmlFor={"scales" + i}>{r.title}</label>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonText>
                  </IonCol>
                );
              })}
              <IonCol
                size-lg="6"
                offsetLg="3"
                size="12"
                size-sm="12"
                hidden={iCurrentQuestion === _videoQuizz.quizz.length - 1}
              >
                <IonText
                  onClick={() => {
                    setICurrentQuestion(iCurrentQuestion + 1);
                  }}
                >
                  <p className="bold btn btn-shade">Question suivante</p>
                </IonText>
              </IonCol>
              <IonCol
                size-lg="6"
                offsetLg="3"
                size="12"
                size-sm="12"
                hidden={!(iCurrentQuestion === _videoQuizz.quizz.length - 1)}
              >
                <IonText
                  onClick={() => {
                    setShowAnswers(true);
                  }}
                >
                  <p className="bold btn btn-shade">Voir mon score</p>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow hidden={!showAnswers}>
              <IonItem color="transparent">
                <IonText className="black-text">
                  Votre score pour ce quizz est {score}/20.
                  {getSentenceByScore(score)}
                </IonText>
              </IonItem>
            </IonRow>
          </IonGrid>

          <IonRow hidden={videoEnd}>
            <p className="black-text">
              Regardez la vidéo en entier pour débloquer les quizz
            </p>
          </IonRow>
        </div>
      ) : null}
    </>
  );
};

export default QCM;
