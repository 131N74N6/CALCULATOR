export default function NotifMessage(message: string) {
    return (
        <div className="fixed z-30 top-8 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
            <div className="bg-white flex justify-center items-center min-w-75 max-w-[90%] border-black border rounded-lg p-4 shadow-2xl pointer-events-auto">
                <span className="font-medium text-gray-700 text-xl text-center">
                    {message}
                </span>
            </div>
        </div>
    );
}