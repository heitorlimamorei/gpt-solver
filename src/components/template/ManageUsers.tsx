import React, { useEffect, useState } from "react";
import Input from "../input";
import Button from "../Button";
import Select from "./Select";
import useSheets from "../../data/hook/useSheets";
import { trashIcon } from "../icons/Icones";
interface ManageSheetProps {
  toggleIsOpen: () => void;
}
interface currentEditingUserProps {
  id: string;
  email: string;
  role: string;
}
function ManageUsers(props: ManageSheetProps) {
  const { toggleIsOpen } = props;
  const [currentEditingUser, setCurrentEditingUser] =
    useState<currentEditingUserProps>(null);
  const { sheet, updateUser, createUser, deleteUser } = useSheets();
  useEffect(() => {}, [sheet.data]);
  return (
    <div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Edite seus usuarios
        </label>
        <ul>
          {sheet.users.map((user) => {
            return (
              <li
                className="flex flex-row my-3 rounded-xl items-center transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] shadow-[4.5px_4.5px_10px_#f6f7fb,_-4.5px_-4.5px_10px_#FFFFFF]
              dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]"
                key={user.id}
              >
                <h1 className="mx-4 w-[80%]">{user.email}</h1>
                <p>{user.role}</p>
                <div className="w-full flex flex-row items-end justify-end">
                  {user.role === "owner" ? (
                    <></>
                  ) : (
                    <Button
                      iconClassName="text-red-600"
                      ClassName="dark:bg-[#232323] bg-[#E0E5EC] 
                  dark:shadow-[3px_3px_12px_#0e0e0e,-3px_-3px_12px_#383838]
                  shadow-[3px_3px_12px_#727578,-3px_-3px_12px_#ffffff] rounded-xl p-1 justify-self-end mr-5 my-1"
                      onClick={
                        user.role === "owner"
                          ? false
                          : async () => await deleteUser(user)
                      }
                      icon={trashIcon(6)}
                      text=""
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={toggleIsOpen}
          text="Fechar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
          iconClassName={""}
          icon={undefined}
        ></Button>
      </div>
    </div>
  );
}
export default React.memo(ManageUsers);
