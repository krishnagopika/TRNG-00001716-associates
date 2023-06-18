let scheduledMeetings = [];
function singleOccurance(time,name){
    const meeting = { name, time };
    scheduledMeetings.push(meeting);
    setTimeout(()=>{
        console.log(name)},time);
}
function MultiOccurance(time,name){
    const meeting = { name, time };
    scheduledMeetings.push(meeting);
    setInterval(()=>{
        console.log(name)},time);
    }

function cancelSingleOccurance(name,time) {
    const meeting = { name, time };
    scheduledMeetings.pop(meeting);
     clearTimeout(()=>{
        console.log(name)},time);
}
function cancelMulticcurance(name,time) {
    const meeting = { name, time };
    scheduledMeetings.pop(meeting);
    clearInterval(()=>{
       console.log(name)},time);
}

function updateMeeting(time, newName) {
  const meeting = meetings.find(meeting => meeting.time === time);
  if (meeting) {
    meeting.name = newName;
    setTimeout(()=>{
        console.log(newName)},time);
  } else {
    console.log("Meeting not found");
  }
}

function MeetingDetails() {
  const choice = prompt("Enter '1' to schedule single occurance, '2' to schedule multi occurance, '3' to cancel single occurance, '4' to cancel multi occurance or '5' to update a meeting:");
  if (choice === '1') {
    const time = prompt("Enter meeting time (HH:MM):");
    const topic = prompt("Enter meeting name:");
    singleOccurance(time, topic);
  } else if (choice === '2') {
    const time = prompt("Enter meeting time (HH:MM):");
    MultiOccuranceOccurance(time);
  } else if (choice === '3') {
    const time = prompt("Enter meeting time (HH:MM):");
    const name = prompt("Enter meeting name:");
    cancelSingleOccurance(time, name);
  }
  else if (choice === '4') {
    const time = prompt("Enter meeting time (HH:MM):");
    const name = prompt("Enter meeting name:");
    cancelMultiOccurance(time, name);
   } 
   else if (choice === '5') {
    const time = prompt("Enter meeting time (HH:MM):");
    const newName = prompt("Enter new meeting name:");
    updateMeeting(time, newName);
   } 
   else {
    console.log("Invalid choice. Try again.");
  }
}

console.log("Welcome to the Meeting Scheduler");
MeetingDetails();
