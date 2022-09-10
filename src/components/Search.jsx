import DatePicker from "react-datepicker";
import "./search.css";
import { useState } from "react";
import { debounce } from 'lodash';

export default function Search({ handleDatePicker }) {

    const [startDate, setStartDate] = useState(new Date())
    const closeDatePicker = debounce(handleDatePicker, 600)
    
    const handleChange = (date) => {
        setStartDate(date);
        closeDatePicker();
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
                minDate={803347920000}
            />

        </div>
    )
}

