import React from "react";

export default function RulesDialog(props){
  const [currentRule, setCurrentRule] = React.useState(0)


  function previousRule(){
    setCurrentRule(prev => prev -1)
  }

  function nextRule(){
    if ( currentRule != (rulesArray.length -1) ){
      setCurrentRule(prev => prev + 1)
    }
  }

  const rulesArray = [
    <div className="rule-text-container" key="0">
      <p className="rule-text"> Blackjack, also known as twenty-one or Pontoon, is one of the most popular casino card games in the world.</p>

      <p className="rule-text">
      Blackjack hands are scored by their point total. The hand with the highest total wins as long as it doesn&apos;t exceed 21; a hand with a higher total than 21 is said to bust, resulting in a loss.</p>
    </div>,
    <div className="rule-text-container" key="1">
       <p className="rule-text" >Cards 2 through 10 are worth their face value, and face cards (jack, queen, king) are worth 10. 
       <br/>
      An ace&apos;s value is 11 unless this would cause the player to bust, in which case it is worth 1.</p>

      <p className="rule-text">
      The players goal is to beat the dealer by having the higher, unbusted hand. If both the player and the dealer have the same point value, it is called a &quot;push&quot;, and neither player nor dealer wins the hand.</p>
    </div>,
    <div className="rule-text-container" key="2">
       <p className="rule-text">
      The dealer gives two cards to the player and themselves. One of the dealer&apos;s two cards is face-up so the player can see it, and the other is face down. (The face-down card is known as the &quot;hole card&quot;.</p>

      <p className="rule-text">
      A two-card hand of 21 (an ace plus a ten-value card) is called a &quot;blackjack&quot; or a &quot;natural&quot;, and is an automatic winner.</p>
    </div>,

    <div className="rule-container" key="3">
      <p className="rule-text">
      The player&apos;s options for playing his or her hand are:
      <span className="rule-text--hightlight"><b>Hit</b>: Take another card.</span>
      <span className="rule-text--hightlight"><b>Stand</b>: Take no more cards.</span>
      </p>
      <p className="rule-text">
      The player&apos;s turn is over after deciding to stand, doubling down to take a single card, or busting. If the player busts, he or she loses the bet even if the dealer goes on to bust.
      </p>
    </div>,

    <div className="rule-text-container" key="4">
      <p className="rule-text">After all the players have finished making their decisions, the dealer then reveals his or her hidden hole card and plays the hand. </p>   
    </div>
  ];
  
  return (
    <div className="modal tinted flex-container flex-center">
      <dialog open={props.show ? "open" :false} className="dialog rules-dialog">
      <header className="rules-dialog--header">
        <button className="rules-dialog--close-btn" type="button" onClick={props.closeDialog}>
          <i className="material-icons close-icon">cancel</i>
        </button>
        <h2 className="rules-dialog--heading">
          <i className="material-icons md-36">gavel</i>
          Rules
        </h2>
        
      </header>
      <div className="rules-dialog--body">
        {rulesArray[currentRule]}
      </div>
      <div className="rules-dialog--actions flex-container flex-center">
        {currentRule >= 1 && <button className="rules-dialog--btn flex-container" onClick={previousRule}><i className="material-icons md-36">arrow_back</i></button>}
        {currentRule < 4 && <button className="rules-dialog--btn flex-container" onClick={nextRule}><i className="material-icons md-36">arrow_forward</i></button>}
      </div>
    </dialog>
    </div>
  )
}