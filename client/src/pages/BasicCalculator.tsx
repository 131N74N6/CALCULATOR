import { useEffect, useState } from "react";
import { Navbar1, Navbar2 } from "../components/Navbar";
import BasicCalculatorServices from "../services/basic-calculator.service";
import AuthServices from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function BasicCalculator() {
    const { currentUserId } = AuthServices();
    const { 
        executeFormula, 
        isProcessing, 
        localResult, 
        setMessageText, 
        setLocalResult, 
        messageText 
    } = BasicCalculatorServices();

    const navigate = useNavigate();
    const buttonComponent = ['0','1','2','3','4','5','6','7','8','9','C','+','-','*','/','(',')','.','^'];

    const [handleDisplay, setHandleDisplay] = useState<string>('');
    
    function operationButton(value: string) {
        if (value === "C") {
            setHandleDisplay("");
            setMessageText(null);
            setLocalResult(null);
        }
        else setHandleDisplay((prev) => prev + value);
    }
    
    function executor(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        executeFormula.mutate(handleDisplay);
    }

    useEffect(() => {
        if (messageText) {
            const timer = setTimeout(() => setMessageText(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [messageText, setMessageText]);
    
    useEffect(() => {
        if (!currentUserId) {
            setHandleDisplay('');
            setMessageText(null);
            setLocalResult(null);
        }
    }, [currentUserId]);

    return (
        <section className='bg-[url(https://wallpaperaccess.com/full/1812965.jpg)] md:flex-row flex-col flex gap-4 p-4 h-screen relative z-10'>
            <div className="border-white md:w-3/4 w-full h-full flex flex-col gap-4 backdrop-blur-sm border rounded-2xl p-4 backdrop-brightness-50">
                <div className="flex gap-2 justify-center">
                    <button 
                        type="button"
                        onClick={() => navigate('/basic-calculator-logs')}
                        className="cursor-pointer disabled:cursor-not-allowed bg-white text-orange-700 w-20 font-medium p-[0.4rem] text-[0.85rem] rounded-[0.3rem]"
                    >
                        Logs
                    </button>
                </div>
                <div className="flex justify-center h-full items-center">
                    <form onSubmit={executor} className="border w-75 h-105.5 border-white p-4 flex flex-col gap-4">
                        {messageText ? (
                            <div className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]">
                                {messageText}
                            </div>
                        ) : localResult ? (
                            <div className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]">
                                {handleDisplay} = {localResult}
                            </div>
                        ) : (
                            <input 
                                type="text" 
                                id="display-result" 
                                value={handleDisplay} 
                                className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHandleDisplay(event.target.value)}
                            />
                        )}
                        <div className="grid grid-cols-4 gap-2">
                            {buttonComponent.map((buttons, index) => (
                                <button key={`calculator-button-${index}`} 
                                    type="button" 
                                    disabled={isProcessing}
                                    onClick={() => operationButton(buttons)}
                                    className="border border-white text-white cursor-pointer h-15 p-[0.7rem] text-[1rem] font-medium disabled:cursor-not-allowed"
                                >
                                    {buttons}
                                </button>
                            ))}
                            <button type="submit" className="border border-white text-white cursor-pointer p-2 text-[0.9rem] font-medium">=</button>
                        </div>
                    </form>
                </div>
            </div>
            {Navbar1(isProcessing)}
            {Navbar2(isProcessing)}
        </section>
    );
}