import "../styles/PaginationBar.css"

export default function PaginationBar({currentPage, setCurrentPage, maxPages})
{
  return (
  <div className="pagination-bar">
    <button 
      className="pagination-bar__button"
      onClick={() => setCurrentPage(0)}
      disabled={currentPage === 0}>  
        {"<<"}
    </button>

    <button
      className="pagination-bar__button" 
      onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage - 1)}
      disabled={currentPage === 0}>
        {"<"}
    </button>

    <span className="pagination-bar__page-display">Page {currentPage+1}</span>

    <button
      className="pagination-bar__button"
      onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage + 1)}
      disabled={currentPage === maxPages}>
        {">"}
    </button>

    <button 
      className="pagination-bar__button" 
      onClick={() => setCurrentPage(maxPages)}
      disabled={currentPage === maxPages}>
        {">>"}
    </button>
  </div>
  )
}