import DatePicker from "react-datepicker";
import "./search.css";
import { useState } from "react";
import { debounce } from 'lodash';


export default function Search({ handleDatePicker, handleDateSearch, searchDate }) {

    // const [startDate, setStartDate] = useState(new Date())
    // const debounceHandleDateSearch = debounce(handleDatePicker, 600)
    
    // const handleChange = date => {
    //     // setStartDate(date);
    //     const debounceHandleDateSearch = debounce(handleDateSearch(date), 1500);
    
    //     debounceHandleDateSearch;
    // }

    // console.log(startDate)
    
    
    return (
        <div className="absolute top-16 right-2">
            <DatePicker 
                selected={searchDate} 
                onChange={date => handleDateSearch(date)} 
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

