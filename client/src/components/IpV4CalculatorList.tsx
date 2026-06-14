import type { IpV4ListIntrf } from "../models/ipv4-calculator-model";
import IpV4CalculatorItem from "./IpV4CalculatorItem";
import Loading from "./Loading";

export default function IpV4CalculatorList(props: IpV4ListIntrf) {
    if (props.ipv4_logs.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="text-white font-medium text-5xl">No Logs...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                {props.ipv4_logs.map((ipv4_calc_log) => (
                    <IpV4CalculatorItem 
                        key={`ipv4-${ipv4_calc_log._id}`}
                        ipv4_log={ipv4_calc_log} 
                        is_processing={props.is_processing}
                        on_delete={props.on_delete}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                {props.is_fetch_next_page ? (
                    <Loading/>
                ) : props.ipv4_logs.length <= 18 ? (
                    <></>
                ) : props.is_reached_end ? (
                    <span className="text-white font-medium text-[0.8rem]">No More Logs</span>
                ) :  (
                    <button 
                        type="button"
                        onClick={() => props.fetch_next_page()}
                        disabled={props.is_processing}
                        className="cursor-pointer disabled:cursor-not-allowed bg-white text-gray-700 w-20 font-medium p-[0.4rem] text-[0.85rem] rounded-[0.3rem]"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
}