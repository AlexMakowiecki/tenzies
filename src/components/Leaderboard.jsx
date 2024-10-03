import "../styles/Leaderboard.css"
import timeParser from "../libraries/timeParser"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import Table from "./Table"
import ScoreForm from "./ScoreForm"

export default function Leaderboard(props){

  const [type, setType] = React.useState({
    time: true,
    rolls: false
  })

  const tableData = sortPlayers(props.leaderboardData).map((playerData, i) => {
      const rowData = {
        position: `#${(i+1).toString().padStart(2,"0")}`,
        name: playerData.name,
      }
      if (type.time) rowData.time = timeParser(playerData.seconds)
      if (type.rolls) rowData.rolls = playerData.rolls

      return rowData
  })

  function sortPlayers(players){
    return players.toSorted((player1, player2) => {
      if (type.time && type.rolls)
        return (player1.seconds*player1.rolls)-(player2.seconds*player2.rolls)
      else if (type.time)
        return player1.seconds - player2.seconds
      else if (type.rolls)
        return player1.rolls - player2.rolls
    })
  }
  
  return (
    <>
      <div className="blurred-background"></div>
      <div className="leaderboard">

        <button className="leaderboard__close-button" onClick={() => props.setLeaderboardOn(false)}>
          <FontAwesomeIcon icon={faRectangleXmark}/>
        </button>

        <h2 className="leaderboard__main-title">Leaderboard</h2>

        <section className="leaderboard-section">
          <div className="leaderboard__type-selection">
            <button onClick={() => setType({ time:true, rolls:false })}> Fastest </button>
            <button onClick={() => setType({ time:false, rolls:true })}> Luckiest </button>
            <button onClick={() => setType({ time:true, rolls:true })}> Fastest & Luckiest </button>
          </div>
          <Table dataArray={tableData} rowsPerPage={4}/>
        </section>
        
        {props.gameWon && <section className="user-score-section">
          <h3 className="leaderboard__subtitle">Your score</h3>
          <ScoreForm
            leaderboardData = {props.leaderboardData}
            setLeaderboardData = {props.setLeaderboardData}
            playerStats = {props.playerStats}
            playerName = {props.playerName}
            setPlayerName = {props.setPlayerName}
            type = {type}
            sortPlayers = {sortPlayers}
          />
        </section>}
      </div>
    </>
  )
  
}