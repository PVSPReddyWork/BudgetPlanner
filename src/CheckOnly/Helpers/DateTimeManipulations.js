export const DateManipulations = {
    getDay: function(date = new Date()){
        const currentDayDate = date.getDate();
        return currentDayDate;
    },
    getMonth: function(date = new Date()){
        const currentMonthNumber = date.getMonth() + 1;
        let currentMonthObject = {};
        monthsObject.forEach((monthItem) => {
            if(currentMonthNumber.toString() === monthItem.id.toString())
            {
                currentMonthObject = monthItem;
            }
        });
        return currentMonthObject?.name;
        // return currentMonthObject?.code;
        // return currentMonthObject?.monthNumber;
    },
    getYear: function(date = new Date()){
        const currentYear = date.getFullYear();
        return currentYear;
    },
    getTicks: function(date = new Date()){
        const todayDate = date;//new Date(); // for example
        // the number of .net ticks at the unix epoch
        const epochTicks = 621355968000000000;
        // there are 10000 .net ticks per millisecond
        const ticksPerMillisecond = 10000;
        // calculate the total number of .net ticks for your date
        const todayDateTicks = epochTicks + todayDate.getTime() * ticksPerMillisecond;
        return todayDateTicks;
    },
    getTimeByFormat: function(date = new Date()){
        const hours = new Date().getHours(); //Current Hours
        const minutes = new Date().getMinutes(); //Current Minutes
        const seconds = new Date().getSeconds(); //Current Seconds
        let timeOfDate = hours + " : " + minutes + " : " + seconds
        return timeOfDate;
    },
    getDateByFormat: function(date = new Date()){
        // console.log('DateTimeMAnipulations >>>> DateManipulations >>>> date: ', date);
        const year = date.getFullYear().toString(); //Current Year
        // console.log('DateTimeMAnipulations >>>> DateManipulations >>>> year: ', year);
        const month = date.getMonth().toString(); //Current Month
        // console.log('DateTimeMAnipulations >>>> DateManipulations >>>> month: ', month);
        const dayOfMonth = date.getDate().toString(); //Current Day
        // console.log('DateTimeMAnipulations >>>> DateManipulations >>>> dayOfMonth: ', dayOfMonth);
        const formatedDate = dayOfMonth + "/" + ((parseInt(month))+1) + "/" + year;
        // console.log('DateTimeMAnipulations >>>> DateManipulations >>>> formatedDate: ', formatedDate);
        return formatedDate;
    },
    getDateOnly: function(date = new Date()){
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
}

export const GetDyanmicIDFromDate = () => {
    const todayDate = new Date(); // for example
    // the number of .net ticks at the unix epoch
    const epochTicks = 621355968000000000;
    // there are 10000 .net ticks per millisecond
    const ticksPerMillisecond = 10000;
    // calculate the total number of .net ticks for your date
    const todayDateTicks = epochTicks + todayDate.getTime() * ticksPerMillisecond;
  
    return todayDateTicks;
  };
  
  export const GetAge = (dateString) => {
    // var today = new Date();
    // var birthDate = new Date(dateString);
    // var age = today.getFullYear() - birthDate.getFullYear();
    // var m = today.getMonth() - birthDate.getMonth();
    // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //     age--;
    // }
    // return age;
    var dob = new Date(dateString);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);
    //extract year from date
    var year = age_dt.getUTCFullYear();
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    return age;
  };


const monthsObject = [
    {
        id: 1,
        name: "January",
        code: "Jan",
        monthNumber: "01"
    },
    {
        id: 2,
        name: "Feburary",
        code: "Feb",
        monthNumber: "02"
    },
    {
        id: 3,
        name: "March",
        code: "Mar",
        monthNumber: "03"
    },
    {
        id: 4,
        name: "April",
        code: "Apr",
        monthNumber: "04"
    },
    {
        id: 5,
        name: "May",
        code: "May",
        monthNumber: "05"
    },
    {
        id: 6,
        name: "June",
        code: "Jun",
        monthNumber: "06"
    },
    {
        id: 7,
        name: "July",
        code: "Jul",
        monthNumber: "07"
    },
    {
        id: 8,
        name: "August",
        code: "Aug",
        monthNumber: "08"
    },
    {
        id: 9,
        name: "September",
        code: "Sep",
        monthNumber: "09"
    },
    {
        id: 10,
        name: "October",
        code: "Oct",
        monthNumber: "10"
    },
    {
        id: 11,
        name: "November",
        code: "Nov",
        monthNumber: "11"
    },
    {
        id: 12,
        name: "December",
        code: "Dec",
        monthNumber: "12"
    }
];