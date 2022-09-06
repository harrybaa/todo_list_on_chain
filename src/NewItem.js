import { useState, useEffect } from "react";

import "./NewItem.css";

function NewItem(props) {
  const onSubmit = () => {
    const { onSubmitNewItem } = props;
    const newItemEle = document.querySelector("#newItem");
    const inputVal = newItemEle.value;
    onSubmitNewItem && inputVal && onSubmitNewItem(inputVal);
    newItemEle.value = "";
  };

  return (
    <div className="new-item">
      <input id="newItem" name="newItem" className="new-item-input"></input>
      <input
        id="newItemSubmit"
        type="button"
        value="submit"
        onClick={onSubmit}
      ></input>
    </div>
  );
}

export default NewItem;
