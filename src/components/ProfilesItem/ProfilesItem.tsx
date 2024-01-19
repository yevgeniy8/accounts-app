import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface iProps {
  item: {
    profileId: string;
    country: string;
    marketplace: string;
  };
}

const ProfilesItem: React.FC<iProps> = ({ item }) => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  // console.log(accountId);

  const handleClickItem = () => {
    navigate(`/${accountId}/${item.profileId}`);
    // console.log(item.profileId);
  };

  return (
    <tr onClick={handleClickItem}>
      <td>{item.profileId}</td>
      <td>{item.country}</td>
      <td>{item.marketplace}</td>
    </tr>
  );
};

export default ProfilesItem;
