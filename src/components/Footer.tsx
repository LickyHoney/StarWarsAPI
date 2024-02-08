// Import necessary dependencies
import React from 'react';

// Define props interface for Footer component
interface FooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
}

// Footer component
const Footer: React.FC<FooterProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Render the footer with pagination buttons
    return (
        <footer className="footer">
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNum => (
                    <button
                        key={pageNum}
                        className={pageNum === currentPage ? 'active' : ''}
                        onClick={() => onPageChange(pageNum)}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </footer>
    );
};


// Export Footer component
export default Footer;
