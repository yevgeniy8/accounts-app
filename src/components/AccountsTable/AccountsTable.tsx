import React, { ChangeEvent, useState } from "react";
import "./AccountsTable.css";
import accounts from "./account.json";
import AccountsItem from "../AccountsItem/AccountsItem";
import Pagination from "../Pagination/Pagination";

const AccountsTable: React.FC = () => {
  const [sortAccounts, setSortAccounts] = useState(accounts);
  const [sortBy, setSortBy] = useState("Sort asc by email");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage] = useState(10);

  const handleClickSort = () => {
    if (sortBy === "Sort asc by email") {
      setSortAccounts((prevState) => {
        const sorted = [...prevState].sort((a, b) =>
          a.email.localeCompare(b.email)
        );
        // console.log(sorted);
        return sorted;
      });

      setSortBy("Sort desc by email");
    }

    if (sortBy === "Sort desc by email") {
      setSortAccounts((prevState) => {
        const sorted = [...prevState].sort((a, b) =>
          b.email.localeCompare(a.email)
        );
        // console.log(sorted);
        return sorted;
      });

      setSortBy("Sort asc by email");
    }
  };

  const handleClear = () => {
    setSortAccounts(accounts);
  };

  const handleChangeFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log(evt.target.value);
    setFilter(evt.target.value);
    setCurrentPage(1);
  };

  const visibleAccounts = () => {
    if (filter === "") {
      return sortAccounts;
    } else {
      return sortAccounts.filter((item) =>
        item.email.toLowerCase().includes(filter)
      );
    }
  };

  const lastAccountIndex = currentPage * accountsPerPage;
  const firstAccountIndex = lastAccountIndex - accountsPerPage;
  const currentAccounts = visibleAccounts().slice(
    firstAccountIndex,
    lastAccountIndex
  );

  // console.log(currentAccounts);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  // const nextPage = () => setCurrentPage((prevState) => prevState + 1);
  // const prevPage = () => setCurrentPage((prevState) => prevState - 1);

  return (
    <div>
      <div className="wrapper-sort">
        <button className="button" onClick={handleClickSort}>
          {sortBy}
        </button>
        <button className="button" onClick={handleClear}>
          Clear
        </button>
        <label className="label">
          Filter by email:
          <input className="input" type="text" value={filter} onChange={handleChangeFilter} />
        </label>
      </div>

      <table>
        <caption>Accounts table</caption>
        <thead>
          <tr>
            <th>accountId</th>
            <th>email</th>
            <th>authToken</th>
            <th>creationDate</th>
          </tr>
        </thead>

        <tbody>
          {currentAccounts.map((item) => (
            <AccountsItem key={item.accountId} item={item} />
          ))}
        </tbody>
      </table>

      <Pagination
        perPage={accountsPerPage}
        total={visibleAccounts().length}
        paginate={paginate}
      />

      {/* <button onClick={prevPage}>Prev Page</button>
      <button onClick={nextPage}>Next Page</button> */}
    </div>
  );
};

export default AccountsTable;
