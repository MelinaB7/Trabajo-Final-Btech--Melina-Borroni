import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import ItemForm from "./components/form/ItemForm";
import ItemList from "./components/list/ItemList";
import "./App.css"
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyBqWcjEP8QzwH1l43go4vC34S4pRNFFa8o",
  authDomain: "reactmeli.firebaseapp.com",
  projectId: "reactmeli",
  storageBucket: "reactmeli.firebasestorage.app",
  messagingSenderId: "1046114336018",
  appId: "1:1046114336018:web:fa43f1a1d96bee1593c7cb",
  measurementId: "G-RP8CPQSSX3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function App() {

  const [contacts, setContacts] = useState([]);
  const [apiUsers, setApiUsers] = useState([]);
  const contactsCollection = collection(db, "contacts");


  useEffect(() => {
    getApiUsers();
    const q = query(
      contactsCollection,
      orderBy("nombre")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const contactsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setContacts(contactsArray);
    });

    return () => unsubscribe();

  }, []);



  // AGREGAR CONTACTO
  const addContact = async (contact) => {

    await addDoc(contactsCollection, {
      nombre: contact.nombre,
      telefono: contact.telefono,
      email: contact.email,
      fechaCreacion: Date.now()
    });

  };


  // ELIMINAR CONTACTO
  const removeContact = async (id) => {

    await deleteDoc(
      doc(db, "contacts", id)
    );

  };


  // EDITAR CONTACTO
  const updateContact = async (id, updatedData) => {

    await updateDoc(
      doc(db, "contacts", id),
      updatedData
    );

  };

  //API
  const getApiUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  setApiUsers(data);
};


  return (
    <div className="app-container">

      <h1>Gestor de Contactos</h1>

      <ItemForm onAdd={addContact} />

      <ItemList
        contacts={contacts}
        onRemove={removeContact}
        onUpdate={updateContact}
      />

      <h2>Otros contactos</h2>

      {apiUsers.map((user) => (
      <div key={user.id} className="card">
      <h3>{user.name}</h3>
      <p>Teléfono: {user.phone}</p>
      <p>Email: {user.email}</p>
      </div>
))}

    </div>

  
  );
}

