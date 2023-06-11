import { useEffect } from 'react';
import axios from 'axios';
import variaveis from "../../model/variaveis";

import { firebaseTimesStampType } from "../../utils/dateMethods";
import LinkCard from './LinkCard';

interface MagicLinkFeed {
    email: string;
    sheetId: string;
    links: MagicLinkProps[];
    setLinks: (current:MagicLinkProps[]) => void;
    setEditMode: (current:MagicLinkProps) => void;
    handleDelete: (id: string, targetSheet: string) => Promise<void>;
}

interface MagicLinkProps {
    id: string;
    name: string;
    targetSheet: string;
    targetRole: string;
    author: string;
    expires: firebaseTimesStampType;
}

export default function Feed(props:MagicLinkFeed) {
  const { BASE_URL } = variaveis;
  const { email, sheetId, links, setLinks, setEditMode, handleDelete } = props;


  useEffect(() => {
    if (email !== undefined && sheetId !== undefined) {
      axios
        .post(`${BASE_URL}/api/magic-link/bysheetId`, {
          email: email,
          targetSheet: sheetId,
        })
        .then((resp) => setLinks(resp.data));
    }
  }, [email, sheetId]);

  return (
    <div>
      <h1 className='font-bold text-xl dark:text-white'>Seus links ativos:</h1>
      <ul className='flex md:flex-row md:flex-wrap flex-col'>
        {links &&
          links.map((link) => (
            <LinkCard
              key={link.id}
              magicLink={link}
              setEditMode={setEditMode}
              handleDelete={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
}
