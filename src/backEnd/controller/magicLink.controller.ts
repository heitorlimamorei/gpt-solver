import magicLinkService from "../services/magicLink.service";
import { firebaseTimesStampType } from "../../utils/dateMethods"
interface newMagicLinkProps {
  name: string;
  targetSheet: string;
  targetRole: string;
  author: string;
}

interface MagicLinkProps {
  id: string;
  name: string;
  targetSheet: string;
  targetRole: string;
  author: string;
  expires: firebaseTimesStampType;
}

interface acceptInvitationFormData {
  email: string;
  linkId: string;
}

async function getMagicLinkById(id: string) {
  if (id != null && id != undefined) {
    return await magicLinkService.getMagicLinkById(id);
  } else {
    throw new Error('404: Empty magicLink id');
  }
}

async function getMagicLinksByTargetSheet(email: string, targetSheet: string) {
  if (
    targetSheet != null &&
    targetSheet != undefined &&
    email != null &&
    email != undefined
  ) {
    return await magicLinkService.getLinksByTargetSheet(email, targetSheet);
  } else {
    throw new Error("404: Empty magicLink id or targetSheet");
  }
}

async function createMagicLink(newMagicLink: newMagicLinkProps) {
  const isValidNewMagicLinkProps = (props: newMagicLinkProps) => {
    return (
      typeof props.name === "string" &&
      typeof props.targetSheet === "string" &&
      typeof props.targetRole === "string" &&
      typeof props.author === "string"
    );
  };

  if(isValidNewMagicLinkProps(newMagicLink)){
    return await magicLinkService.createMagicLink(newMagicLink);
  } else {
    throw new Error("400: Invalid newMagicLink properties!")
  }
}

async function updateMagicLink(updatedLink: MagicLinkProps) {
  const isValidMagicLinkProps = (props: MagicLinkProps) => {
    return (
      typeof props.id === "string" &&
      typeof props.name === "string" &&
      typeof props.targetSheet === "string" &&
      typeof props.targetRole === "string" &&
      typeof props.author === "string"
    );
  };

  if(isValidMagicLinkProps(updatedLink)){
    return await magicLinkService.updateMagicLink(updatedLink);
  } else {
    throw new Error("400: Invalid newMagicLink properties!")
  }
}

async function acceptInvitation(formData: acceptInvitationFormData) {
  const isValidFormDataProps = (props: acceptInvitationFormData) => {
    return typeof props.email === "string" && typeof props.linkId === "string";
  };

  if (isValidFormDataProps(formData)) {
    return await magicLinkService.acceptInvitation(formData);
  } else {
    throw new Error("400: Invalid form data out of format!");
  }
}

async function deleteLinkAndReturnList(id: string, sheetId: string) {
  return await magicLinkService.deleteMagicLinkAndReturnList(id, sheetId);
}

export default {
    getMagicLinkById,
    getMagicLinksByTargetSheet,
    createMagicLink,
    updateMagicLink,
    acceptInvitation,
    deleteLinkAndReturnList
}