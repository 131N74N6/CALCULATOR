import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../services/authService";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
    const navigate = useNavigate();
    const { authError, currentUserId, authLoading, setAuthError, signIn } = AuthServices();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (currentUserId) navigate('/basic-calculator');
    }, [currentUserId, navigate]);

    useEffect(() => {
        if (authError) {
            const timer = setTimeout(() => setAuthError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [authError, setAuthError]);

    async function signInButton(event: React.SubmitEvent) {
        event.preventDefault();
        await signIn({ 
            password: password.trim(),
            navigate_to: navigate,  
            username: username.trim() 
        });
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <section className={`bg-[url(${import.meta.env.VITE_BACKGROUND_URL})] flex justify-center items-center p-4 h-screen relative z-10`}>
            <form onSubmit={signInButton} className="backdrop-blur-sm border backdrop-brightness-50 border-white p-4 w-120 rounded-lg flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="your-username" className="text-white text-md font-md">Username</label>
                    <input 
                        type="text" 
                        value={username}
                        placeholder="username"
                        id="your-username"
                        className="w-full p-3 rounded-lg text-white border-white focus:outline-none pr-10 border"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="your-password" className="text-white text-md font-md">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            placeholder="password"
                            id="your-password"
                            className="w-full p-3 rounded-lg text-white border-white focus:outline-none pr-10 border"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-gray-200 hover:text-white"
                            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                <p className="text-center text-gray-200">Don't have account? <Link className="text-blue-300" to={'/sign-up'}>Sign Up</Link></p>
                <button 
                    type="submit" 
                    disabled={authLoading}
                    className="bg-gray-200 rounded-md cursor-pointer text-gray-900 font-medium text-[0.9rem] p-[0.4rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                    {authLoading ? 'Processing' : 'Sign In'}
                </button>
                {authError ? <p className="text-white font-medium text-center">{authError}</p> : null}
            </form>
        </section>
    );
}