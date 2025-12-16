import { profile__axios } from "@/axios.service";
import { Profile } from "@/features/profile/schemas/profile.schema";


export const getProfile = async(id:string)=>{
    const response = await profile__axios.get<Profile>(`/user/${id}`)
    return response.data

    
}