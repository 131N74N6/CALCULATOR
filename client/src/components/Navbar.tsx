import { Calculator, Network, PowerIcon, User, WeightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"
import AuthServices from "../services/auth.service";

export function Navbar1(isProcessing: boolean) {
    const { signOut } = AuthServices();
    const navigate = useNavigate();

    return (
        <nav className="backdrop-blur-sm w-1/4 backdrop-brightness-50 hidden md:flex flex-col gap-4 p-4 rounded-2xl border-white border">
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/basic-calculator')}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
                >
                    <div><Calculator/></div>
                    <div>Basic Calculator</div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/bmi-calculator')}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
            >
                <div><WeightIcon/></div>
                <div>Bmi Calculator</div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/ipV4-calculator')}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
            >
                <div><Network/></div>
                <div>IpV4 Calculator</div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/profile')}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
            >
                <div><User/></div>
                <div>Profile</div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={signOut}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
                >
                    <div><PowerIcon/></div>
                    <div>Sign Out</div>
            </button>
        </nav>
    );
}

export function Navbar2(isProcessing: boolean) {
    const { signOut } = AuthServices();
    const navigate = useNavigate();

    return (
        <nav className="backdrop-blur-sm w-full backdrop-brightness-50 rounded-2xl md:hidden flex justify-center gap-4 p-4 overflow-y-auto border-white border">
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/basic-calculator')}
                className="cursor-pointer disabled:cursor-not-allowed text-white font-medium text-[1rem]"
                >
                    <div><Calculator/></div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/bmi-calculator')}
                className="cursor-pointer disabled:cursor-not-allowed text-white font-medium text-[1rem]"
            >
                <div><WeightIcon/></div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/ipV4-calculator')}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
            >
                <div><Network/></div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate('/profile')}
                className="cursor-pointer flex gap-2 disabled:cursor-not-allowed text-white font-medium text-[1rem]"
            >
                <div><User/></div>
            </button>
            <button
                type="button"
                disabled={isProcessing}
                onClick={signOut}
                className="cursor-pointer disabled:cursor-not-allowed text-white font-medium text-[1rem]"
                >
                    <div><PowerIcon/></div>
            </button>
        </nav>
    );
}