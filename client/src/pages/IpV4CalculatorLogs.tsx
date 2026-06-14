import { useNavigate } from "react-router-dom";
import IpV4CalculatorList from "../components/IpV4CalculatorList";
import { Navbar1, Navbar2 } from "../components/Navbar";
import Ipv4CalculatorServices from "../services/ipv4-calculator.service";
import { useEffect } from "react";
import NotifMessage from "../components/NotifMessage";
import Loading from "../components/Loading";

export default function IpV4CalculatorLogs() {
    const navigate = useNavigate();
    const {  
        deleteAllFromHistory,
        deleteOneFromHistory,
        ipV4Logs,
        isProcessing, 
        messageText, 
        setMessageText 
    } = Ipv4CalculatorServices();
    
    useEffect(() => {
        if (messageText) {
            const timer = setTimeout(() => setMessageText(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [messageText, setMessageText]);

    return (
        <section className='bg-[url(https://wallpaperaccess.com/full/1812965.jpg)] md:flex-row flex-col flex gap-4 p-4 h-screen relative z-10'>
            {messageText ? NotifMessage(messageText) : null}
            <div className="md:w-3/4 w-full h-full min-h-50 flex flex-col gap-4 backdrop-blur-sm backdrop-brightness-50 border rounded-2xl pt-4 px-4 border-white">
                <div className="flex gap-2 justify-center">
                    <button 
                        type="button"
                        onClick={() => deleteAllFromHistory.mutate()}
                        disabled={isProcessing}
                        className="cursor-pointer disabled:cursor-not-allowed bg-white text-blue-500 w-20 font-medium p-[0.4rem] text-[0.85rem] rounded-[0.3rem]"
                    >
                        Delete All
                    </button>
                    <button 
                        type="button"
                        disabled={isProcessing}
                        onClick={() => navigate('/ipv4-calculator')}
                        className="cursor-pointer disabled:cursor-not-allowed bg-white text-blue-500 w-20 font-medium p-[0.4rem] text-[0.85rem] rounded-[0.3rem]"
                    >
                        Back
                    </button>
                </div>
                {ipV4Logs.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loading/>
                    </div>
                ) : ipV4Logs.error ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="font-medium text-5xl text-white">{ipV4Logs.error.message}</span>
                    </div>
                ) : (
                    <IpV4CalculatorList
                        ipv4_logs={ipV4Logs.paginatedData}
                        fetch_next_page={ipV4Logs.fetchNextPage}
                        is_fetch_next_page={ipV4Logs.isLoadMore}
                        is_reached_end={ipV4Logs.isReachedEnd}
                        is_processing={isProcessing}
                        on_delete={deleteOneFromHistory}
                    />
                )}
            </div>
            {Navbar1(isProcessing)}
            {Navbar2(isProcessing)}
        </section>
    );
}