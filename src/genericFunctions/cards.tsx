import Card from "../components/Cards/Card";
import { card } from "../types/types";

export const pushDataDown = (
  displayCards: JSX.Element[],
  setDisplayCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
  cardsRequest: card[],
  setInfiniteDownDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  state: string,
  scrollID?: number,
  setMin?: number,
  setMax?: number
) => {
  const oldLength: number = parseInt(
    displayCards[displayCards.length - 1]?.key?.toString() ?? "-1"
  );

  let min = oldLength + 1;
  let max = min + 4;

  if (scrollID) {
    min = scrollID;
    max = min + 4;
  } else if (setMin && setMax) {
    min = setMin;
    max = setMax;
  } else if (setMin && !setMax) {
    min = setMin;
    max = min + 4;
  } else if (!setMin && setMax) {
    max = setMax;
    min = max - 4;
  }

  if (min < 0) min = 0;

  if (max > cardsRequest.length) {
    setInfiniteDownDisabled(true);
    max = cardsRequest.length;
  }

  const newCards: JSX.Element[] = [];

  for (let i = min; i < max; i++) {
    newCards.push(
      <Card
        key={i}
        id={i}
        username={cardsRequest[i].username ?? "username"}
        title={cardsRequest[i].title ?? "title"}
        usernameIcon={cardsRequest[i].usernameIcon}
        image={cardsRequest[i].image}
        description={cardsRequest[i].description}
        like={cardsRequest[i].like}
        share={cardsRequest[i].share}
        comments={cardsRequest[i].comments ?? 0}
        scrollID={scrollID}
        state={state}
      />
    );
  }
  setDisplayCards([...displayCards, ...newCards]);
};

export const pushDataUp = (
  displayCards: JSX.Element[],
  setDisplayCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
  cardsRequest: card[],
  setInfiniteUpDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  state: string
) => {
  const oldStart: number = parseInt(displayCards[0].key?.toString() ?? "0");

  let max = oldStart;
  let min = oldStart - 4;
  const newCards = [];

  if (min <= 0) {
    setInfiniteUpDisabled(true);
    min = 0;
  }

  for (let i = min; i < max; i++) {
    newCards.push(
      <Card
        key={i}
        id={i}
        username={cardsRequest[i].username ?? "username"}
        title={cardsRequest[i].title ?? "title"}
        usernameIcon={cardsRequest[i].usernameIcon}
        image={cardsRequest[i].image}
        description={cardsRequest[i].description}
        like={cardsRequest[i].like}
        share={cardsRequest[i].share}
        comments={cardsRequest[i].comments ?? 0}
        state={state}
      />
    );
  }
  setDisplayCards([...newCards, ...displayCards]);
};
