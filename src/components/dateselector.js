import React,{useState} from 'react'
import DatePicker from 'tailwind-datepicker-react'
const options = {
	title: "Select Date",
	autoHide: true,
	todayBtn: true,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-gray-100 dark:bg-gray-800",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

const DateSelector = ({setSelectedDate}) => {
	const [show, setShow] = useState (false)
	const handleChange = (selectedDate) => {
		setSelectedDate(selectedDate)
		console.log(selectedDate)
	}
	const handleClose = (state) => {
		setShow(state)
	}

	return (
		<div>
			<DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}

export default DateSelector