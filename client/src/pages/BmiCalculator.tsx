import { useEffect, useState } from "react";
import { Navbar1, Navbar2 } from "../components/Navbar";
import BmiCalculatorServices from "../services/bmi-calculator.service";
import AuthServices from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import type { BmiResultIntrf } from "../models/bmi-calculator.model";

export default function BmiCalculator() {
    const navigate = useNavigate();
    const { currentUserId } = AuthServices();
    const { executeFormula, isProcessing } = BmiCalculatorServices();

    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [localResult, setLocalResult] = useState<BmiResultIntrf | null>(null);

    function bmiStatus(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        executeFormula.mutate({ height: Number(height.trim()), weight: Number(weight.trim()) }, {
            onSuccess: (response) => setLocalResult({ 
                decision: response.decision, 
                result: response.result.toString() 
            })
        });
    }

    function resetOperation() {
        setWeight('');
        setHeight('');
        setLocalResult(null);
    }

    useEffect(() => {
        if (!currentUserId) {
            resetOperation();
            setLocalResult(null);
        }
    }, [currentUserId]);

    return (
        <section className={`bg-[url(${import.meta.env.VITE_BACKGROUND})] h-screen flex flex-col md:flex-row gap-4 p-4`}>
            <div className="p-4 flex flex-col gap-4 h-full w-full md:w-3/4 backdrop-blur-sm backdrop-brightness-50 border border-white rounded-2xl">
                <div className="flex justify-center items-center h-full">
                    <form title="bmi-calculator" onSubmit={bmiStatus} className="border border-white p-4 flex flex-col gap-4 w-80 rounded-2xl">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="weight" className="text-white">Weight</label>
                            <input 
                                type="text" 
                                value={weight} 
                                id="weight" 
                                placeholder="ex: 59"
                                className="text-white font-medium text-[0.9rem] p-[0.4rem] rounded-[0.4rem] border border-white w-full outline-0"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWeight(event.target.value)} 
                                name="weight"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="height" className="text-white">Height</label>
                            <input 
                                type="text" 
                                value={height} 
                                id="height" 
                                placeholder="ex: 169"
                                className="text-white font-medium text-[0.9rem] p-[0.4rem] rounded-[0.4rem] border border-white w-full outline-0"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHeight(event.target.value)}
                                name="height"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className="disabled:cursor-not-allowed w-22 bg-white text-gray-800 font-medium text-[0.75rem] p-[0.33rem] rounded-[0.35rem] cursor-pointer"
                            >
                                Count
                            </button>
                            <button 
                                type="button" 
                                disabled={isProcessing}
                                onClick={resetOperation}
                                className="disabled:cursor-not-allowed w-22 bg-white text-gray-800 font-medium text-[0.75rem] p-[0.33rem] rounded-[0.35rem] cursor-pointer"
                            >
                                Reset
                            </button>
                            <button 
                                type="button" 
                                disabled={isProcessing}
                                onClick={() => navigate('/bmi-calculator-logs')}
                                className="disabled:cursor-not-allowed w-22 bg-white text-gray-800 font-medium text-[0.75rem] p-[0.33rem] rounded-[0.35rem] cursor-pointer"
                            >
                                Logs
                            </button>
                        </div>
                        <div className="bmi-result ml-4 flex items-center">
                            {localResult ? (
                                <div className="text-white space-y-2">
                                    <p className="text-lg font-semibold">
                                        BMI: <span className="text-blue-400">{localResult.result}</span>
                                    </p>
                                    <p className="text-sm">
                                        Status: <span className="text-white">
                                            {localResult.decision}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                <p className="text-white text-center italic">Result will appear here</p>
                            )}
                        </div>
                    </form>
                </div>
                
            </div>
            {Navbar1(isProcessing)}
            {Navbar2(isProcessing)}
        </section>
    )
}