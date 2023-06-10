import { memo } from "react";
import { userProps } from "../../types/sheetTypes";
import Button from "../Button";
import { trashIcon, editIcon } from "../icons/Icones";
interface UserCardProps {
  user: userProps;
  deleteUser: (user: userProps) => Promise<void>;
  setCurrentEditingUser: (user: userProps) => void;
  setEditMode: (mode: boolean) => void;
}

const Capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const removeDomain = (userEmail: string) => userEmail.replace(/@.*/, "");

function UserCard(props: UserCardProps) {
  const { user, deleteUser, setCurrentEditingUser, setEditMode } = props;
  return (
    <li
      className={
        user.role === "owner"
          ? "flex flex-row my-3 rounded-xl items-center bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] shadow-[inset_5px_5px_15px_#696c6f,inset_-5px_-5px_15px_#ffffff] dark:shadow-[inset_5px_5px_10px_#101010,inset_-5px_-5px_10px_#363636] w-full h-[4rem]"
          : `flex flex-row my-3 rounded-xl items-center bg-gradient-to-br from-[#FFFFFF] w-full to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff]
      dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A] h-[4rem]`
      }
    >
      <h1 className="md:mx-4 w-full ml-6 md:text-base text-xs w-[70%]">
        <span className="flex md:hidden">{removeDomain(user.email)}</span>
        <span className="hidden md:flex">{user.email}</span>
      </h1>
      <p
        className={
          user.role === "owner"
            ? "text-red-600 font-bold md:text-base text-xs"
            : user.role === "admin"
            ? "text-green-600 font-bold md:text-base text-xs"
            : user.role === "editor"
            ? "text-blue-600 font-bold md:text-base text-xs"
            : "text-gray-600 font-bold md:text-base text-xs"
        }
      >
        {Capitalize(user.role)}
      </p>
      <div className="w-[30%] flex flex-row items-end justify-end">
        {user.role === "owner" ? (
          <div className="hidden"/>
        ) : (
          <>
            <Button
              iconClassName="text-red-600"
              ClassName="dark:bg-[#232323] bg-[#E0E5EC] 
                  dark:shadow-[3px_3px_12px_#0e0e0e,-3px_-3px_12px_#383838]
                  shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff] rounded-xl p-1 justify-self-end ml-3 mr-2 my-1"
              onClick={
                user.role === "owner"
                  ? false
                  : async () => await deleteUser(user)
              }
              icon={trashIcon(6)}
              text=""
            />
            <Button
              iconClassName="text-green-600"
              ClassName="dark:bg-[#232323] bg-[#E0E5EC] 
                  dark:shadow-[3px_3px_12px_#0e0e0e,-3px_-3px_12px_#383838]
                  shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff] rounded-xl p-1 justify-self-end mr-3 my-1"
              onClick={
                user.role === "owner"
                  ? false
                  : async () => {
                      setCurrentEditingUser(user);
                      setEditMode(true);
                    }
              }
              icon={editIcon(6)}
              text=""
            />
          </>
        )}
      </div>
    </li>
  );
}
export default memo(UserCard);
