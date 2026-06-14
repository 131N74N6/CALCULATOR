import { useEffect } from "react";
import { Navbar1, Navbar2 } from "../components/Navbar";
import Ipv4CalculatorServices from "../services/ipv4-calculator.service";

export default function IpV4Calculator() {
    const { 
        calculate, 
        currentUserId,
        handleInput, 
        ipV4, 
        isProcessing, 
        localResult, 
        messageText, 
        resetOperation, 
        setLocalResult,
        setMessageText 
    } = Ipv4CalculatorServices();

    useEffect(() => {
        if (messageText) {
            const timer = setTimeout(() => setMessageText(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [messageText, setMessageText]);

    useEffect(() => {
        if (!currentUserId) {
            resetOperation();
            setLocalResult(null);
            setMessageText(null);
        }
    }, [currentUserId]);
    
    return (
        <section className="bg-[url(https://wallpaperaccess.com/full/1812965.jpg)] md:flex-row flex-col flex gap-4 p-4 h-screen relative z-10">
            <div className="border-white md:w-3/4 w-full h-full flex flex-col gap-4 backdrop-blur-sm border rounded-2xl p-4 backdrop-brightness-50">
                <form className="border w-75 h-105.5 border-white p-4 flex flex-col gap-4" onSubmit={calculate}>
                    <input 
                        id="first-slot"
                        className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                        name="firstSlot"
                        type="text"
                        value={ipV4.firstSlot}
                        maxLength={3} 
                        onChange={handleInput} 
                        placeholder="ex: 192"
                    />
                    <input 
                        id="second-slot" 
                        className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                        name="secondSlot" 
                        type="text" 
                        value={ipV4.secondSlot}
                        maxLength={3} 
                        onChange={handleInput} 
                        placeholder="ex: 192"
                    />
                    <input 
                        id="third-slot" 
                        className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                        name="thirdSlot" 
                        type="text" 
                        value={ipV4.thirdSlot}
                        maxLength={3} 
                        onChange={handleInput} 
                        placeholder="ex: 192"
                    />
                    <input 
                        id="fourth-slot" 
                        className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                        name="fourthSlot" 
                        type="text" 
                        value={ipV4.fourthSlot}
                        maxLength={3} 
                        onChange={handleInput} 
                        placeholder="ex: 192"
                    />
                    <input
                        id="net-mask" 
                        className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]"
                        name="netMask" 
                        type="text" 
                        value={ipV4.netMask}
                        placeholder="enter net-mask ex 8,16,24" 
                        maxLength={2} 
                        onChange={handleInput}
                    />
                    <button 
                        className='disabled:cursor-not-allowed w-22 bg-white text-gray-800 font-medium text-[0.75rem] p-[0.33rem] rounded-[0.35rem] cursor-pointer'
                        disabled={isProcessing}
                        type="submit"
                    >
                        Calculate
                    </button>
                    <button 
                        className='disabled:cursor-not-allowed w-22 bg-white text-gray-800 font-medium text-[0.75rem] p-[0.33rem] rounded-[0.35rem] cursor-pointer'
                        disabled={isProcessing}
                        type="button"
                        onClick={resetOperation}
                    >
                        Reset
                    </button>
                </form>
                {messageText ? (
                    <div className="border border-white text-white outline-0 p-2 text-[0.9rem] font-[450]">
                        {messageText}
                    </div>
                ) : localResult ? (
                    <div className="text-white space-y-2">
                        <div className="text-lg font-semibold">IP Address : {localResult.ipv4}</div>
                        <div className="text-lg font-semibold">IP Network : {localResult.network_ip}</div>
                        <div className="text-lg font-semibold">First Host : {localResult.first_host_ip}</div>
                        <div className="text-lg font-semibold">Last Host : {localResult.last_host_ip}</div>
                        <div className="text-lg font-semibold">IP Broadcast : {localResult.broadcast_ip}</div>
                        <div className="text-lg font-semibold">Binary IP Address : {localResult.binary_ipv4}</div>
                        <div className="text-lg font-semibold">Binary IP Network : {localResult.binary_network_ip}</div>
                        <div className="text-lg font-semibold">Binary First Host : {localResult.binary_first_host_ip}</div>
                        <div className="text-lg font-semibold">Binary Last Host : {localResult.binary_last_host_ip}</div>
                        <div className="text-lg font-semibold">Binary IP Broadcast : {localResult.binary_broadcast_ip}</div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="font-medium text-5xl text-white">Result will appear here...</div>
                    </div>
                )}
            </div>
            {Navbar1(isProcessing)}
            {Navbar2(isProcessing)}
        </section>
    )
}