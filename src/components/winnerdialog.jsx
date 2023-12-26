import React from "react";

export default function WinnerDialog(props){
  return(
    <div className="modal flex-container flex-center">
      <dialog className="dialog winner-dialog flex-container flex-center">
        <p className="winner-dialog--message">{props.message}</p>
        <button className="winner-dialog--btn game-table--btn" onClick={props.close}>Deal</button>
      </dialog>
    </div>
  )
}