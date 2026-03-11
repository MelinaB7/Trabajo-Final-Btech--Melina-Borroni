import { useState } from "react";
import "./ItemForm.css";

function ItemForm({ onAdd }) {

  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    const newContact = {
      nombre,
      telefono,
      email
    }

    onAdd(newContact)

    setNombre("")
    setTelefono("")
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">

      <input className="form-container input"
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input className="form-container input"
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <input className="form-container input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" className="form-container button">
        Guardar contacto
      </button>

    </form>
  )
}

export default ItemForm