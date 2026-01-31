function Pagination({ page, pages, onPageChange }) {
  const pageNumbers = [];
  
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  if (pages <= 1) return null;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>
        
        {pageNumbers.map((num) => (
          <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(num)}>
              {num}
            </button>
          </li>
        ))}
        
        <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
