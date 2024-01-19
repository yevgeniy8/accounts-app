import React from "react";
import "../CampaignsTable/CampaignsTable.css";

interface iProps {
  item: {
    campaignId: string;
    clicks: string;
    cost: string;
    date: string;
  };
}

const CampaignsItem: React.FC<iProps> = ({ item }) => {
  const handleClickItem = () => {
    // console.log(item.campaignId);
  };

  return (
    <tr onClick={handleClickItem}>
      <td>{item.campaignId}</td>
      <td>{item.clicks}</td>
      <td>{item.cost}</td>
      <td>{item.date}</td>
    </tr>
  );
};

export default CampaignsItem;
