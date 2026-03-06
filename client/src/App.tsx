import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import BasicCalculator from './views/Basic';
import ProtectedRoute from './components/ProtectedRoute';
import BmiCalculator from './views/Bmi';
import Profile from './views/Profile';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/sign-in' element={<SignIn/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/bmi-calculator' element={<ProtectedRoute><BmiCalculator/></ProtectedRoute>}/>
                    <Route path='/basic-calculator' element={<ProtectedRoute><BasicCalculator/></ProtectedRoute>}/>
                    <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/" element={<Navigate to="/basic-calculator" replace/>}/>
                    <Route path="*" element={<Navigate to="/sign-in" replace/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}