import { IonButton, IonCol, IonIcon, IonText } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { useState } from "react";

interface ContainerProps {
  like: number;
}

const Like: React.FC<ContainerProps> = ({ like }) => {
  const [likes, setLikes] = useState<number>(like);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  function updateLikes(): void {
    if (isLiked === false) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  }

  return (
    <IonCol className="ion-justify-content-center like">
      <IonButton
        onClick={(e) => updateLikes()}
        color="tertiary"
        className="footer-btn like"
      >
        <IonIcon className="card-icon" icon={isLiked ? heart : heartOutline} />
      </IonButton>
      <IonText className="card-icon-text">{likes}</IonText>
    </IonCol>
  );
};

export default Like;
