import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/App.css';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/sign-in' element={<SignIn/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/bmi'/>
                    <Route path='/basic-calculator'/>
                    <Route path="/" element={<Navigate to="/basic-calculator" replace/>}/>
                    <Route path="*" element={<Navigate to="/sign-in" replace/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}