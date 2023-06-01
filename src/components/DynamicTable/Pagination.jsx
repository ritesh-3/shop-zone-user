import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "../Styles/styles";


export const Pagination = ({
    totalPages,
    currentPage,
    paginate,
    handlePreviousPage,
    handleNextPage,
}) => {
    return (
        <div className={`${styles.paginatoreConatiner}`}>
            <button
                className={currentPage === 1 ? "cursor-not-allowed" : ""}
                onClick={handlePreviousPage}
            >
                <GrFormPrevious size={15}  />
            </button>
            <span>Total Pages: {totalPages}</span>
            {/* {totalPages > 1 &&
                Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                        <li
                            key={pageNumber}
                            className={pageNumber === currentPage ? "active" : ""}
                            onClick={() => paginate(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    )
                )} */}
            <button
                className={currentPage === totalPages ? "cursor-not-allowed" : ""}
                onClick={handleNextPage}
            >
                <GrFormNext size={15} />
            </button>
        </div>
    );
};