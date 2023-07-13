import { memo, useCallback, useMemo } from "react"
import { firebaseTimesStampType, firestoreTimestampToDate } from "../../utils/dateMethods";
import variaveis from "../../model/variaveis";
import { ClipboardDocumentCheckIcon } from "../icons/Icones";
interface MagicLinkProps {
    id: string;
    name: string;
    targetSheet: string;
    targetRole: string;
    author: string;
    expires: firebaseTimesStampType;
}

interface LinkCardProps{
    magicLink: MagicLinkProps;
    setEditMode: (current: MagicLinkProps) => void;
    handleDelete: (id: string, targetSheet: string) => Promise<void>;
}

const LinkCard = (props: LinkCardProps) => {
  const { magicLink, setEditMode, handleDelete } = props;
  const { BASE_URL } = variaveis;

  const getWhenLinkWillExpires = useCallback((expires: firebaseTimesStampType) => {
    const currentDate = firestoreTimestampToDate(expires);
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }, []); // returns an object that have day, month, year properties

  const {day, month, year} = useMemo(() => getWhenLinkWillExpires(magicLink.expires), [magicLink]); // expires date data

  const copyInvitationToTheCliboard = useCallback(() => { // that send to the clipboard the invitation link
    const inviteLink = `${BASE_URL}/magic-link/${magicLink.id}`
    navigator.clipboard.writeText(inviteLink);
  }, [magicLink]);

  return (
    <li
      className="flex flex-col mx-3 shadow-[5px_5px_10px_#696c6f,-5px_-5px_10px_#ffffff] 
   dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A] p-5 my-5 md:w-[18%] w-full rounded-md dark:text-white"
    >
      <h1 className="font-bold text-2xl">{magicLink.name}</h1>
      <div className="flex items-center  my-2 w-2/3">
        <span
          className={`transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 mr-1
      shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
      dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
      hover:text-gray-500 dark:text-white cursor-pointer`}
      onClick={copyInvitationToTheCliboard}
        >
          {ClipboardDocumentCheckIcon(6)}
        </span>
        <h3 className="font-thin my-1 ">{magicLink.id}</h3>
      </div>

      <p>
        <span className="font-bold">Expira: </span>
        {day < 10 ? `0${day}` : day}/{month < 10 ? `0${month}` : month}/{year}
      </p>

      <div className="flex w-2/3">
      <button
        onClick={() => setEditMode(magicLink)}
        className="dark:bg-[#232323] bg-[#E0E5EC] 
        dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838]
        shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] p-3 rounded-xl mr-2 mt-5"
      >
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]">
          Revisar
        </p>
      </button>

      <button
        className="dark:bg-[#232323] bg-[#E0E5EC] 
        dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838]
        shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] p-3 rounded-xl ml-2 mt-5"
        onClick={(ev) => {
          handleDelete(magicLink.id, magicLink.targetSheet);
        }}
      >
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]">
          Deletar
        </p>
      </button>
      </div>

      
    </li>
  );
}

export default memo(LinkCard);