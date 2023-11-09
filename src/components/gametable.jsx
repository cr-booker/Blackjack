import React from "react";

export default function Table(props){
  return (
    <main>
      {props.showDealBtn ? <button className="deal-button" onClick={props.loadGame}>Deal</button> :
      <div className="game-table flex-container flex-center">
        <div className="game-table--dealer flex-container flex-center">
          <div className="game-table--total">{props.dealerTotal}</div>
          <div className="game-table--hand flex-container">{props.dealerCards}</div>
        </div>
        <div className="game-table--player flex-container flex-center">
          <div className="game-table--total">{props.playerTotal}</div>
          <div className="game-table--hand  flex-container">{props.playerCards}</div>
        </div>
        <div className="game-table--btn-container flex-container">
          <button className="player-btn" onClick={props.handleHitBtn}>Hit Me!</button>
          <button className="player-btn" onClick={props.handleStayBtn}>Stay!</button>
        </div> 
      </div>} 
    </main>
  )
}