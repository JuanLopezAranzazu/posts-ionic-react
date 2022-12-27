import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useIonRouter();

  useEffect(() => {
    if (sessionStorage.getItem("authenticated")) {
      navigation.push("/home", "root", "replace");
    }
  }, []);

  const handleLogin = (event: any) => {
    if (event) {
      event.preventDefault();
    }

    fetch("http://localhost:3001/api/v1/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("authenticated", JSON.stringify(data));
        navigation.push("/home", "root", "replace");
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Username </IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(event: any) => setUsername(event.target.value)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Password </IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(event: any) => setPassword(event.target.value)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton expand="block" onClick={handleLogin}>
              Login
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
