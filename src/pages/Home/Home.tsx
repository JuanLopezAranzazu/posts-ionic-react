import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  useIonRouter,
  IonButtons,
  IonButton,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { add } from "ionicons/icons";
import "./Home.css";
// components
import Modal from "../../components/Modal/Modal";

const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useIonRouter();
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigation.push("/login", "root", "replace");
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("authenticated")) {
      const token = JSON.parse(
        `` + sessionStorage.getItem("authenticated")
      ).token;
      fetch("http://localhost:3001/api/v1/posts/user", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
        });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authenticated");
    navigation.push("/login", "root", "replace");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonInput
            placeholder="Search..."
            onIonChange={(event: any) => setTitle(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonList>
          <IonListHeader>
            <IonLabel>All posts user</IonLabel>
          </IonListHeader>
          {posts
            .filter((item: any) => {
              if (title === "") {
                return item;
              } else if (
                item.title.toLowerCase().includes(title.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item: any) => {
              return (
                <IonItem key={item.id}>
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              );
            })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <Modal
          text="Create publication"
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
