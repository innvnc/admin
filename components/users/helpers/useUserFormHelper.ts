import { UseFormReturn } from "react-hook-form";

import { useUpdateUser } from "../hooks";

import { UserInputs } from "../validators";


export const useUserFormHelper = (
  id: string | undefined,
  form: UseFormReturn<UserInputs>,
) => {
  const { updateUserInfo } = useUpdateUser();

  const handleSave = async ( data: UserInputs, onClose: () => void ) => {
    if ( !id ) {
      onClose();

      return;
    }

    await updateUserInfo( id, data );
    onClose();
  };

  return {
    handleSave,
  };
};