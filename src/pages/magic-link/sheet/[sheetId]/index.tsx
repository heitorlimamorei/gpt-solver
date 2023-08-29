import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
;
import { useRouter } from "next/router";

import Layout from "../../../../components/template/Layout";
import Feed from "../../../../components/MagicLink/Feed";

import variaveis from "../../../../model/variaveis";

import { firebaseTimesStampType } from "../../../../utils/dateMethods";

import axios from "axios";
import ModalForm from "../../../../components/template/ModalForm";
import CreateOrEdit from "../../../../components/MagicLink/CreateOrEdit";

import RolesData from "../../../../backEnd/auth/Roles";
import Button from "../../../../components/Button";
import { plusIcon } from "../../../../components/icons/Icones";

interface MagicLinkProps {
  id: string;
  name: string;
  targetSheet: string;
  targetRole: string;
  author: string;
  expires: firebaseTimesStampType;
}

interface newMagicLinkProps {
  name: string;
  targetSheet: string;
  targetRole: string;
  expires?: firebaseTimesStampType;
}

export default function MagicLinkHub() {
  const { BASE_URL } = variaveis;
  const session = useSession();
  const router = useRouter();

  let email = session.data?.user.email;
  let sheetId: any = router.query.sheetId;

  const formDataMock = {
    name: "",
    targetSheet: "",
    targetRole: "",
  };

  const [currentEditingItem, setCurrentEditingItem] =
    useState<MagicLinkProps>(null);
  const [magicLinks, setMagicLinks] = useState<MagicLinkProps[]>(null);
  const [formData, setFormData] = useState<newMagicLinkProps>(formDataMock);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleIsOpen = useCallback(
    () => setModalIsOpen((current) => !current),
    []
  );

  const { roles } = RolesData;

  const getRoles = () => {
    const writeableRoles = roles.filter(({ name }) => name !== "owner");
    return writeableRoles.map(({ name }) => name);
  };

  const rolesList = getRoles();

  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      if (!currentEditingItem) {
        const { status } = await axios.post(`${BASE_URL}/api/magic-link`, {
          name: formData.name,
          author: email,
          targetSheet: formData.targetSheet,
          targetRole: !!formData.targetRole
            ? formData.targetRole
            : rolesList[0],
        });

        if (status === 200) {
          const { data } = await axios.post(
            `${BASE_URL}/api/magic-link/bysheetId`,
            {
              email: email,
              targetSheet: sheetId,
            }
          );
          setMagicLinks(data);
        }
      } else {
        const { status } = await axios.put(`${BASE_URL}/api/magic-link`, {
          ...currentEditingItem,
          name: formData.name,
          targetSheet: formData.targetSheet,
          targetRole: formData.targetRole,
        });

        if (status === 200) {
          const { data } = await axios.post(
            `${BASE_URL}/api/magic-link/bysheetId`,
            {
              email: email,
              targetSheet: sheetId,
            }
          );
          setMagicLinks(data);
        }
      }

      setFormData(formDataMock);
      setCurrentEditingItem(null);
      toggleIsOpen();
    },
    [currentEditingItem, formData, email]
  );

  const handleDelete = useCallback(async (id: string, targetSheet: string) => {
    const { data } = await axios.post(`${BASE_URL}/api/magic-link/${id}`, {
      sheetId: targetSheet,
    });
    setMagicLinks((current) => (!!data ? data : current));
  }, []);

  const setEditMode = useCallback((currentLink: MagicLinkProps) => {
    setCurrentEditingItem(currentLink);
    setFormData({
      name: currentLink.name,
      expires: currentLink.expires,
      targetSheet: currentLink.targetSheet,
      targetRole: currentLink.targetRole,
    });
    toggleIsOpen();
  }, []);

  const handleChange = useCallback((event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  }, []);

  const handleCancel = useCallback(() => {
    setFormData(formDataMock);
    toggleIsOpen();
  }, []);

  useEffect(() => {
    if (!!sheetId) setFormData({ ...formDataMock, targetSheet: sheetId });
  }, [sheetId]);

  const handleFormChange = useCallback(
    (newState: any) => setFormData({ ...newState }),
    []
  );
  return (
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <ModalForm isOpen={modalIsOpen}>
          <CreateOrEdit
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isEditMode={currentEditingItem != null}
            onCancel={handleCancel}
            setFormData={handleFormChange}
            rolesList={rolesList}
          />
        </ModalForm>
        <div className="flex flex-row my-8 justify-between w-full">
          <h1 className="font-bold text-xl dark:text-white">
            Seus links ativos:
          </h1>
          <Button
            ClassName=" justify-self-end md:p-4 mr-3 p-2 rounded-md shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff]
          dark:shadow-[8px_8px_6px_#1C1C1C,_-3px_-3px_6px_#2A2A2A]"
            onClick={toggleIsOpen}
            text={`Criar Link`}
            textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
            iconClassName="dark:text-[#00F0FF] text-[#1400FF] mr-2 font-bold"
            icon={plusIcon(6)}
          ></Button>
        </div>
        <Feed
          email={email}
          sheetId={sheetId}
          setLinks={setMagicLinks}
          setEditMode={setEditMode}
          links={magicLinks}
          handleDelete={handleDelete}
        />
      </Layout>
  );
}
