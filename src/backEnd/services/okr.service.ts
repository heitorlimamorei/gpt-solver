import { IOkrProps, newOkrJsonProps } from '../../types/sheetTypes';
import okrRepository from '../repositories/okr.repository';
import sheetRepository from '../repositories/sheet.repository';
import sheetAuthservice from '../auth/sheet.authservice';
import { toggleJsonToDate } from '../../utils/dateMethods';

type JsonDate = string;

interface updatedOkrJson {
  id: string;
  sheetId: string;
  start_cycle: JsonDate;
  end_cycle: JsonDate; 
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

const verifyCredentials = async (email: string, sheetId: string): Promise<void> => {
  const requestedSheetExists = await sheetRepository.sheetExists(sheetId);

  if (!requestedSheetExists) throw new Error(`Requested target sheet does not exist.`);

  const haveRequestedPermission = await sheetAuthservice.checkPermission(
    email,
    sheetId,
    'canManageSheetProps',
  );

  if (!haveRequestedPermission) throw new Error(`User doesn't have needed permission.`);
  return;
};

async function createNewOkr(newOkr: newOkrJsonProps): Promise<void> {
  await verifyCredentials(newOkr.author, newOkr.sheetId);
  return await okrRepository.createOkr({
    ...newOkr,
    start_cycle: toggleJsonToDate(newOkr.start_cycle),
    end_cycle: toggleJsonToDate(newOkr.end_cycle),
  });
}

async function updateOkr(updatedOkr: updatedOkrJson): Promise<void> {
  await verifyCredentials(updatedOkr.author, updatedOkr.sheetId);
  return okrRepository.updateOkr({
    ...updatedOkr,
    start_cycle: toggleJsonToDate(updatedOkr.start_cycle),
    end_cycle: toggleJsonToDate(updatedOkr.end_cycle),
  });
}

const getAllOkrs = async ():Promise<IOkrProps[]> => await okrRepository.getAllOkrs();

const getOkrBySheetId = async (sheetId: string):Promise<IOkrProps[]> => await okrRepository.getOkrsBySheetId(sheetId);

const getOkrById = async (id: string):Promise<IOkrProps> => await okrRepository.getOkrById(id);

export default {
  createNewOkr,
  updateOkr,
  getAllOkrs,
  getOkrById,
  getOkrBySheetId,
};
