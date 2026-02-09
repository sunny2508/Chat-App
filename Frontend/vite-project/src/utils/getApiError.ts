import axios from "axios";
import type { ApiResponse } from "../Types/api";
import type { NormalisedError } from "../Types/error";

export function getApiError(error:unknown):NormalisedError{
    if(axios.isAxiosError(error))
    {
        const data = error.response?.data as ApiResponse<null> | undefined
        console.log(data);

        return{
            message:data?.message,
            fieldErrors:data?.fieldErrors
            
        }
    }

    if(error instanceof Error)
    {
        return {message:error.message}
    }

    return {message:"Something went wrong"}
}