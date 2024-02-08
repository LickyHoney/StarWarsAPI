import React, { useState, useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    useEffect(() => {
        const windowSize = currentPage; // Number of page numbers to display
        const halfWindowSize = Math.floor(windowSize / 1);
        let startPage = Math.max(1, currentPage - halfWindowSize);
        const endPage = Math.min(totalPages, startPage + windowSize - 1);

        // Adjust startPage if the endPage is at the end of totalPages
        startPage = Math.max(1, endPage - windowSize + 1);

        // Generate an array of visible page numbers
        const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        setVisiblePages(pages);
    }, [currentPage, totalPages]);

    const handlePageClick = (pageNum: number) => {
      if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
          onPageChange(pageNum);
          window.scrollTo(0,0); // Scroll to the top
      }
  };

    return (
        <div className="pagination">
            {/* Visible page numbers */}
            {visiblePages.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    className={pageNum === currentPage ? 'active' : ''}
                >
                    {pageNum}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
