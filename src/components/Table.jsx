import React from "react"
import PaginationBar from "./PaginationBar"
import "../styles/Table.css"

export default function Table({dataArray, rowsPerPage}){
  const [currentPage, setCurrentPage] = React.useState(0)
  const columnNames = Object.keys(dataArray[0])
  const tableHeadContent = columnNames.map(item => <h3>{item}</h3>)
  const tableMainContent = (rowsPerPage)
    ? paginateContent(dataArray.map(createTableRow))
    : dataArray.map(createTableRow)

  function paginateContent(content){
    return content.reduce((finalArray, item, i) => {
      const pos = Math.floor(i/rowsPerPage)
      if (finalArray[pos])
        finalArray[pos].push(item)
      else
        finalArray[pos] = [item]
      return finalArray
    },[])
  }

  function createTableRow(arrayItem){
    const itemValues = Object.values(arrayItem)
    return (
      <div className="table__row" style={{gridTemplateColumns:"1fr ".repeat(columnNames.length)}}>
        {itemValues.map(value => <span>{value}</span>)}
      </div>
    )
  }


  return (
    <div className="table">
      <div className="table__content">
        <div className="table__row table__head" style={{gridTemplateColumns:"1fr ".repeat(columnNames.length)}}>
          {tableHeadContent}
        </div>
        {tableMainContent[currentPage]}
      </div>
      {rowsPerPage && 
        <PaginationBar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          maxPages={Math.floor(dataArray.length/rowsPerPage)}/>}
    </div>
  )
}