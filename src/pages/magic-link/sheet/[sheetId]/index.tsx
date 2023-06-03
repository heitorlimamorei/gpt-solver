import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "../../../../components/template/Layout";
import Feed from "../../../../components/MagicLink/Feed";

import variaveis from "../../../../model/variaveis";

import { firebaseTimesStampType } from "../../../../utils/dateMethods";

import axios from "axios";
import ModalForm from "../../../../components/template/ModalForm";
import CreateOrEdit from "../../../../components/MagicLink/CreateOrEdit";

import RolesData from "../../../../backEnd/auth/Roles";

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
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const toggleIsOpen = useCallback(() => setModalIsOpen(current => !current), []);

  const { roles } = RolesData;

  const getRoles = () => {
    const writeableRoles = roles.filter(({name}) => name !== "owner");
    return writeableRoles.map(({name}) => name );
  }

  const rolesList = getRoles();

  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      if (!currentEditingItem) {
        const { status } = await axios.post(`${BASE_URL}/api/magic-link`, {
          name: formData.name,
          author: email,
          targetSheet: formData.targetSheet,
          targetRole: !!formData.targetRole ? formData.targetRole : rolesList[0],
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
      sheetId: targetSheet
    })
    setMagicLinks(current => !!data ? data : current);
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
    if(!!sheetId) setFormData({...formDataMock, targetSheet: sheetId});
  }, [sheetId]);

  const handleFormChange = useCallback((newState: any) => setFormData({...newState}), []);
  return (
    <div className={`lg:h-[200vh] flex items-center h-[200vh] w-[100%]`}>
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

        <Feed
          email={email}
          sheetId={sheetId}
          setLinks={setMagicLinks}
          setEditMode={setEditMode}
          links={magicLinks}
          handleDelete={handleDelete}
        />
      </Layout>
    </div>
  );
}
