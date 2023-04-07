document.getElementById('create-meeting-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const meetingTitleInput = document.getElementById('meeting-title');
  const meetingDescriptionInput = document.getElementById('meeting-description');
  const meetingDateInput = document.getElementById('meeting-date');
  const meetingTimeInput = document.getElementById('meeting-time');

  const meetingDate = new Date(meetingDateInput.value);
  const meetingTime = meetingTimeInput.valueAsDate;
  const now = new Date();

  if (meetingDate.getFullYear() < now.getFullYear()) {
    alert('You cannot create a meeting in a previous year.');
    return;
  }

  if (meetingDate.toDateString() === now.toDateString() && meetingTime <= now) {
    alert('You cannot create a meeting at a time that has already passed.');
    return;
  }

  // If all validations pass, proceed with form submission or perform other actions
  const requestData = {
    title: meetingTitleInput.value,
    description: meetingDescriptionInput.value,
    startTime: meetingDateInput.value + 'T' + meetingTimeInput.value,
    endTime: meetingDateInput.value + 'T' + meetingTimeInput.value // Assuming the meeting ends at the same time it starts, update this as needed
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  };

  try {
    const response = await fetch('/api/create-meeting', requestOptions);
    const data = await response.json();

    if (response.ok) {
      const meetingID = data.meeting.title; // Replace this with a proper meeting ID once you've set up a database
      window.location.href = `/meeting.html?id=${meetingID}`;
    } else {
      alert(`There was an error creating the meeting. ${data.message}`);
      console.error(`Error: ${data.message}`);
    }
  } catch (error) {
    alert('There was an error creating the meeting. Please try again.');
    console.error('Error:', error);
  }
});
