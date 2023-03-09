import { useState, memo, useCallback } from "react";
import Button from "../Button";
import useSheets from "../../data/hook/useSheets";
import UsersManageFeed from "./UsersManageFeed";
import CreateNewUser from "./CreateOrEditUser";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const { sheet, deleteUser } = useSheets();
  function renderModalContent() {
    if (!!currentEditingUser) {
      return (
        <CreateNewUser
          currentUser={currentEditingUser}
          isEditMode={isEditMode}
          toggleIsOpen={toggleIsOpen}
          setIsEditMode={setIsEditMode}
          setCurrentUser={setCurrentEditingUser}
        />
      );
    } else {
      return (
        <>
          <UsersManageFeed
            setEditMode={setIsEditMode}
            sheet={sheet}
            deleteUser={deleteUser}
            setCurrentEditingUser={setCurrentEditingUser}
            
          />
          <div className="flex justify-between mt-5 flex-wrap"> 
          <Button
              ClassName=" px-3 py-2 rounded-md shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff]
              dark:shadow-[8px_8px_6px_#1C1C1C,_-3px_-3px_6px_#2A2A2A]"
              onClick={() => {
                setCurrentEditingUser({
                  email: "",
                  role: "viewer",
                  id: ""
                })
                setIsEditMode(false);
              }}
              text="Criar novo usuário"
              textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
              iconClassName={""}
              icon={undefined}
            ></Button>
            <Button
              ClassName="px-3 py-2 rounded-md shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff]
              dark:shadow-[8px_8px_6px_#1C1C1C,_-3px_-3px_6px_#2A2A2A]"
              onClick={toggleIsOpen}
              text="Fechar"
              textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
              iconClassName={""}
              icon={undefined}
            ></Button>
            
          </div>
        </>
      );
    }
  }
  return (
    <div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Edite seus usuários
        </label>
      </div>
      {renderModalContent()}
    </div>
  );
}
export default memo(ManageUsers);
