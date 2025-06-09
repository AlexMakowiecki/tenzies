import "../styles/PaginationBar.css"

export default function PaginationBar({ pageIndex, setPageIndex, cantPages })
{
  console.log("Rendering PaginationBar", { pageIndex, cantPages })
  return (
  <div className="pagination-bar">
    <button 
      className="pagination-bar__button"
      onClick={() => setPageIndex(0)}
      disabled={pageIndex === 0}>  
        {"<<"}
    </button>

    <button
      className="pagination-bar__button" 
      onClick={() => setPageIndex(prevPageIndex => prevPageIndex - 1)}
      disabled={pageIndex === 0}>
        {"<"}
    </button>

    <span className="pagination-bar__page-display">Page {pageIndex + 1}</span>

    <button
      className="pagination-bar__button"
      onClick={() => setPageIndex(prevPageIndex => prevPageIndex + 1)}
      disabled={pageIndex === cantPages-1}>
        {">"}
    </button>

    <button 
      className="pagination-bar__button" 
      onClick={() => setPageIndex(cantPages-1)}
      disabled={pageIndex === cantPages-1}>
        {">>"}
    </button>
  </div>
  )
}