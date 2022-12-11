import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { Redirect, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import AddReal from "./components/AddReal/AddReal";
/* Theme variables */
import Competence from "./components/Competence/Competence";
import PageNotFound from "./components/ErrorComponent/PageNotFound/PageNotFound";
import Feed from "./components/Feed/Feed";
import Generique from "./components/Generiques/Generique";
import Login from "./components/Login/Login";
import NextLives from "./components/NextLives/NextLives";
import RealMarked from "./components/ReceiveReal/realMarked";
import Register from "./components/Register/Register";
import Replay from "./components/Replay/Replay";
import TechnoList from "./components/TechnoList/TechnoList";
import VideoDisplay from "./components/Video/Video";
import VideoGen from "./components/Video/VideoGen";
import VideoReplay from "./components/Video/VideoReplay";
import Welcome from "./components/Welcome/Welcome";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const pathLogo = "assets/logo/deliceo_logo.jpg"
  return (
    <IonApp>
      <IonPage color="primary">
        <IonContent className="main-container">
          <IonReactRouter>
            <IonRouterOutlet>
              {/* if not token go to home */}

              <Route exact path="/feed">
                {localStorage.getItem("authToken") ? (
                  <Feed pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/account">
                {localStorage.getItem("authToken") ? (
                  <Account pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/competences">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") &&
                localStorage.getItem("pole") ? (
                  <Competence
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/video">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") &&
                localStorage.getItem("pole") ? (
                  <VideoDisplay
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/generiques">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") &&
                localStorage.getItem("pole") ? (
                  <Generique
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/videogen">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") &&
                localStorage.getItem("pole") ? (
                  <VideoGen
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/nextLives">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") ? (
                  <NextLives pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/addReal">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") ? (
                  <AddReal pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/realMarked">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") ? (
                  <RealMarked pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/replay">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") ? (
                  <Replay pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/videoreplay">
                {localStorage.getItem("authToken") &&
                localStorage.getItem("techno") &&
                localStorage.getItem("pole") ? (
                  <VideoReplay pathLogo={pathLogo} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/welcome">
                {localStorage.getItem("authToken") ? (
                  <Welcome
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              {/* if authToken go to welcome */}

              <Route exact path="/login">
                {localStorage.getItem("authToken") ? (
                  <Redirect to="/welcome" />
                ) : (
                  <Login
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                )}
              </Route>

              <Route exact path="/register">
                {localStorage.getItem("authToken") ? (
                  <Redirect to="/welcome" />
                ) : (
                  <Register
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                )}
              </Route>

              <Route exact path="/home">
                {localStorage.getItem("authToken") ? (
                  <Redirect to="/welcome" />
                ) : (
                  <TechnoList
                    endpoint=""
                    pathLogo={pathLogo}
                  />
                )}
              </Route>

              <Route exact path="/">
                <Redirect to="/home" />
              </Route>

              <Route exact path="/404">
                <PageNotFound />
              </Route>

              {/* keep this last */}
              <Route>
                <Redirect to="/404" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
