import React, { ChangeEvent, useRef, useState } from "react";
import profiles from "./profiles.json";
import ProfilesItem from "../ProfilesItem/ProfilesItem";
import "./ProfilesTable.css";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "../AccountsTable/AccountsTable.css";

const ProfilesTable: React.FC = () => {
  const [sortProfiles, setSortProfiles] = useState(profiles);
  const [sortBy, setSortBy] = useState("Sort asc by country");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(10);

  const handleClickSort = () => {
    if (sortBy === "Sort asc by country") {
      setSortProfiles((prevState) => {
        const sorted = [...prevState].sort((a, b) =>
          a.country.localeCompare(b.country)
        );
        // console.log(sorted);
        return sorted;
      });

      setSortBy("Sort desc by country");
    }

    if (sortBy === "Sort desc by country") {
      setSortProfiles((prevState) => {
        const sorted = [...prevState].sort((a, b) =>
          b.country.localeCompare(a.country)
        );
        // console.log(sorted);
        return sorted;
      });

      setSortBy("Sort asc by country");
    }
  };

  const handleClear = () => {
    setSortProfiles(profiles);
  };

  const handleChangeFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log(evt.target.value);
    setFilter(evt.target.value);
    setCurrentPage(1);
  };

  const visibleProfiles = () => {
    if (filter === "") {
      return sortProfiles;
    } else {
      return sortProfiles.filter(
        (item) =>
          item.country.toLowerCase().includes(filter) ||
          item.marketplace.toLowerCase().includes(filter)
      );
    }
  };

  const location = useLocation();
  const loc = useRef(location.state?.from ?? "/");

  const lastProfileIndex = currentPage * profilesPerPage;
  const firstProfileIndex = lastProfileIndex - profilesPerPage;
  const currentProfiles = visibleProfiles().slice(
    firstProfileIndex,
    lastProfileIndex
  );

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div>
      {/* <button onClick={handleClickSort}>{sortBy}</button>
      <button onClick={handleClear}>Clear</button>

      <label>
        Filter by email:
        <input type="text" value={filter} onChange={handleChangeFilter} />
      </label> */}

      <div className="wrapper-sort">
        <button className="button" onClick={handleClickSort}>
          {sortBy}
        </button>
        <button className="button" onClick={handleClear}>
          Clear
        </button>
        <label className="label">
          Filter:
          <input
            className="input"
            type="text"
            value={filter}
            onChange={handleChangeFilter}
          />
        </label>
      </div>

      <Link className="link-back" to={loc.current}>
        Go back
      </Link>

      <table>
        <caption>Profiles table</caption>
        <thead>
          <tr>
            <th>profileId</th>
            <th>country</th>
            <th>marketplace</th>
          </tr>
        </thead>

        {/* <tbody>
          {visibleProfiles().map((item) => (
            <ProfilesItem key={item.profileId} item={item} />
          ))}
        </tbody> */}

        <tbody>
          {currentProfiles.map((item) => (
            <ProfilesItem key={item.profileId} item={item} />
          ))}
        </tbody>
      </table>

      <Pagination
        perPage={profilesPerPage}
        total={visibleProfiles().length}
        paginate={paginate}
      />
    </div>
  );
};

export default ProfilesTable;
