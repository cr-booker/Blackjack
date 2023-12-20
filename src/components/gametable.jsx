import React from "react";

export default function Table(props){
  return (
    <main>
      <div className="game-table flex-container flex-center">
        {props.showDealBtn ? <button className="game-table--btn deal-button" onClick={props.loadGame}>Deal</button> :
        <><div className="game-table--dealer flex-container flex-center">
          <div className="game-table--total flex-container flex-center">{props.dealerTotal}</div>
          <div className="game-table--hand flex-container">{props.dealerCards}</div>
        </div>
        <div className="game-table--player flex-container flex-center">
          <div className="game-table--total flex-container flex-center">{props.playerTotal}</div>
          <div className="game-table--hand  flex-container">{props.playerCards}</div>
        </div>
        <div className="game-table--btn-container flex-container flex-center">
          <button className="game-table--btn player-btn" onClick={props.handleStayBtn}>
            <i className="material-icons">pan_tool</i>
            Stay!
          </button>
          <button className="game-table--btn player-btn flex-container flex-center" onClick={props.handleHitBtn}>
            <i className="material-icons">add_circle</i>
            Hit Me!
          </button>
        </div></>}
      </div>
    </main>
  )
}