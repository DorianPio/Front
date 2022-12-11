import { IonCardContent, IonCol, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import "./Card.css";
import "./CardsFeed.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { carouselOn } from "../../variables/cardVariables";

interface ContainerProps {
  title?: string;
  image?: string[];
  description?: string;
  state: string;
  hidden: boolean;
}

const Content: React.FC<ContainerProps> = ({
  title,
  image,
  description,
  state,
  hidden,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const updateCurrent = (index: number) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  return (
    <div className={"card-content-container " + state} hidden={hidden}>
      <IonCardContent className={"card-content " + state}>
        <IonRow>
          <IonCol>
            <div className={"card-img-container " + state}>
              {carouselOn.includes(state) ? (
                <div className={"swiper-container " + state}>
                  <Carousel
                    autoPlay={false}
                    infiniteLoop={true}
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={true}
                    emulateTouch={true}
                    swipeable={true}
                    onChange={updateCurrent}
                    className="img-carousel"
                  >
                    {image!.map(function(image, index) {
                      return (
                        <div
                          key={index}
                          className={"swipper-img-container " + state}
                        >
                          <img alt={"image carousel n°"+index} src={image} className={"swipper-img"} />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              ) : (
                <img
                  className={"card-img " + state}
                  hidden={image ? false : true}
                  src={image && image[0] ? image[0] : ""}
                  alt="cardImage"
                />
              )}
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <h1 className={"bold black-text"}>{title}</h1>
        </IonRow>
        <IonRow>
          <IonText className={"card-content-desc-text"}>
            {description ? description : ""}
          </IonText>
        </IonRow>
      </IonCardContent>
    </div>
  );
};

export default Content;
