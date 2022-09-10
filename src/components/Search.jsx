import DatePicker from "react-datepicker";
import "./search.css";
import { useState } from "react";

export default function Search({ handleDatePicker }) {

    const [startDate, setStartDate] = useState(new Date())
    
    
    const handleChange = (date) => {
        setStartDate(date);
        setTimeout(handleDatePicker, 500)
    }

    console.log(startDate)
    
    
    return (
        <div className="absolute top-16 right-2">
            <DatePicker 
                selected={startDate} 
                onChange={handleChange} 
                inline
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
            />

        </div>
    )
}

