import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'


export default function RollCounter(props){
  return (
    <div className="roll-counter">
      <FontAwesomeIcon icon={faDice}/>
      <span>{props.rolls}</span>
    </div>
  )
}