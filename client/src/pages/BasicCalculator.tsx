import { useEffect, useState } from "react";
import { Navbar1, Navbar2 } from "../components/Navbar";
import BasicCalculatorServices from "../services/basic-calculator.service";
import AuthServices from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function BasicCalculator() {
    const { currentUserId } = AuthServices();
    const { executeFormula, isProcessing } = BasicCalculatorServices();

    const navigate = useNavigate();
    const buttonComponent = ['0','1','2','3','4','5','6','7','8','9','C','+','-','*','/','(',')','.','^'];

    const [handleDisplay, setHandleDisplay] = useState<string>('');
    const [localResult, setLocalResult] = useState<string | null>(null);
    
    function operationButton(value: string) {
        if (value === "C") {
            setHandleDisplay("");
            setLocalResult(null);
        }
        else setHandleDisplay((prev) => prev + value);
    }
    
    function executor(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        executeFormula.mutate(handleDisplay, { onSuccess: (response) => setLocalResult(response.result) });
    }

    useEffect(() => {
        if (!currentUserId) {
            setHandleDisplay('');
            setLocalResult(null);
        }
    }, [currentUserId]);

    return (
        <main className={`bg-[url(${import.meta.env.VITE_BACKGROUND})] md:flex-row flex-col flex gap-4 p-4 h-screen relative z-10`}>
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
                        {localResult ? (
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
        </main>
    )
}