import React from "react"
import timeParser from "../libraries/timeParser"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import "../styles/Timer.css"

export default function Timer(props){
  return (
    <div className="timer">
      <FontAwesomeIcon icon={faHourglassHalf}/>
      <span>{timeParser(props.seconds)}</span>
    </div>
  )
}