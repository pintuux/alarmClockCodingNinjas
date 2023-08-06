// Function to display the current time on the clock face
function displayTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = timeString;
  }
  
  // Function to set an alarm
  function setAlarm() {
    const hour = parseInt(document.getElementById('hour').value);
    const minute = parseInt(document.getElementById('minute').value);
    const second = parseInt(document.getElementById('second').value);
    const ampm = document.getElementById('ampm').value;
  
    if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
      alert('Please enter valid values for hour, minute, and second.');
      return;
    }
  
    const now = new Date();
    const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 0);
    if (ampm === 'pm' && hour !== 12) {
      alarmTime.setHours(alarmTime.getHours() + 12);
    } else if (ampm === 'am' && hour === 12) {
      alarmTime.setHours(alarmTime.getHours() - 12);
    }
  
    const currentTime = now.getTime();
    const alarmTimeMillis = alarmTime.getTime();
  
    if (alarmTimeMillis <= currentTime) {
      alert('Please set a future time for the alarm.');
      return;
    }
  
    const alarm = { time: alarmTimeMillis, formattedTime: alarmTime.toLocaleTimeString() };
    alarms.push(alarm);
    updateAlarmsList();
  }
  
  // Function to delete an alarm
  function deleteAlarm(index) {
    alarms.splice(index, 1);
    updateAlarmsList();
  }
  
  // Function to update the alarms list in the UI
  function updateAlarmsList() {
    const alarmsListElement = document.getElementById('alarms');
    alarmsListElement.innerHTML = '';
  
    alarms.forEach((alarm, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${alarm.formattedTime}</span>
        <button onclick="deleteAlarm(${index})">Delete</button>
      `;
      alarmsListElement.appendChild(listItem);
    });
  }
  
  // Array to store the alarms
  const alarms = [];
  
  // Update the clock every second
  setInterval(displayTime, 1000);
  
  // Add event listener to set alarm button
  document.getElementById('setAlarmButton').addEventListener('click', setAlarm);
  