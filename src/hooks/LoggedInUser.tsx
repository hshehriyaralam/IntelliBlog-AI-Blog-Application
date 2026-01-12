import { useGetProfileQuery } from "@/Redux/Services/userApi";


export const useLoggedInUser = () => {
    const { data: loggedInUser, isLoading, isError } = useGetProfileQuery(undefined );
    const loggedInUserId =  loggedInUser?.user?._id;

    return { loggedInUser, loggedInUserId, isLoading, isError };
}
