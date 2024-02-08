import React from 'react';

interface FooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPage, totalPages, onPageChange }) => {
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



export default Footer;
