import React from "react"
import { leaderboardCollection } from "../libraries/firestore"
import { addDoc } from "firebase/firestore"
import timeParser from "../libraries/timeParser"
import "../styles/ScoreForm.css"


// Props = {playerStats, playerName, setPlayerName, type, leaderboardData, setLeaderboardData, sortPlayers}
export default function ScoreForm(props){
  const [formData, setFormData] = React.useState({
    name: ""
  })
  const playerPosition = props.sortPlayers([...props.leaderboardData, props.playerStats]).indexOf(props.playerStats)
  const columns = (Object.values(props.type).every(value => value === true)) ? 4 : 3

  function handleChange(e){
    const input = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [input.name]: input.value
      }
    })
  }

  function submitScore(){
    const newPlayerData = {
      ...props.playerStats,
      name: formData.name
    }
    addDoc(leaderboardCollection, newPlayerData)
    props.setLeaderboardData(prevLeaderboardData => {
      return [
        ...prevLeaderboardData,
        newPlayerData
      ]
    })
    props.setPlayerName(formData.name)
  }

  return (
    <form className="score-form">
      <div className="score-form__form-content" style={{gridTemplateColumns:"1fr ".repeat(columns)}}>
        <span className="score-form__name">{`#${(playerPosition).toString().padStart(2,"0")}`}</span>
        <span className="score-form__name-container">{props.playerName
          ? <span className="score-form__name">{playerName}</span>
          : <input 
            className="score-form__name-input"
            name="name"
            value={formData.name}
            placeholder = "User" 
            onChange = {handleChange} 
            readOnly={props.playerName} 
            maxLength="4"/>}
        </span>
        {props.type.time && <span>{timeParser(props.playerStats.seconds)}</span>}
        {props.type.rolls && <span>{props.playerStats.rolls}</span>}
      </div>

      {!props.playerName && 
        <button className="score-form__submit-button" onClick={submitScore}>
          <span>Submit score</span>
        </button>}
    </form>
  )
}