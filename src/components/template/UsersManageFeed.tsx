import React from 'react'
import { FinalSheetProps, userProps } from '../../types/sheetTypes';
import UserCard from './UserCard';
interface UsersManageFeed{
  sheet: FinalSheetProps;
  setCurrentEditingUser: (user: userProps) => void;
  deleteUser: (user: userProps) => Promise<void>;
  setEditMode: (mode: boolean) => void;
}
function UsersManageFeed(props:UsersManageFeed) {
  const {sheet, setCurrentEditingUser, deleteUser, setEditMode} = props;
  const owner = sheet.users.find(user => user.role === "owner")
  return (
    <ul className='max-h-[15rem] overflow-y-scroll scroll-m-0'>
    <UserCard
      key={owner.id}
      user={owner}
      deleteUser={deleteUser}
      setCurrentEditingUser={setCurrentEditingUser}
      setEditMode={setEditMode}
    />
    {sheet.users.map((user) => {
      return user.role !== "owner" ? (
        <UserCard
          key={user.id}
          user={user}
          deleteUser={deleteUser}
          setCurrentEditingUser={setCurrentEditingUser}
          setEditMode={setEditMode}
        />
      ) : (
       false
      );
    })}
  </ul>
  )
}
export default React.memo(UsersManageFeed);