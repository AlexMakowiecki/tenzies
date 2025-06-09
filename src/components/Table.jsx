import React from "react"
import PaginationBar from "./PaginationBar"
import "../styles/Table.css"

export default function Table({dataArray, rowsPerPage}){
  const [currentPage, setCurrentPage] = React.useState(0)
  const columnNames =  Object.keys(dataArray[0])
  const cantPages = Math.max(1, Math.ceil((dataArray.length)/rowsPerPage))
  const tableHeadContent = columnNames.map((item, i) => <h3 key={`column-name-${i}`}>{item}</h3>)
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

  function createTableRow(arrayItem, i){
    const itemValues = Object.values(arrayItem)
    return (
      <div key={`table-row-${i}`} className="table__row" style={{gridTemplateColumns:"1fr ".repeat(columnNames.length)}}>
        {itemValues.map((value, i) => <span key={`table-value-${i}`}>{value}</span>)}
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
          pageIndex={currentPage} 
          setPageIndex={setCurrentPage}
          cantPages={cantPages}/>}
    </div>
  )
}