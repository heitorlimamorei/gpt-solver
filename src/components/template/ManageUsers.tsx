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
  const { sheet, updateUser, createUser, deleteUser } = useSheets();
  const handleSubmit = useCallback(async(ev, formData: formDataProps) => {
    ev.preventDefault();
    if(!isEditMode){
      await createUser(formData);
    } else {
      await updateUser(formData);
    }
    setIsEditMode(false);
    setCurrentEditingUser(null);
  }, [])
  function renderModalContent() {
    if (!!currentEditingUser) {
      return <CreateNewUser currentUser={currentEditingUser} handleSubmit={handleSubmit} isEditMode={isEditMode} />;
    } else {
      return (
        <UsersManageFeed
          sheet={sheet}
          deleteUser={deleteUser}
          setCurrentEditingUser={setCurrentEditingUser}
        />
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
export default memo(ManageUsers);
