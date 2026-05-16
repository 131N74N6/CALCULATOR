import { useEffect, useState } from "react";
import { Navbar1, Navbar2 } from "../components/Navbar";
import UserServices from "../services/user.service"

export default function Profile() {
    const [username, setUserName] = useState<string>('');
    
    function saveChanges(event: React.SyntheticEvent) {
        event.preventDefault();
        changeUserDataMt.mutate(username);
    }
    
    const { 
        changeUserDataMt, currentUserId, deleteUserDataMt, inEdit, 
        isProcessing, setInEdit, userAccess, userAccessError, userAccessLoad 
    } = UserServices();

    useEffect(() => {
        if (currentUserId && userAccess) setUserName(userAccess.username)
        else return;
    }, [currentUserId, inEdit]);

    return (
        <div className={`bg-[url(${import.meta.env.VITE_BACKGROUND})] h-screen flex flex-col md:flex-row gap-4 p-4`}>
            <div className="h-full min-h-50 flex flex-col gap-4 p-4 backdrop-blur-sm backdrop-brightness-50 w-full md:w-3/4 border rounded-2xl border-white">
                {userAccessError ? (
                    <div className="flex justify-center items-center h-full"></div>
                ) : userAccessLoad ? (
                    <div className="flex justify-center items-center h-full"></div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <span className="text-white text-font-medium text-[0.9rem]">Created At: {userAccess?.created_at}</span>
                        <span className="text-white text-font-medium text-[0.9rem]">Email: {userAccess?.email}</span>
                        <span className="text-white text-font-medium text-[0.9rem]">User Id: {userAccess?.user_id}</span>
                        {inEdit ? (
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setUserName(event.target.value)}
                                className="border border-white p-[0.4rem] text-white text-font-medium text-[0.9rem]"
                            />
                        ) : (
                            <span className="text-white text-font-medium text-[0.9rem]">Username: {userAccess?.username}</span>
                        )}
                        <div className="flex gap-2.5">
                            {inEdit ? (
                                <>
                                    <button 
                                        type="button" 
                                        onClick={() => setInEdit(false)}
                                        disabled={isProcessing}
                                        className="disabled:cursor-not-allowed cursor-pointer bg-white p-[0.4rem] text-gray-800 font-medium text-[0.9rem] w-22"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        onClick={saveChanges}
                                        disabled={isProcessing}
                                        className="disabled:cursor-not-allowed cursor-pointer bg-white p-[0.4rem] text-gray-800 font-medium text-[0.9rem] w-22"
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        onClick={() => setInEdit(true)}
                                        disabled={isProcessing}
                                        className="disabled:cursor-not-allowed cursor-pointer bg-white p-[0.4rem] text-gray-800 font-medium text-[0.9rem] w-22"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => deleteUserDataMt.mutate()}
                                        disabled={isProcessing}
                                        className="disabled:cursor-not-allowed cursor-pointer bg-white p-[0.4rem] text-gray-800 font-medium text-[0.9rem] w-22"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {Navbar1(isProcessing)}
            {Navbar2(isProcessing)}
        </div>
    );
}