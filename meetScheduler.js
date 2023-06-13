const Meetings = {
    scheduledMeetings: [],
  
    scheduleMeeting: function (name, time) {
      const meeting = {
        name: name,
        time: time
      }
  
      Meetings.scheduledMeetings.push(meeting);
      console.log(`Meeting schedule with: ${meeting.name} for the duration of ${meeting.time} second`)
  
      setTimeout(function () {
        Meetings.cancelMeeting(meeting)
      }, time)
    },
  
    cancelMeeting: function (meeting) {
      const index = Meetings.scheduledMeetings.indexOf(meeting)
      if (index !== -1) {
        Meetings.scheduledMeetings.splice(index, 1)
        console.log(`Meeting canceled: ${meeting.name}`)
      }
    }
  }
  
  Meetings.scheduleMeeting('Revature meeting 1', 10000)
  Meetings.scheduleMeeting('Revature meeting 2', 5000)
  