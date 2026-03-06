import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserIntrf } from "../models/authModel";
import DataServices from "./dataService";
import AuthServices from "./authService";

export default function UserServices() {
    const queryClient = useQueryClient();
    const { currentUserId } = AuthServices();
    const { changeData, deleteData, getData } = DataServices();

    const { data: userAccess, isLoading: userAccessLoad, error: userAccessError } = getData<UserIntrf>({
        api_url: `${import.meta.env.VITE_API_BASE_URL}/users/get/${currentUserId}`,
        query_key: [`current-user-${currentUserId}`],
        stale_time: 1800000,
    });

    const changeUserDataMt = useMutation({
        mutationFn: async (user_data: Pick<UserIntrf, "email" | "username">) => {
            await changeData<UserIntrf>({
                api_url: `${import.meta.env.VITE_BASE_API_URL}/user/delete/${currentUserId}`,
                data: {
                    email: user_data.email.trim(),
                    username: user_data.username.trim()
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`user-data-${currentUserId}`] });
        }
    });

    const deleteUserDataMt = useMutation({
        mutationFn: async () => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/user/delete/${currentUserId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] });
            queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${currentUserId}`] });
            queryClient.invalidateQueries({ queryKey: [`user-data-${currentUserId}`] });
        }
    });

    return { changeUserDataMt, deleteUserDataMt, userAccess, userAccessError, userAccessLoad }
}