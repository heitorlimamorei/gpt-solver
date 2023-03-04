import React, { useCallback, useEffect, useState } from 'react'
import Input from '../input';
import Select from './Select';
interface formDataProps {
  email: string;
  role: string;
  id: string;

}
interface CreateOrEditUserProps {
  currentUser: {
    email: string;
    role: string;
    id: string;
  }
  handleSubmit: (ev: any, formData:formDataProps ) => Promise<void>;
  isEditMode: boolean;
}

export default function CreateOrEditUser(props: CreateOrEditUserProps) {
  const { currentUser, handleSubmit, isEditMode } = props;
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    role: "viewer",
    id: ""
  });
  const roleOptions = [
    "admin",
    "editor",
    "viewer",
  ]
  useEffect(() => {
    setFormData({
      email: currentUser.email,
      role: currentUser.role,
      id: currentUser.id
    })
  }, [props.currentUser])
  const handleChange = useCallback((event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  }, []);
  return (
    <form onSubmit={(ev) => handleSubmit(ev, formData)} className={`w-full h-full`}>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Email
        </label>
        <Input
          ClassName=""
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="role">
          Cargo
        </label>
        <Select
          options={roleOptions}
          id="role"
          selected={formData.role}
          handleselected={handleChange}
          name="role"
          ClassName="p-3"
        />
      </div>
    </form>
  )
}


