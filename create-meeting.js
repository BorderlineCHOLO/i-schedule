// create-meeting.js

document.getElementById('create-meeting-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const meetingDateInput = document.getElementById('meeting-date');
  const meetingTimeInput = document.getElementById('meeting-time');
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

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

  try {
    const response = await fetch('/api/create-meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, startTime: meetingTimeInput.value, endTime: meetingTimeInput.value }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.message}`);
      return;
    }

    const data = await response.json();
    alert(`Meeting created successfully: ${JSON.stringify(data.meeting)}`);

    // Redirect to the meeting room or another page if necessary
    // window.location.href = `/meeting-room/${data.meeting.id}`;
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the meeting');
  }
});
