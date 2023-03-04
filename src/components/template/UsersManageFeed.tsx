import React from 'react'
import { FinalSheetProps, userProps } from '../../types/sheetTypes';
import UserCard from './UserCard';
interface UsersManageFeed{
  sheet: FinalSheetProps;
  setCurrentEditingUser: (user: userProps) => void;
  deleteUser: (user: userProps) => Promise<void>;
}
function UsersManageFeed(props:UsersManageFeed) {
  const {sheet, setCurrentEditingUser, deleteUser} = props;
  return (
    <ul>
    <UserCard
      user={sheet.users.find(user => user.role === "owner")}
      deleteUser={deleteUser}
      setCurrentEditingUser={setCurrentEditingUser}
    />
    {sheet.users.map((user) => {
      return user.role !== "owner" ? (
        <UserCard
          user={user}
          deleteUser={deleteUser}
          setCurrentEditingUser={setCurrentEditingUser}
        />
      ) : (
        <></>
      );
    })}
  </ul>
  )
}
export default React.memo(UsersManageFeed);