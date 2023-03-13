exports.getDate=getDate;

exports.getDay=getDay;

function getDate(){
    const today = new Date();

    const currentDay=today.getDate();

    const options={
        weekday:'long',
        day:'numeric',
        month:'long'
    };
    const day=today.toLocaleDateString("en-US",options)
    return day;
}

function getDay(){
    const today = new Date();

    const currentDay=today.getDate();

    const options={
        weekday:'long',
    };
    const day=today.toLocaleDateString("en-US",options)
    return day;
}