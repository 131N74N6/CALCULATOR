import type { BmiCalcItemIntrf } from "../models/bmi-calculator.model";

export default function BmiCalculatorItem(props: BmiCalcItemIntrf) {
    return (
        <div className="border flex flex-col border-white text-white p-2.5 rounded-[10px]">
            <span className="text-[0.7rem]">{props.bmi_calc_log.created_at}</span>
            <span className="font-medium text-[0.9rem]">Weight : {props.bmi_calc_log.weight}</span>
            <span className="font-medium text-[0.9rem]">Height : {props.bmi_calc_log.height}</span>
            <span className="font-medium text-[0.9rem]">Decision : {props.bmi_calc_log.decision}</span>
            <span className="font-medium text-[0.9rem]">BMI : {props.bmi_calc_log.result}</span>
            <div>
                <button 
                    type="button" 
                    disabled={props.is_processing}
                    onClick={() => props.on_delete.mutate(props.bmi_calc_log._id)}
                    className="bg-white text-gray-800 p-[0.4rem] text-[0.9rem] font-medium rounded-[0.4rem] w-22 cursor-pointer disabled:cursor-not-allowed"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}