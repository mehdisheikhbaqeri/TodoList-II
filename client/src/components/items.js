import React from "react";
const Item = ({text,remove,update}) => {
    return (
      <div className="item">
        <div className="tex">{text}</div>
        <div className="icons">
          <i onClick={update} className="fa-solid fa-pencil"></i>
          <i onClick={remove} className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    );
}
 
export default Item;