import "./ItemCard.css";
import Swal from "sweetalert2";
import { Trash2, Edit2 } from "lucide-react";
function ItemCard({ contact, onRemove, onUpdate }) {

  const editarContacto = () => {

  Swal.fire({
    title: "Editar contacto",
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre" value="${contact.nombre}">
      <input id="telefono" class="swal2-input" placeholder="Teléfono" value="${contact.telefono}">
      <input id="email" class="swal2-input" placeholder="Email" value="${contact.email}">
    `,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",

    preConfirm: () => {
      return {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value
      };
    }

  }).then((result) => {

    if (result.isConfirmed) {

      onUpdate(contact.id, result.value);

    }

  });

};
  return (
    <div className="card">

      <h3 className="card-info">{contact.nombre}</h3>

      <p className="card-info">Teléfono: {contact.telefono}</p>

      <p className="card-info">Email: {contact.email}</p>

      <div className ="card-buttons">

      <button className="btn-delete" onClick={() => onRemove(contact.id)}>
        <Trash2 size={18} />
      </button>

        <button className="btn-edit" onClick={editarContacto}>
       <Edit2 size={18} />
      </button>
</div>
    </div>
  )
}

export default ItemCard