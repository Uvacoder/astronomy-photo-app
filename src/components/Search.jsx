import DatePicker from "react-datepicker";
import "./search.css";
import { useState } from "react";

export default function Search() {

    const [startDate, setStartDate] = useState(new Date())
    console.log(startDate)
    
    
    
    return (
        <div className="bg-neutral-900 text-slate-50 mt-16">
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                inline
            />

        </div>
    )
}

