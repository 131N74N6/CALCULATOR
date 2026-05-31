import { useNavigate } from "react-router-dom";
import { Navbar1, Navbar2 } from "../components/Navbar";
import BmiCalculatorServices from "../services/bmi-calculator.service";
import { useEffect } from "react";
import Loading from "../components/Loading";
import BmiCalculatorList from "../components/BmiCalculatorList";
import NotifMessage from "../components/NotifMessage";

export default function BmiCalculatorLogs() {
    const navigate = useNavigate();
    const { deleteAllFromHistory, deleteOneFromHistory, history, isProcessing, messageText, setMessageText } = BmiCalculatorServices();
    
    useEffect(() => {
        if (messageText) {
            const timer = setTimeout(() => setMessageText(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [messageText, setMessageText]);

    return (
        <div className='bg-[url(https://wallpaperaccess.com/full/1812965.jpg)] md:flex-row flex-col flex gap-4 p-4 h-screen relative z-10'>
            {messageText ? NotifMessage(messageText) : null}
            <div className="md:w-3/4 w-full h-full min-h-50 flex flex-col gap-4 backdrop-blur-sm backdrop-brightness-50 border rounded-2xl p-4 border-white">
                <div className="flex gap-2 justify-center">
                    <button 
                        type="button"
                        onClick={() => deleteAllFromHistory.mutate()}
                        disabled={isProcessing}
                        className="cursor-pointer disabled:cursor-not-allowed bg-white text-orange-700 w-20 font-medium p-[0.4rem] text-[0.85rem] rounded-[0.3rem]"
                    >
                        Delete All
                    </button>
                    <button 
                        type="button"
                        disabled={isProcessing}
                        onClick={() => navigate('/bmi-calculator')}
                        className="cursor-pointer disabled:cursor-not-allowed bg-white text-orange-700 w-20 font-medium p-[0.4rem] text-[0.85rem] rounded-[0.3rem]"
                    >
                        Back
                    </button>
                </div>
                {history.isLoading ? (
                    <div className="flex justify-center items-center h-full"><Loading/></div>
                ) : history.error ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="font-medium text-5xl text-white">{history.error.message}</span>
                    </div>
                ) : (
                    <BmiCalculatorList
                        bmi_calc_logs={history.paginatedData}
                        fetch_next_page={history.fetchNextPage}
                        is_fetch_next_page={history.isLoadMore}
                        is_reached_end={history.isReachedEnd}
                        is_processing={isProcessing}
                        on_delete={deleteOneFromHistory}
                    />
                )}
            </div>
            {Navbar1(isProcessing)}
            {Navbar2(isProcessing)}
        </div>
    );
}
