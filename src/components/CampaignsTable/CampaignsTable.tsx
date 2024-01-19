import React, { ChangeEvent, useRef, useState } from "react";
import campaigns from "./campaigns.json";
import CampaignsItem from "../CampaignsItem/CampaignsItem";
import { Link, useLocation, useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "../AccountsTable/AccountsTable.css";

const CampaignsTable: React.FC = () => {
  const [sortCampaigns, setSortCampaigns] = useState(campaigns);
  const [sortBy, setSortBy] = useState("Sort asc by clicks");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(10);

  const { accountId } = useParams();

  const handleClickSort = () => {
    if (sortBy === "Sort asc by clicks") {
      setSortCampaigns((prevState) => {
        const sorted = [...prevState].sort((a, b) =>
          a.clicks.localeCompare(b.clicks)
        );
        // console.log(sorted);
        return sorted;
      });

      setSortBy("Sort desc by clicks");
    }

    if (sortBy === "Sort desc by clicks") {
      setSortCampaigns((prevState) => {
        const sorted = [...prevState].sort((a, b) =>
          b.clicks.localeCompare(a.clicks)
        );
        // console.log(sorted);
        return sorted;
      });

      setSortBy("Sort asc by clicks");
    }
  };

  const handleClear = () => {
    setSortCampaigns(campaigns);
  };

  const handleChangeFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log(evt.target.value);
    setFilter(evt.target.value);
    setCurrentPage(1);
  };

  const visibleCampaigns = () => {
    if (filter === "") {
      return sortCampaigns;
    } else {
      return sortCampaigns.filter(
        (item) =>
          item.clicks.toLowerCase().includes(filter) ||
          item.cost.toLowerCase().includes(filter)
      );
    }
  };

  const location = useLocation();
  const loc = useRef(location.state?.from ?? `/${accountId}`);

  const lastCampaignIndex = currentPage * campaignsPerPage;
  const firstCampaignIndex = lastCampaignIndex - campaignsPerPage;
  const currentCampaigns = visibleCampaigns().slice(
    firstCampaignIndex,
    lastCampaignIndex
  );

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div>
      {/* <button onClick={handleClickSort}>{sortBy}</button>
      <button onClick={handleClear}>Clear</button>

      <Link to={loc.current}>Go back</Link>

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

      <Link className="link-back" to={loc.current}>Go back</Link>

      <table>
        <caption>Campaigns table</caption>
        <thead>
          <tr>
            <th>campaignId</th>
            <th>clicks</th>
            <th>cost</th>
            <th>date</th>
          </tr>
        </thead>

        {/* <tbody>
          {visibleCampaigns().map((item) => (
            <CampaignsItem key={item.campaignId} item={item} />
          ))}
        </tbody> */}

        <tbody>
          {currentCampaigns.map((item) => (
            <CampaignsItem key={item.campaignId} item={item} />
          ))}
        </tbody>
      </table>

      <Pagination
        perPage={campaignsPerPage}
        total={visibleCampaigns().length}
        paginate={paginate}
      />
    </div>
  );
};

export default CampaignsTable;
