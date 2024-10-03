import "../styles/Dice.css"

export default function Dice(props){
  const styles = [
    (props.locked) ? "locked" : "",
  ].join(" ")
  return (
    <button className={`dice ${styles}`} id={props.id} onClick={() => props.handleClick(props.id)}>
      {(props.value > 3) && <div className="dot dot-1"></div>}
      {(props.value > 1) && <div className="dot dot-3"></div>}
      {(props.value === 6) && <div className="dot dot-4"></div>}
      {(Boolean(props.value % 2)) && <div className="dot dot-5"></div>}
      {(props.value == 6) && <div className="dot dot-6"></div>}
      {(props.value > 1) && <div className="dot dot-7"></div>}
      {(props.value > 3) && <div className="dot dot-9"></div>}
    </button>
  )
}