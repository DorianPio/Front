import { IonCard } from "@ionic/react";
import { moduleData } from "../../types/td";
import "../generalCSS/stylesheet.css";

export { tp };

const tdData: moduleData[] = [
  { title: "Fiches Techniques", href: "datasheets" },
  { title: "Prochains Lives", href: "nextLives" },
  { title: "Replay", href: "replay" },
];

const tp = () => {
  return (
    <details key={"tp"} className="details details-theme">
      <summary>Travaux Pratiques</summary>
      {tdData.map((d, i) => {
        return (
          <IonCard
            key={i}
            href={d.href}
            color="tertiary"
            className="card card-theme"
          >
            <p className="card-title">{d.title}</p>
          </IonCard>
        );
      })}
    </details>
  );
};
