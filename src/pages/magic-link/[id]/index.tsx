import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "../../../components/template/Layout";
import ModalForm from "../../../components/template/ModalForm";
import variaveis from "../../../model/variaveis";
import { useRouter } from "next/router";

import { firebaseTimesStampType } from "../../../utils/dateMethods";
import Cliper from "../../../components/Clipers/Cliper";
import Button from "../../../components/Button";
interface MagicLinkProps {
  id: string;
  name: string;
  targetSheet: string;
  targetRole: string;
  author: string;
  expires: firebaseTimesStampType;
}

export default function AcceptInvitation() {
  const { BASE_URL } = variaveis;
  const session = useSession();
  const router = useRouter();
  const [magicLinkIsLoding, setMagicLinkIsLoding] = useState(true);
  const [magicLink, setMagicLink] = useState<MagicLinkProps>(null);

  let email = session.data?.user.email;
  let magicLinkId: any = router.query.id;

  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        if (magicLinkId != undefined && magicLinkId.length > 0) {
          setMagicLinkIsLoding(true);
          axios
            .get(`${BASE_URL}/api/magic-link/${magicLinkId}`)
            .then((response: any) => {
              let magicLink: MagicLinkProps = response.data;
              setMagicLink(magicLink);
              setMagicLinkIsLoding(false);
            });
        }
      }
    }
  }, [email, magicLinkId]);

  async function acceptInvitation() {
    if (!magicLinkIsLoding) {
      const resp = await axios.post(
        `${BASE_URL}/api/magic-link/accept-invitation`,
        {
          linkId: magicLink.id,
          email: email,
        }
      );
      router.push(`${BASE_URL}/sheet/${magicLink.targetSheet}`)
    }
  }

  return (
    <div className={`lg:h-[200vh] flex items-center h-[200vh] w-[100%]`}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        {!magicLinkIsLoding ? (
          <ModalForm isOpen={true}>
            <div className={`flex flex-col justify-items-center items-center w-full h-full`}>
              <h1 className="text-xl mb-4">{magicLink.name}</h1>
              <div className="mb-5 text-center">
              <h2 className="mb-2 text-sm font-semibold ">
                Você deseja aceitar o convite de {magicLink.author} ?
              </h2>
              <p className="text-sm">
                Esse Magic link, vai adicionar você com o cargo de <a className="text-red-600 font-semibold">{magicLink.targetRole}</a> na planilha de código: {magicLink.targetSheet}
              </p>
              </div>
              <p></p>
              <div className="flex w-full justify-center mt-5 mb-3">
                <Button
                  ClassName="px-4 py-2 mr-5 rounded-md"
                  onClick={() => {
                    router.push('/')
                  }}
                  text="Recusar"
                  textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
                  iconClassName={""}
                  icon={undefined}
                ></Button>
                 <Button
                  ClassName="px-4 py-2 ml-5 rounded-md"
                  onClick={acceptInvitation}
                  text="Aceitar"
                  textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
                  iconClassName={""}
                  icon={undefined}
                ></Button>
              </div>

              <div className="flex flex-col items-center mt-5">
                <h3 className="font-bold">Atenção!</h3>
                <p className="text-sm text-gray-400">
                   O serviço de Magic Link está em fase de teste
                  inicial
                </p>
                <p className="text-sm text-gray-400">
                  é possivel que ocorra erros.
                </p>
              </div>
            </div>
          </ModalForm>
        ) : (
          <div className="flex items-center justify-center mt-12">
            <Cliper isLoading={magicLinkIsLoding} size={60} />
          </div>
        )}
      </Layout>
    </div>
  );
}
