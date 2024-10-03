export default function timeParser(seconds){
  const displayedSeconds = (seconds % 60).toString().padStart(2,"0")
  const displayedMinutes = Math.floor(seconds / 60).toString().padStart(2,"0")

  return (`${displayedMinutes}:${displayedSeconds}`)
}