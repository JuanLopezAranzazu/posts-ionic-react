import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
// components
import Modal from "../../components/Modal/Modal";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>
        <Modal
          text="My modal"
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
