import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BasicCalculator from "./pages/BasicCalculator";
import ProtectedRoute from "./components/ProtectedRoute";
import BmiCalculator from "./pages/BmiCalculator";
import Profile from "./pages/Profile";
import BasicCalculatorLogs from "./pages/BasicCalculatorLogs";
import BmiCalculatorLogs from "./pages/BmiCalculatorLogs";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/bmi-calculator" element={<ProtectedRoute><BmiCalculator/></ProtectedRoute>}/>
                    <Route path="/bmi-calculator-logs" element={<ProtectedRoute><BmiCalculatorLogs/></ProtectedRoute>}/>
                    <Route path="/basic-calculator" element={<ProtectedRoute><BasicCalculator/></ProtectedRoute>}/>
                    <Route path="/basic-calculator-logs" element={<ProtectedRoute><BasicCalculatorLogs/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/" element={<Navigate to="/basic-calculator" replace/>}/>
                    <Route path="*" element={<Navigate to="/sign-in" replace/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}