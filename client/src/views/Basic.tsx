import { useState } from "react";

const buttonComponent = [
    '0','1','2','3','4','5','6','7','8',
    '9','C','+','-','*','/','(',')','.','^'
];

export default function BasicCalculator() {
    const [handleDisplay, setHandleDisplay] = useState<string>('');

    function operationButton(value: string) {
        if (value === "C") setHandleDisplay("");
        else setHandleDisplay((prev) => prev + value);
    }

    function executor(event: React.FormEvent) {
        event.preventDefault();
        try {
            const result = evaluate(handleDisplay);
            setHandleDisplay(String(result));
        }
        catch (error: any) {
            setHandleDisplay(error);
        }
    }

    return (
        <main className="bg-[url(https://i.postimg.cc/5tjV0z6y/rain-in-autumn.jpg)] flex gap-4 p-4 h-screen relative z-10">
            <div className="md:w-3/4 w-full flex justify-center items-center">
                <form onSubmit={executor} className="backdrop-blur-sm backdrop-brightness-50 border w-75 h-105.5 border-white p-4 flex flex-col gap-4">
                    <input 
                        type="text" 
                        id="display-result" 
                        value={handleDisplay} 
                        className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHandleDisplay(event.target.value)}
                    />
                    <div className="grid grid-cols-4 gap-2">
                        {buttonComponent.map((buttons, index) => (
                            <button key={`calculator-button-${index}`} 
                                type="button" 
                                onClick={() => operationButton(buttons)}
                                className="border border-white text-white cursor-pointer h-15 p-[0.7rem] text-[1rem] font-medium"
                            >
                                {buttons}
                            </button>
                        ))}
                        <button type="submit" className="border border-white text-white cursor-pointer p-2 text-[0.9rem] font-medium">=</button>
                    </div>
                </form>
            </div>
            <Navbar1/>
        </main>
    )
}