// Import necessary dependencies
import React, { useState, useEffect } from 'react';

// Define props interface for Pagination component
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
}

// Define Pagination functional component
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // State to store visible page numbers
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    // Effect hook to update visible page numbers
    useEffect(() => {
         // Calculate window size (number of page numbers to display)
        const windowSize = currentPage; 
        const halfWindowSize = Math.floor(windowSize / 1);

        // Calculate start and end page numbers
        let startPage = Math.max(1, currentPage - halfWindowSize);
        const endPage = Math.min(totalPages, startPage + windowSize - 1);

        // Adjust startPage if the endPage is at the end of totalPages
        startPage = Math.max(1, endPage - windowSize + 1);

        // Generate an array of visible page numbers
        const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        setVisiblePages(pages);
    }, [currentPage, totalPages]);

    // Function to handle page click
    const handlePageClick = (pageNum: number) => {
      // Ensure pageNum is within valid range and not equal to current page
      if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
          onPageChange(pageNum);
          window.scrollTo(0,0); // Scroll to the top
      }
  };

  // Render Pagination component
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

// Export Pagination component
export default Pagination;
