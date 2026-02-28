import { useMemo, useState } from "react";
import { Navbar1 } from "../components/Navbar";

export default function BmiCalculator() {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const bmi = useMemo(() => {
        const heightNum = Number(height);
        const weightNum = Number(weight);

        if (isNaN(heightNum) || isNaN(weightNum)) {
            alert("Semua input harus diisi dengan angka valid.");
            return;
        }
        
        if (heightNum && weightNum) {
            const ubahTinggiBadan = heightNum / 100;
            return Math.round(weightNum / (ubahTinggiBadan ** 2));
        }
    }, [height, weight]);

    function bmiStatus(event: React.FormEvent) {
        event.preventDefault();

        if (bmi !== undefined) {
            if (bmi >= 30 ) {
                setResult(`Hasil bmi kamu adalah ${bmi}. Status : Obesitas`);
            } else if (bmi >= 25 && bmi <= 29.5) {
                setResult(`Hasil bmi kamu adalah ${bmi}. Status : Berlebihan`);
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                setResult(`Hasil bmi kamu adalah ${bmi}. Status : Normal`);
            } else {
                setResult(`Hasil bmi kamu adalah ${bmi}. Status : Kurang Normal`);
            }
        } 
    }

    function resetOperation() {
        setWeight('');
        setHeight('');
        setResult("");
    }

    return (
        <main className="bg-[url(https://i.postimg.cc/5tjV0z6y/rain-in-autumn.jpg)] h-screen flex gap-4 p-4">
            <div className="flex justify-center items-center w-full md:w-3/4">
                <form title="bmi-calculator" onSubmit={bmiStatus} className="backdrop-blur-sm backdrop-brightness-50 border border-white p-4 flex flex-col gap-4">
                    <div className="wrap-1">
                        <label htmlFor="weight" className="text-white">Weight</label>
                        <input 
                            type="text" 
                            value={weight} 
                            id="weight" 
                            placeholder="ex: 59" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWeight(event.target.value)} 
                            name="weight"
                        />
                    </div>
                    <div className="wrap-2">
                        <label htmlFor="height" className="text-white">Height</label>
                        <input 
                            type="text" 
                            value={height} 
                            id="height" 
                            placeholder="ex: 169" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHeight(event.target.value)}
                            name="height"
                        />
                    </div>
                    <div className="bmi-control">
                        <button type="submit">Hitung</button>
                        <button type="button" onClick={resetOperation}>Reset</button>
                    </div>
                </form>
                <div className="bmi-result">
                    <div>{result}</div>
                </div>
            </div>
            <Navbar1/>
        </main>
    )
}