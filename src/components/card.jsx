import React from "react";

export default function Card(props){
  return (
      <div id={props.code} className="card">
        <img src={props.cardImg} alt={`${props.value} of ${props.suit}`} />
      </div>
  )
}