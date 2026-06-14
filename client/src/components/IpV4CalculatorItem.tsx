import type { IpV4ItemIntrf } from "../models/ipv4-calculator-model";

export default function IpV4CalculatorItem(props: IpV4ItemIntrf) {
    return (
        <div className="border flex flex-col border-white text-white p-2.5 gap-2.5 rounded-[10px]">
            <div>
                <button 
                    type="button" 
                    disabled={props.is_processing}
                    onClick={() => props.on_delete.mutate(props.ipv4_log._id)}
                    className="bg-white text-blue-600 p-[0.4rem] text-[0.9rem] font-medium rounded-[0.4rem] w-22 cursor-pointer disabled:cursor-not-allowed"
                >
                    Delete
                </button>
            </div>
            <div className="text-[0.8rem] font-medium">{new Date(props.ipv4_log.created_at).toLocaleString()}</div>
            <div className="font-medium text-[0.9rem]">Binary IPV4 : {props.ipv4_log.stats.ipv4.binary}</div>
            <div className="font-medium text-[0.9rem]">Decimal IPV4 : {props.ipv4_log.stats.ipv4.decimal}</div>
            <div className="font-medium text-[0.9rem]">Binary Network IPV4 : {props.ipv4_log.stats.network_ip.binary}</div>
            <div className="font-medium text-[0.9rem]">Decimal Network IPV4 : {props.ipv4_log.stats.network_ip.decimal}</div>
            <div className="font-medium text-[0.9rem]">Binary First Host IPV4 : {props.ipv4_log.stats.first_host_ip.binary}</div>
            <div className="font-medium text-[0.9rem]">Decimal First Host IPV4 : {props.ipv4_log.stats.first_host_ip.decimal}</div>
            <div className="font-medium text-[0.9rem]">Binary Last Host IPV4 : {props.ipv4_log.stats.last_host_ip.binary}</div>
            <div className="font-medium text-[0.9rem]">Decimal Last Host IPV4 : {props.ipv4_log.stats.last_host_ip.decimal}</div>
            <div className="font-medium text-[0.9rem]">Binary Broadcast IPV4 : {props.ipv4_log.stats.broadcast_ip.binary}</div>
            <div className="font-medium text-[0.9rem]">Decimal Broadcast IPV4 : {props.ipv4_log.stats.broadcast_ip.decimal}</div>
        </div>
    );
}