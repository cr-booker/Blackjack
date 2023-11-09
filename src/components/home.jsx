import React from "react";
import RulesDialog from "./rulesdialog";
import logo from "../assets/cards-logo.svg" 

export default function StartScreen(props){
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    return (
      <div className="home flex-container flex-center">
        <div className="home--logo-container flex-container flex-center">
          <img className="home--logo" src={logo} alt="4 playing card suits" />
          <h1 className="home--title neon-text">
            Blackjack
          </h1>
        </div>
        <div className="flex-container flex-center home--btn-container">
          <button className="home--btn home--play-btn" type="button" onClick={props.launchGame}>Play</button>
          <button className="home--btn home--rules-btn" type="button" onClick={()=> {setDialogIsOpen(true)}}>Rules</button>
        </div>
        {dialogIsOpen && 
        <RulesDialog
          show = {dialogIsOpen}
          closeDialog = {() => {setDialogIsOpen(false)}}
        />}
      </div>
    )
}