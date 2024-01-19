import React from "react";
import { useNavigate } from "react-router-dom";

interface iProps {
  item: {
    accountId: string;
    email: string;
    authToken: string;
    creationDate: string;
  };
}

const AccountsItem: React.FC<iProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(`/${item.accountId}`);
    // console.log(item.accountId);
  };

  return (
    <tr onClick={handleClickItem}>
      <td>{item.accountId}</td>
      <td>{item.email}</td>
      <td>{item.authToken}</td>
      <td>{item.creationDate}</td>
    </tr>
  );
};

export default AccountsItem;
