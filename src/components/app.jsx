import React from "react";
import Home from "./home";
import Table from "./gametable"
import Card from "./card";
import LoadingDialog from "./loadingdialog";
import WinnerDialog from "./winnerdialog"
import "../css/style.css"

const cardBackImg = "https://www.deckofcardsapi.com/static/img/back.png";

export default function App(){
  const [homeIsDisplayed, setHomeIsDisplayed] = React.useState(true);
  const [gameIsLoading, setGameIsLoading] = React.useState(false);
  const [playerHand, setPlayerHand] = React.useState([]);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [showHoleCard, setShowHoleCard] = React.useState(false)
  const [playerStands, setPlayerStands] = React.useState(false);
  const [dealerStands, setDealerStands] = React.useState(false);
  const [winnerDialogIsOpen, setWinnerDialogIsOpen] = React.useState(false)
  const [winnerMessage, setWinnerMessage] = React.useState("")
  const [disableGameBtns, setDisableGameBtns] = React.useState(false)
  const [showDealBtn, setShowDealBtn] = React.useState(true)
 
  const deckIdRef = React.useRef("");
  const playerHandTotal = calculateHand(playerHand)
  const dealerHandTotal = !showHoleCard ? calculateHand(dealerHand.slice(0,1)) :calculateHand(dealerHand)

  
  const checkForBlackJack =  React.useCallback((playerHand, dealerHand) =>{
    const playerHasBlackjack = (calculateHand(playerHand) == 21);
    const dealerHasBlackjack = (calculateHand(dealerHand) == 21);
    if (playerHasBlackjack && dealerHasBlackjack){
      setShowHoleCard(true);
      showWinnerDialog("Push! Double BlackJack!");
    }else if (playerHasBlackjack){
      showWinnerDialog("Blackjack! Player Wins!")
    }else if (dealerHasBlackjack){
      setShowHoleCard(true);
      showWinnerDialog("Blackjack! Dealer wins");
    }
  }, [])

  const loadGame = React.useCallback(async (reset=false) =>{
    setGameIsLoading(true)
    if (reset){
      await resetGame()
    }
    const newDeck = "https://deckofcardsapi.com/api/deck/new/draw/?count=4";
    const currentDeck = `https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=4`;
    const response = await fetch(! deckIdRef.current ? newDeck : currentDeck );
    const json = await response.json();
    deckIdRef.current = json.deck_id;
    setPlayerHand(json.cards.slice(0,2))
    setDealerHand(json.cards.slice(2))
    setGameIsLoading(false)
    setHomeIsDisplayed(false)
    checkForBlackJack(json.cards.slice(0,2), json.cards.slice(2))
  }, [checkForBlackJack])

  // Player bust check
  React.useEffect(() => {
    if (playerHandTotal > 21){
      showWinnerDialog("Dealer Wins!")
    }
  }, [playerHandTotal])

  React.useEffect(() =>{
    if (playerStands && dealerHandTotal < 17){
        setTimeout(addCard,500, setDealerHand);
    }
    else if(playerStands && dealerHandTotal >= 17){
      setDealerStands(true)
    }
  },[playerStands ,dealerHandTotal])

  React.useEffect(() => {
    function determineWinner(){
      if (playerHandTotal > dealerHandTotal){
        showWinnerDialog("Player Wins");
      }else if(dealerHandTotal > playerHandTotal){
        showWinnerDialog("Dealer Wins");
      }else{
        showWinnerDialog("Draw")
      }
    }

    if (dealerStands){
      if (dealerHandTotal <= 21){
        determineWinner()
      }else{
        showWinnerDialog("Player Wins")
      }
    }
  },[dealerStands, dealerHandTotal, playerHandTotal])

  function calculateHand(hand){
    const rankValues = {
      "KING":10,
      "QUEEN":10,
      "JACK":10,
      "ACE":1
    }
    let total = 0;
    const ranks = hand.map(card => card.value);
    ranks.forEach(value => {
      if (Object.keys(rankValues).includes(value)){
        total += rankValues[value]
      }else{
        total += Number(value);
      }    
    })
    if (ranks.includes("ACE") && total <= 11){
      total += 10
    }
    return total;
  }

  async function addCard(setter){
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`);
    const json = await response.json();
    setter(prev => {return [...prev, ...json.cards ]})
  }

  function endTurn(){
   setPlayerStands(true)
   setShowHoleCard(true)
   setDisableGameBtns(true);
  }

  function showWinnerDialog(dialogMessage){
    setWinnerMessage(dialogMessage)
    setWinnerDialogIsOpen(true)
  }
    
  async function resetGame(){
    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckIdRef.current}/return/`)
    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckIdRef.current}/shuffle/`)
    setPlayerHand([])
    setDealerHand([])
    setShowHoleCard(false);
    setDealerStands(false);
    setPlayerStands(false);
  }

  const playerCards = playerHand.map(card => (
    <Card
      key={card.code}
      id={card.code}
      cardImg={card.image}
      value={card.value}
      suit= {card.suit}
    />
  ));

  const dealerCards = dealerHand.map((card,index) => (
    <Card
      key={card.code}
      id={index == 1 && !showHoleCard ? null : card.code}
      cardImg={index== 1 && !showHoleCard ? cardBackImg : card.image}
      value={index== 1 && !showHoleCard ? null :card.value}
      suit= {index== 1 && !showHoleCard ? null :card.suit}
    />   
  ));
  
  return(
    <>
      {homeIsDisplayed && <Home
        launchGame={() => {setHomeIsDisplayed(false)}}
      />}
      {gameIsLoading && <LoadingDialog />}
      {winnerDialogIsOpen && 
      <WinnerDialog 
        message={winnerMessage}
        close={() => {
          setWinnerDialogIsOpen(false)
          loadGame(true)}
        }
      />
      
      }
      {!homeIsDisplayed && 
        <Table 
          loadGame={()=> {loadGame(); setShowDealBtn(false);}}
          showDealBtn={showDealBtn}
          dealerCards={dealerCards}
          playerCards={playerCards}
          playerTotal={playerHandTotal}
          dealerTotal={dealerHandTotal}
          handleHitBtn={() => {addCard(setPlayerHand)}}
          handleStayBtn={endTurn}
        />
      }
    </>
  )
    
}
