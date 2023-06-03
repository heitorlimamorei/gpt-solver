import { memo, useCallback, useMemo } from "react"
import { firebaseTimesStampType, firestoreTimestampToDate } from "../../utils/dateMethods";

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

  const getWhenLinkWillExpires = useCallback((expires: firebaseTimesStampType) => {
    const currentDate = firestoreTimestampToDate(expires);
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }, []); // returns an object that have day, month, year properties

  const {day, month, year} = useMemo(() => getWhenLinkWillExpires(magicLink.expires), [magicLink]); // expires date data

  return (
   <li >
    <h1>{magicLink.name}</h1>
    <h3>{magicLink.id}</h3>
    <p>{day} / {month} / {year}</p>

    <button onClick={() => setEditMode(magicLink)} className="mx-2">revisar</button>
    
    <button onClick={(ev) => {
      handleDelete(magicLink.id, magicLink.targetSheet)
    }}>deletar</button>
   </li>
  )
}

export default memo(LinkCard);