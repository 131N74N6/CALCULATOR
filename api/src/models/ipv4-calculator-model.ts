import mongoose, { Schema, Types } from "mongoose";

export type IpV4Intrf = {
    created_at: string;
    stats: {
        ipv4: {
            binary: string;
            decimal: string;
        };
        net_mask: {
            binary: string;
            decimal: string;
        };
        network_ip: {
            binary: string;
            decimal: string;
        };
        first_host_ip: {
            binary: string;
            decimal: string;
        };
        last_host_ip: {
            binary: string;
            decimal: string;
        };
        broadcast_ip: {
            binary: string;
            decimal: string;
        };
    };
    user_id: Types.ObjectId;
}

const ipv4Schema = new Schema<IpV4Intrf>({
    created_at: { type: String, required: true },
    stats: {
        ipv4: {
            binary: { type: String, required: true },
            decimal: { type: String, required: true },
        },
        net_mask: {
            binary: { type: String, required: true },
            decimal: { type: String, required: true }
        },
        network_ip: {
            binary: { type: String, required: true },
            decimal: { type: String, required: true },
        },
        first_host_ip: {
            binary: { type: String, required: true },
            decimal: { type: String, required: true },
        },
        last_host_ip: {
            binary: { type: String, required: true },
            decimal: { type: String, required: true },
        },
        broadcast_ip: {
            binary: { type: String, required: true },
            decimal: { type: String, required: true },
        }
    },
    user_id: { type: Schema.Types.ObjectId, required: true }
});

export const IpV4 = mongoose.model<IpV4Intrf>('ipv4', ipv4Schema, 'ipv4');