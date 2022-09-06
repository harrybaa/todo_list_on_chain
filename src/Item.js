import "./Item.css";

function Item(props) {
  const { id, desc, completed } = props;

  const onCheckChange = () => {}

  return (
    <div className="item">
      <input type="checkbox" id={id} checked={completed} onChange={onCheckChange}></input>
      <span className="item-label">{desc}</span>
    </div>
  );
}

export default Item;
