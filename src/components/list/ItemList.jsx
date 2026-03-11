import ItemCard from "../card/ItemCard";
import "./ItemList.css";

function ItemList({ contacts, onRemove, onUpdate }) {

  return (
    <div className="list-container">

      {contacts.map((contact) => (
        <ItemCard
          key={contact.id}
          contact={contact}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}

    </div>
  )
}

export default ItemList