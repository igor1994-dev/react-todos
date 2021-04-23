import React from 'react';
import '../App.css';


function Paginator(props) {

    const { pageSize, todosTotalCount, currentPage, setCurrentPage } = props;
    let pagesCount = Math.ceil(todosTotalCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    // console.log('pagination ss', props)



    return (
        <div className="pagination-wrap">
            {pages.map(item => {
                return <span key={item}
                    role="button"
                    tabIndex="0"
                    className={currentPage === item ? "selected-page" : null}
                    onClick={() => setCurrentPage(item)}>
                    {item}
                </span>
            })
            }
        </div>
    )
}

export default Paginator;