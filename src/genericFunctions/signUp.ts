import { makePOSTRequest } from "../request/rawRequest";
import { paramsSingup } from "../types/types";

export const signUp = async (
  params: paramsSingup,
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<void> => {
  console.log("register params", params);
  await makePOSTRequest("/register", params)
    .then((response) => {
      localStorage.setItem("authToken", response.authToken);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error.response);
      setMessage("an error occurs : " + error.response.data.error);
    });
};
