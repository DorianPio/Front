import { IonCard } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

import "./CardsFeed.css";

import "../IonColor/color.css";

import { hideContentOn, hideFooterOn } from "../../variables/cardVariables";
import Content from "./Content";
import Footer from "./Footer/Footer";

interface ContainerProps {
  id: number;
  usernameIcon?: string | undefined;
  username?: string;
  title: string;
  image?: string[];
  description?: string | undefined;
  like?: number | undefined;
  share?: number | undefined;
  comments?: number;

  scrollID?: number;
  state: string;
}

const Card: React.FC<ContainerProps> = ({
  id,
  title,
  image,
  description,
  like,
  comments,
  share,
  state,
  scrollID,
}) => {
  const fieldRef = useRef<HTMLInputElement>(null);

  const [hideContent, setHideContent] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    if (id.toString() === scrollID?.toString())
      fieldRef.current?.scrollIntoView();
    setHideContent(hideContentOn.includes(state, 0));
    setHideFooter(hideFooterOn.includes(state, 0));
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={fieldRef}>
      <IonCard
        id={id.toString()}
        color="tertiary"
        className={"card-container " + state}
        onClick={() => {
          if (state === "grid")
            window.location.href = "profile/feed?scroll=" + id;
        }}
      >
        <Content
          title={title}
          image={image}
          description={description}
          state={state}
          hidden={hideContent}
        />
        <Footer
          like={like}
          comments={comments ?? 0}
          share={share}
          hidden={hideFooter}
          state={state}
        />
      </IonCard>
    </div>
  );
};

export default Card;
