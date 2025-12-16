import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { getProfile } from "@/features/profile/api/queries.api";


export const useProfileQuery = (id:string)=>{
return useQueryWithSideEffects({
    queryKey:["profile",id],
    queryFn:()=> getProfile(id),
    enabled: !!id
})
}
