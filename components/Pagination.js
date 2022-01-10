import { useRouter } from "next/router";

function Pagination({
  page,
  hasPrevious,
  hasNext,
  prevPage,
  nextPage,
  lastPage,
}) {
  const router = useRouter();
  const query = router.query;
  const path = router.pathname;
  const onClickHandler = (page) => {
    query.page = page;
    router.push({ pathname: path, query });
  }

  return (
    <div className="my-2 flex justify-center items-center">
      <div className="flex items-center space-x-4">
        {page !== 1 && prevPage !== 1 && (
          <button
            className="pagination-button"
            onClick={() => onClickHandler(1)}
          >
            1
          </button>
        )}
        {hasPrevious && (
          <button
            className="pagination-button"
            onClick={() => onClickHandler(prevPage)}
          >
            {prevPage}
          </button>
        )}
        {page && (
          <button
            className="pagination-button bg-gradient-to-b from-yellow-200 to-yellow-400"
            onClick={() => onClickHandler(page)}
          >
            {page}
          </button>
        )}
        {hasNext && (
          <button
            className="pagination-button"
            onClick={() => onClickHandler(nextPage)}
          >
            {nextPage}
          </button>
        )}
        {page !== lastPage && nextPage !== lastPage && (
          <button
            className="pagination-button"
            onClick={() => onClickHandler(lastPage)}
          >
            {lastPage}
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination
