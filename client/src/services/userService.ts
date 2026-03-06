import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserIntrf } from "../models/authModel";
import DataServices from "./dataService";

export default function UserServices(user_id: string) {
    const queryClient = useQueryClient();
    const { changeData, deleteData, getData } = DataServices();

    const { data: userAccess, isLoading: userAccessLoad, error: userAccessError } = getData<UserIntrf>({
        api_url: `${import.meta.env.VITE_API_BASE_URL}/users/get/${user_id}`,
        query_key: [`current-user-${user_id}`],
        stale_time: 1200000,
    });

    const changeUserDataMt = useMutation({
        mutationFn: async (user_data: Pick<UserIntrf, "email" | "username">) => {
            await changeData<UserIntrf>({
                api_url: `${import.meta.env.VITE_BASE_API_URL}/user/delete/${user_id}`,
                data: {
                    email: user_data.email.trim(),
                    username: user_data.username.trim()
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`user-data-${user_id}`] });
        }
    });

    const deleteUserDataMt = useMutation({
        mutationFn: async () => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/user/delete/${user_id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${user_id}`] });
            queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${user_id}`] });
            queryClient.invalidateQueries({ queryKey: [`user-data-${user_id}`] });
        }
    });

    return { changeUserDataMt, deleteUserDataMt, userAccess, userAccessError, userAccessLoad }
}