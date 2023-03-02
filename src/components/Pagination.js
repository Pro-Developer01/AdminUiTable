import React from 'react'

export default function Pagination({
    totalPage,
    currentPage,
    pageUpdateHandler,
}) {
    const pageSwitchHandler = (selectedPage) => {
        if(selectedPage>= 1 && selectedPage<=totalPage && selectedPage!==currentPage)
        {
        pageUpdateHandler(selectedPage);
        }
      };
  return (
    <div className="paginationContainer">
    <span
      className={`material-symbols-outlined ${currentPage===1?'pagination_Disable':null}`}
      onClick={() => pageSwitchHandler(1)}
    >
      keyboard_double_arrow_left
    </span>
    <span
      className={`material-symbols-outlined ${currentPage===1?'pagination_Disable':null}`}
      onClick={() => pageSwitchHandler(currentPage - 1)}
    >
      chevron_left
    </span>
    <div>
      {[
        ...Array.from(
          { length: totalPage },
          (v, i) => i
        ),
      ].map((_, i) => (
        <span
        key={i}
          className={currentPage === i + 1 ? "pagination_Active" : null}
          onClick={() => pageSwitchHandler(i + 1)}
        >
          {i + 1}
        </span>
      ))}
    </div>
    <span
      className={`material-symbols-outlined ${currentPage===totalPage?'pagination_Disable':null}`}
      onClick={() => pageSwitchHandler(currentPage + 1)}
    >
      chevron_right
    </span>
    <span
      className={`material-symbols-outlined ${currentPage===totalPage?'pagination_Disable':null}`}
      onClick={() =>
        pageSwitchHandler(totalPage)
      }
    >
      keyboard_double_arrow_right
    </span>{" "}
  </div>
  )
}
