import React from 'react';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   setPage: (page: number) => void;
// }

const Pagination = ({ currentPage, totalPages, setPage }: { currentPage: number, totalPages: number, setPage: (page: number) => void }) => {
    const generatePageNumbers = (): (number | string)[] => {
        const pageNumbers: (number | string)[] = [];
        const maxVisiblePages = 7;

        if (currentPage <= 3) {
            for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
                pageNumbers.push(i);
            }
            if (totalPages > maxVisiblePages) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        } else if (currentPage >= totalPages - 2) {
            for (let i = Math.max(1, totalPages - maxVisiblePages + 1); i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            if (totalPages > maxVisiblePages) {
                pageNumbers.unshift('...');
                pageNumbers.unshift(1);
            }
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pageNumbers.push(i);
            }
            if (currentPage - 3 > 1) {
                pageNumbers.unshift('...');
                pageNumbers.unshift(1);
            }
            if (currentPage + 3 < totalPages) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    const onPageChange = (page: number | string): void => {
        if (typeof page === 'number' && page >= 1 && page <= totalPages) {
            setPage(page);
        }
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="list-style-none flex justify-center gap-1 mt-4">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300  dark:text-white dark:hover:bg-neutral-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {generatePageNumbers().map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className="relative block px-3 py-1.5 text-sm text-white">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`relative block rounded px-3 py-1.5 text-sm ${currentPage === page
                                    ? 'bg-hBgColor text-black' // Active page styling
                                    : 'text-white hover:bg-hBgColor hover:text-black dark:text-white dark:hover:bg-neutral-700'
                                    } transition-all duration-300`}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300  dark:text-white dark:hover:bg-neutral-700 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
