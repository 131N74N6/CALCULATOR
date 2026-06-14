import { Request, Response } from 'express';
import { IpV4 } from '../models/ipv4-calculator-model';
import { AuthRequest } from '../middleware/auth-middleware';

export async function calculateIp(req: AuthRequest, res: Response) {
    try {
        const { created_at, net_mask, slot_1, slot_2, slot_3, slot_4 } = req.body;
        const ipComponent = [slot_1, slot_2, slot_3, slot_4];
        
        let decimalIpV4;
        let binaryIpV4;

        let networkIp;
        let broadcastIp;
        let firstHostIp;
        let lastHostIp;

        let binNetworkIp;
        let binBroadcastIp;
        let binFirstHostIp;
        let binLastHostIp;

        if (!slot_1 || !slot_2 || !slot_3 || !slot_4 || !net_mask) {
            return res.status(400).json({ message: 'all input fields are required' });
        }

        if (ipComponent.some(ip => Number(ip) < 0 || Number(ip) > 255)) {
            return res.status(400).json({ message: 'IpV4 value must be 0 - 255' });
        }

        const firstBin = (Number(slot_1) >>> 0).toString(2).padStart(8, "0");
        const secondBin = (Number(slot_2) >>> 0).toString(2).padStart(8, "0");
        const thirdBin = (Number(slot_3) >>> 0).toString(2).padStart(8, "0");
        const fourthBin = (Number(slot_4) >>> 0).toString(2).padStart(8, "0");
        const binaryNetMask = (Number(net_mask) >>> 0).toString(2).padStart(8, "0");

        if (Number(net_mask) === 0 || net_mask === '') {
            decimalIpV4 = `${slot_1}.${slot_2}.${slot_3}.${slot_4}`;
            binaryIpV4 = `${firstBin}.${secondBin}.${thirdBin}.${fourthBin}`;
            networkIp = '-';
            firstHostIp = '-';
            lastHostIp = '-';
            broadcastIp = '-';
            binNetworkIp = '-';
            binBroadcastIp = '-';
            binFirstHostIp = '-';
            binLastHostIp = '-';
        } else if (Number(net_mask) === 8) {
            decimalIpV4 = `${slot_1}.${slot_2}.${slot_3}.${slot_4}`;
            binaryIpV4 = `${firstBin}.${secondBin}.${thirdBin}.${fourthBin}`;
            networkIp = `${slot_1}.0.0.0`;
            firstHostIp = `${slot_1}.0.0.1`;
            lastHostIp = `${slot_1}.255.255.254`;
            broadcastIp = `${slot_1}.255.255.255`;
            binNetworkIp = `${firstBin}.00000000.00000000.00000000`;
            binBroadcastIp = `${firstBin}.11111111.11111111.11111111`;
            binFirstHostIp = `${firstBin}.00000000.00000000.00000001`;
            binLastHostIp = `${firstBin}.11111111.11111111.11111110`;
        } else if (Number(net_mask) === 16) {
            decimalIpV4 = `${slot_1}.${slot_2}.${slot_3}.${slot_4}`;
            binaryIpV4 = `${firstBin}.${secondBin}.${thirdBin}.${fourthBin}`;
            networkIp = `${slot_1}.${slot_2}.0.0`;
            firstHostIp = `${slot_1}.${slot_2}.0.1`;
            lastHostIp = `${slot_1}.${slot_2}.255.254`;
            broadcastIp = `${slot_1}.${slot_2}.255.255`;
            binNetworkIp = `${firstBin}.${secondBin}.00000000.00000000`;
            binBroadcastIp = `${firstBin}.${secondBin}.11111111.11111111`;
            binFirstHostIp = `${firstBin}.${secondBin}.00000000.00000001`;
            binLastHostIp = `${firstBin}.${secondBin}.11111111.11111110`;
        } else if (Number(net_mask) === 24) {
            decimalIpV4 = `${slot_1}.${slot_2}.${slot_3}.${slot_4}`;
            binaryIpV4 = `${firstBin}.${secondBin}.${thirdBin}.${fourthBin}`;
            networkIp = `${slot_1}.${slot_2}.${thirdBin}.0`;
            firstHostIp = `${slot_1}.${slot_2}.${thirdBin}.1`;
            lastHostIp = `${slot_1}.${slot_2}.${thirdBin}.254`;
            broadcastIp = `${slot_1}.${slot_2}.${thirdBin}.255`;
            binNetworkIp = `${firstBin}.${secondBin}.${thirdBin}.00000000`;
            binBroadcastIp = `${firstBin}.${secondBin}.${thirdBin}.11111111`;
            binFirstHostIp = `${firstBin}.${secondBin}.${thirdBin}.00000001`;
            binLastHostIp = `${firstBin}.${secondBin}.${thirdBin}.11111110`;
        } else {
            return res.status(400).json({ message: 'net mask must be 8, 16, or 24' });
        }

        const ipV4Stats = {
            ipv4: decimalIpV4,
            binary_ipv4: binaryIpV4,
            net_mask: net_mask,
            binary_net_mask: binaryNetMask,
            network_ip: networkIp,
            binary_network_ip: binNetworkIp,
            first_host_ip: firstHostIp,
            binary_first_host_ip: binFirstHostIp,
            last_host_ip: lastHostIp,
            binary_last_host_ip: binLastHostIp,
            broadcast_ip: broadcastIp,
            binary_broadcast_ip: binBroadcastIp
        }

        const newInsert = new IpV4({
            created_at: created_at,
            stats: {
                ipv4: {
                    binary: binaryIpV4,
                    decimal: decimalIpV4,
                },
                net_mask: {
                    binary: binaryNetMask,
                    decimal: net_mask
                },
                network_ip: {
                    binary: binNetworkIp,
                    decimal: networkIp,
                },
                first_host_ip: {
                    binary: binFirstHostIp,
                    decimal: firstHostIp,
                },
                last_host_ip: {
                    binary: binLastHostIp,
                    decimal: lastHostIp,
                },
                broadcast_ip: {
                    binary: binBroadcastIp,
                    decimal: broadcastIp,
                }
            },
            user_id: req.user?.user_id
        });
        await newInsert.save();

        res.status(200).json({ ip_v4_stats: ipV4Stats });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function deleteAllLogs(req: AuthRequest, res: Response) {
    try {
        const ipV4LogsTotal = await IpV4.find({ user_id: req.user?.user_id }).countDocuments();
        if (ipV4LogsTotal === 0) return res.status(404).json({ message: 'No logs found' });

        await IpV4.deleteMany({ user_id: req.user?.user_id });
        res.status(200).json({ message: 'all results deleted' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function deleteOneLog(req: Request, res: Response) {
    try {
        await IpV4.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'one result deleted' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function getAllLogs(req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 18;
        const skip = (page - 1) * limit;

        const ipV4Logs = await IpV4.find({ user_id: req.user?.user_id }).limit(limit).skip(skip);
        if (ipV4Logs.length === 0) return res.status(404).json({ message: 'No logs found' });

        res.status(200).json(ipV4Logs);
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}