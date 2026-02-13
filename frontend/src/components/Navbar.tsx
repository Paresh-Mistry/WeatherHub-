import { Cloud, MapPin, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Navbar:React.FC = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        < header className="mb-8" >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 rounded-xl">
                            <Cloud className="w-8 h-8 text-slate-700" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-slate-900">Weather</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <MapPin className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600">Mumbai, Maharashtra</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
                            <Search className="w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search location..."
                                className="bg-transparent outline-none text-slate-700 placeholder-slate-400 w-48"
                            />
                        </div>

                        <div className="text-right">
                            <div className="text-2xl font-semibold text-slate-900 tabular-nums">
                                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm text-slate-500">
                                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Navbar