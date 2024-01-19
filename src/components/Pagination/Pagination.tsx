import React from "react";
import "./Pagination.css";

interface iProps {
  perPage: number;
  total: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<iProps> = ({ perPage, total, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              className="pagination-item"
              href=""
              onClick={(evt) => {
                evt.preventDefault();
                paginate(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
