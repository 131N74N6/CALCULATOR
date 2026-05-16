import type { BasicCalcItemIntrf } from "../models/basic-calculator.model";

export default function BasicCalculatorItem(props: BasicCalcItemIntrf) {
    return (
        <div className="border border-white text-white p-2.5 rounded-[10px]">
            <div className="text-[0.7rem]">{props.basic_calc_log.created_at}</div>
            <div className="font-medium text-[0.9rem]">Formula: {props.basic_calc_log.formula}</div>
            <div className="font-medium text-[0.9rem]">Result: {props.basic_calc_log.result}</div>
            <button 
                type="button" 
                disabled={props.is_processing}
                onClick={() => props.on_delete.mutate(props.basic_calc_log._id)}
                className="bg-white text-gray-800 p-[0.4rem] text-[0.9rem] font-medium rounded-[0.4rem] w-22 cursor-pointer disabled:cursor-not-allowed"
            >
                Delete
            </button>
        </div>
    );
}