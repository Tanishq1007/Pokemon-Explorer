"use client"

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      
      if (start > 1) {
        pages.unshift(-1);
        pages.unshift(1);
      }
      if (end < totalPages) {
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <div className="flex gap-2">
        {getPageNumbers().map((pageNum, index) => (
          pageNum === -1 ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-white">...</span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded-md ${
                currentPage === pageNum
                  ? 'bg-red-600 text-white'
                  : 'text-white hover:bg-red-700'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
