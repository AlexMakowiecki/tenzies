import "../styles/Main.css"
import React from "react"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRankingStar } from '@fortawesome/free-solid-svg-icons'
import { db, leaderboardCollection } from "../libraries/firestore"
import { getDocs } from "firebase/firestore"
import Dice from "./Dice"
import Timer from "./Timer"
import Leaderboard from "./Leaderboard"
import RollCounter from "./RollCounter"
import Confetti from "react-confetti"



export default function Main(){
  const [dicesData, setDicesData] = React.useState(allNewDicesData())
  const [gameWon, setGameWon] = React.useState(false)
  const [gameOn, setGameOn] = React.useState(false)
  const [leaderboardData, setLeaderboardData] = React.useState(null)
  const [leaderboardOn, setLeaderboardOn] = React.useState(false)
  const [playerStats, setPlayerStats] = React.useState({
    seconds: 0,
    rolls: 0,
  })
  const [playerName, setPlayerName] = React.useState("")
  const diceElements = dicesData.map(diceData => {
    return <Dice id={diceData.id} key={diceData.id} locked={diceData.locked} value={diceData.value} handleClick={handleDiceClick}/>
  })


  React.useEffect(() => {
    getDocs(leaderboardCollection)
      .then(snapshot => {
        const playersDataArray = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        console.log(playersDataArray)
        setLeaderboardData(playersDataArray)
      })
  },[])


  React.useEffect(() => {
    if (dicesData.every(diceData => (diceData.value === dicesData[0].value) && (diceData.locked)))
      setGameWon(true)
  }, [dicesData])


  React.useEffect(() => {
    if (gameWon){
      setGameOn(false)
    }
  },[gameWon])


  React.useEffect(() => {
    const intervalRef = gameOn && setInterval(() => setPlayerStats(prevPlayerStats => {
      return {
        ...prevPlayerStats,
        seconds: prevPlayerStats.seconds + 1
      }
    }), 1000)
    return () => intervalRef && clearInterval(intervalRef) 
  },[gameOn])


  function allNewDicesData(){
    const newDicesData = []
    for (let i=0; i<10; i++){
      const randomId = "dice-" + nanoid()
      newDicesData.push(
        {
          value:Math.floor(Math.random()*6) + 1,
          locked:false,
          id:randomId,
        })
    }
    return newDicesData
  }

  function handleRoll(){
    if (gameOn === false) setGameOn(true)
    if (gameWon === false) setPlayerStats(prevPlayerStats => {
      return {
        ...prevPlayerStats, 
        rolls: prevPlayerStats.rolls + 1
      }
    })
    setDicesData(prevDicesData => {
      return prevDicesData.map(diceData => {
        if (!diceData.locked)
          return {
            ...diceData,
            value: Math.floor(Math.random()*6) + 1,
          }
        return {...diceData}
      })
    })
  }

  function handleDiceClick(id){
    if (gameWon === false){
      if (gameOn === false) setGameOn(true)
      setDicesData(prevDicesData => {
        return prevDicesData.map(diceData => {
          if (diceData.id === id)
            return {
              ...diceData,
              locked:!diceData.locked
            }
          return diceData
        })})
    }
  }

  function restartGame(){
    setPlayerStats({
      seconds: 0,
      rolls: 0
    })
    setGameWon(false)
    setDicesData(allNewDicesData())
    setPlayerName("")
  }

  return (
    <main>

      { leaderboardData && leaderboardOn && 
        <Leaderboard 
          leaderboardData = {leaderboardData}
          setLeaderboardData = {setLeaderboardData}
          playerStats = {playerStats}
          setLeaderboardOn = {setLeaderboardOn}
          gameWon = {true}
          playerName = {playerName}
          setPlayerName = {setPlayerName}
        />}


      <div className="tenzies__header">
        <div className="counters">
          <Timer seconds={playerStats.seconds}/>
          <RollCounter rolls={playerStats.rolls}/>
        </div>
        <button className="leaderboard-button" onClick={() => setLeaderboardOn(true)} disabled={gameOn}>
          <FontAwesomeIcon icon={faRankingStar}/>
        </button>
      </div>

      {(gameWon) ? <h1>You win!</h1> : <h1>Tenzies</h1>  }
   
      <p className="explanation">
        {(gameWon)
          ? "Now you can add your score to the leaderboard. Click the leaderboard icon to add it"
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
         
      <div className="dice-container">
        {diceElements}
      </div>
      {(gameWon)
        ? <button className="roll-button" onClick={restartGame}>New Game</button>
        : <button className="roll-button" onClick={handleRoll}>Roll</button>}
    </main>
  )
}