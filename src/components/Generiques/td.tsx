import { IonCard } from "@ionic/react";
import { moduleData } from "../../types/td";
import "../generalCSS/stylesheet.css";

export { td };

const tdData: moduleData[] = [
  { title: "Fiches Techniques", href: "datasheets" },
  { title: "Vos Réalisations", href: "addReal" },
  { title: "Travaux Réalisés", href: "realMarked" },
];

const td = () => {
  return (
    <details key={"td"} className="details details-theme">
      <summary>Travaux Dirigés</summary>
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
