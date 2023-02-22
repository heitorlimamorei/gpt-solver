/* eslint-disable @next/next/no-img-element */
import Link from "../../../node_modules/next/link"
import { useSession } from "next-auth/react"
import { userAvatarDefault } from '../icons/Icones'
interface AvatarUsuarioProps {
    className?: string
}
export default function Avatar(props:AvatarUsuarioProps){
    const {data} =  useSession()
    return (
            <Link href='/perfil'>
                {data.user.image ? (
                     <img 
                     src={data.user.image} 
                     alt="avatar"
                     className={`
                             h-10 w-10 rounded-full cursor-pointer ml-3
                             ${props.className}
                         `}
                     />
                ) : (
                    <span
                    className="cursor-pointer h-10 w-10 "
                    >{userAvatarDefault(9)}</span>
                )}
            </Link>
    )
}