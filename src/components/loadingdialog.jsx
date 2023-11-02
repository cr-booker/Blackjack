import React from "react";

export default function LoadingDialog(){
  return (
    <div className="modal flex-container flex-center">
      <dialog className="dialog loading-dialog flex-container flex-center">
        <div className="lds-facebook">
          <div></div><div></div><div></div>
        </div>
        <span className="loading-dialog--message">Loading</span>
      </dialog>
    </div>
   
  )
}