let timeoutId;
function schedulesingleMeeting(callback){
    srtTimeout(callback,2000);
    console.log("single meeting started");

}
 timeoutId=setTimeout(callback,2000);
 

function cancelMeeting(){
    clearTimeout(timeoutId);
    console.log("meeting cancelled");
}
cancelMeeting();

let intervalId;

function scheduleRecurrenceMeeting(interval,callback){
   intervalId= setInterval(callback,interval);
}

function cancelmultipleMeeting(){
    clearInterval(intervalId);
    console.log("Meetings are cancelled");
}
    const meetInterval=8000;
    scheduleRecurrenceMeeting(meetInterval,()=>{
        console.log("multiple meet started");
    });

    cancelmultipleMeeting();

    

    