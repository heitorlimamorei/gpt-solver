import { firebaseTimesStampType } from "../../utils/dateMethods";
import Button from '../Button';
import Input from '../input';
import Select from '../template/Select';
import { memo, useCallback } from "react";
interface WriteableMagicLinkProps {
  name: string;
  targetSheet: string;
  targetRole: string;
  expires?: firebaseTimesStampType;
}

interface CreateOrEditModalProps {
  formData: WriteableMagicLinkProps;
  handleSubmit: (event: any) => Promise<void>;
  handleChange: (event: any) => void;
  isEditMode: boolean;
  onCancel: () => void;
  setFormData: (newState: any) => void;
  rolesList: string[];
}

const CreateOrEdit = (props:CreateOrEditModalProps) => {
  const { formData, handleSubmit, handleChange, onCancel, setFormData, rolesList } = props;

  return (
    <form onSubmit={handleSubmit} className={`w-full h-full`}>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Nome
        </label>
        <Input
          ClassName=""
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="type">
          Cargo desejado
        </label>
        <Select
          options={rolesList}
          id="targetRole"
          selected={formData.targetRole}
          handleselected={handleChange}
          name="targetRole"
          ClassName="p-3"
        />
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          type="submit"
          text={"Salvar"}
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-tor from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={onCancel}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </form>
  )
}

export default memo(CreateOrEdit);

