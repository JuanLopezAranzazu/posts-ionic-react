import React, { useState } from "react";
import "./Modal.css";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonModal,
  IonRow,
} from "@ionic/react";

interface ContainerProps {
  text: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ContainerProps> = ({ text, showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createPublication = () => {
    const token = JSON.parse(
      `` + sessionStorage.getItem("authenticated")
    ).token;
    fetch("http://localhost:3001/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowModal(false);
      });
  };

  return (
    <IonModal isOpen={showModal} className="my-custom-class">
      <p>{text}</p>
      <IonRow>
        <IonCol>
          <IonInput
            placeholder="Enter title..."
            onIonChange={(event: any) => setTitle(event.target.value)}
          ></IonInput>
          <IonInput
            placeholder="Enter description..."
            onIonChange={(event: any) => setDescription(event.target.value)}
          ></IonInput>
        </IonCol>
      </IonRow>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton onClick={() => setShowModal(false)}>
              Close Modal
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton onClick={() => createPublication()}>Create</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonModal>
  );
};

export default Modal;
