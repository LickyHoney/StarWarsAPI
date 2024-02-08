// ParentComponent.tsx
import React, { useState } from 'react';
import Pagination from './Pagination';

const ParentComponent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 10; // Example total number of pages

    const handlePageChange = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    return (
        <div>
            {/* Your other content */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default ParentComponent;
