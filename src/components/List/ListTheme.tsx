import { IonCol, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import ListVideo from "./ListVideo";

import { Comp } from "../../types/comp";
import { Theme } from "../../types/theme";
import "../generalCSS/stylesheet.css";
import "./List.css";
import { makePOSTRequest } from "../../request/rawRequest";

interface ContainerProps {
  idComp?: number;
  comp?: Comp[];
  valid?: boolean;
  generique?: boolean;
  theme?: Array<any>;
}

const ListTheme: React.FC<ContainerProps> = ({ generique, theme }) => {
  const [themeList, setThemeList] = useState<any>([]);

  useEffect(() => {
    if (theme) {
      const themeLists: Theme[] = [];
      for (let i = 0; i < theme.length; i++) {
        themeLists.push(theme[i]);
      }
      setThemeList(theme);
    }
    // eslint-disable-next-line
  }, [theme]);

  return (
    <IonRow>
      <IonCol>
        {themeList.map((theme: any, i: number) => {
          return (
            <details key={i} className="details details-theme">
              <summary>{theme.name}</summary>
              <ListVideo
                key={i}
                idTheme={theme._id}
                themes={themeList}
                id_videos={theme.id_videos}
                generique={generique!}
              />
            </details>
          );
        })}
      </IonCol>
    </IonRow>
  );
};

export default ListTheme;
