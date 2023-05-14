import magicLinkRespository from "../repositories/magicLink.respository";
import sheetAuthservice from "../auth/sheet.authservice";
import sheetAuthController from "../auth/sheetAuthController";
import userRepository from "../repositories/user.repository";
import { hasDatePassed, firebaseTimesStampType } from "../../utils/dateMethods"

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

interface userProps {
    email: string;
    role: string;
    id: string;
}

async function getMagicLinkById(id: string) {
  return await magicLinkRespository.getMagicLinkById(id);
}

async function createMagicLink(newMagicLink: newMagicLinkProps) {
  if (
    await sheetAuthservice.checkPermission(
      newMagicLink.author,
      newMagicLink.targetSheet,
      "canEditUsers"
    )
  ) {
    return await magicLinkRespository.createMagicLink({ ...newMagicLink });
  } else {
    throw new Error(
      "ERROR: 401 User does not have permission to create a new MagicLink or the user doesn't exists."
    );
  }
}

async function updateMagicLink(updatedLink: MagicLinkProps) {
  if (
    await sheetAuthservice.checkPermission(
      updatedLink.author,
      updatedLink.targetSheet,
      "canEditUsers"
    )
  ) {
    return await magicLinkRespository.updateMagicLink({ ...updatedLink });
  } else {
    throw new Error(
      "ERROR: 401 User does not have permission to update a  MagicLink or the user doesn't exists or the target sheet doesn't."
    );
  }
}

async function getLinksByTargetSheet(userEmail: string, sheetId: string) {
  if (
    await sheetAuthservice.checkPermission(userEmail, sheetId, "canEditUsers")
  ) {
    return await magicLinkRespository.getLinksByTargetSheet(sheetId);
  } else {
    throw new Error(
      "ERROR: 401 User does not have permission to get the MagicLinks on this sheet or the user doesn't exists."
    );
  }
}


async function validateInvitation(
  magicLink: MagicLinkProps,
  formData: acceptInvitationFormData
) {
  if (await userRepository.userExistsByEmail(formData.email)) {
    const isAlreadyInvited = await sheetAuthservice.authenticate(
      formData.email,
      magicLink.targetSheet
    );

    if (!hasDatePassed(magicLink.expires) && !isAlreadyInvited) {
      return true;
    } else {
      return false;
    }

  } else {
    throw new Error("ERROR 400: User doesn't exists!")
  }
}


async function acceptInvitation(formData: acceptInvitationFormData) {
  const magicLink: MagicLinkProps = await getMagicLinkById(formData.linkId);

  if (await validateInvitation(magicLink, formData)) {
    const updatedListUsers: userProps[] = await sheetAuthController.createUser({
      email: formData.email,
      sheetId: magicLink.targetSheet,
      role: magicLink.targetRole,
    });

    const newUser = updatedListUsers.find(
      (user) => user.email === formData.email
    );

    const session = await sheetAuthservice.getSessionData(
      newUser.email,
      magicLink.targetSheet
    );

    return { ...session };
  } else {
    throw new Error("401: This Magic link is invalid");
  }
}

async function deleteMagicLink(id: string) {
  const currentLink = await magicLinkRespository.deleteLink(id);
}

async function deleteMagicLinkAndReturnList(id: string, sheetId: string) {
  await deleteMagicLink(id);
  return await magicLinkRespository.getLinksByTargetSheet(sheetId);
}


export default {
  getMagicLinkById,
  createMagicLink,
  updateMagicLink,
  getLinksByTargetSheet,
  acceptInvitation,
  deleteMagicLink,
  deleteMagicLinkAndReturnList
};
