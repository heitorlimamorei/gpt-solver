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
interface formDataProps {
  email: string;
  role: string;
  id: string;
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
          <div className="flex justify-between">
            <Button
              ClassName="px-4 py-2 rounded-md"
              onClick={toggleIsOpen}
              text="Fechar"
              textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
              iconClassName={""}
              icon={undefined}
            ></Button>
             <Button
              ClassName="px-4 py-2 rounded-md"
              onClick={() => {
                setCurrentEditingUser({
                  email: "",
                  role: "viewer",
                  id: ""
                })
                setIsEditMode(false);
              }}
              text="Criar novo usuário"
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
          Edite seus usuarios
        </label>
      </div>
      {renderModalContent()}
    </div>
  );
}
export default memo(ManageUsers);
