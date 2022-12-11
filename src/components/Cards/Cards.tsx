import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

import { useEffect, useState } from "react";
import { pushDataDown, pushDataUp } from "../../genericFunctions/cards";
import { card } from "../../types/types";
import { defaultCards } from "../../variables/variables";

import "../IonColor/color.css";
import "./CardsFeed.css";

interface ContainerProps {
  hidden?: boolean;
  state: string;
  endpoint: string;
  disabledUpIS?: boolean;
}

const Cards: React.FC<ContainerProps> = ({
  hidden,
  state,
  endpoint,
  disabledUpIS,
}) => {
  const params = new URLSearchParams(window.location.search);
  const scrollID = params.get("scroll");

  const cardsRequest: card[] = [...defaultCards];

  const [displayCards, setDisplayCards] = useState<JSX.Element[]>([]);
  const [infiniteUpDisabled, setInfiniteUpDisabled] = useState<boolean>(
    (disabledUpIS || scrollID === null) ?? false
  );
  const [infiniteDownDisabled, setInfiniteDownDisabled] = useState<boolean>(
    false
  );

  const loadDataUp = (ev: any) => {
    setTimeout(() => {
      pushDataUp(
        displayCards,
        setDisplayCards,
        cardsRequest,
        setInfiniteUpDisabled,
        state
      );
      ev.target.complete();
    }, 100);
  };

  const loadDataDown = (ev: any) => {
    setTimeout(() => {
      pushDataDown(
        displayCards,
        setDisplayCards,
        cardsRequest,
        setInfiniteDownDisabled,
        state,
        undefined,
        undefined
      );
      ev.target.complete();
    }, 100);
  };

  useEffect(() => {
    pushDataDown(
      displayCards,
      setDisplayCards,
      cardsRequest,
      setInfiniteDownDisabled,
      state,
      parseInt(scrollID!),
      undefined,
      undefined
    );
  // eslint-disable-next-line
  }, []);

  return (
    <div>
      {disabledUpIS ? (
        <></>
      ) : (
        <IonInfiniteScroll
          onIonInfinite={loadDataUp}
          threshold="10%"
          position="top"
          disabled={infiniteUpDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Chargement ..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      )}
      <div hidden={hidden ?? false} className={"card-grid " + state}>
        {displayCards}
      </div>
      <IonInfiniteScroll
        onIonInfinite={loadDataDown}
        threshold="100px"
        disabled={infiniteDownDisabled}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Chargement ..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </div>
  );
};

export default Cards;
