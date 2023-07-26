// Assigning the HTML items
const displayMonthName = document.getElementById("monthName");
const eventsList = document.getElementById("eventsList");

//add button elements
const janBtn = document.getElementById("janBtn");
const febBtn = document.getElementById("febBtn");
const marBtn = document.getElementById("marBtn");
const aprBtn = document.getElementById("aprBtn");
const mayBtn = document.getElementById("mayBtn");
const junBtn = document.getElementById("junBtn");
const julBtn = document.getElementById("julBtn");
const augBtn = document.getElementById("augBtn");
const sepBtn = document.getElementById("sepBtn");
const octBtn = document.getElementById("octBtn");
const novBtn = document.getElementById("novBtn");
const decBtn = document.getElementById("decBtn");

//add event listeners
janBtn.addEventListener("click", function () {
  changeMonth(1);
});
febBtn.addEventListener("click", function () {
  changeMonth(2);
});
marBtn.addEventListener("click", function () {
  changeMonth(3);
});
aprBtn.addEventListener("click", function () {
  changeMonth(4);
});
mayBtn.addEventListener("click", function () {
  changeMonth(5);
});
junBtn.addEventListener("click", function () {
  changeMonth(6);
});
julBtn.addEventListener("click", function () {
  changeMonth(7);
});
augBtn.addEventListener("click", function () {
  changeMonth(8);
});
sepBtn.addEventListener("click", function () {
  changeMonth(9);
});
octBtn.addEventListener("click", function () {
  changeMonth(10);
});
novBtn.addEventListener("click", function () {
  changeMonth(11);
});
decBtn.addEventListener("click", function () {
  changeMonth(12);
});

// POST request bearer token
const bearerToken = "264c77f740cc1f02cac8f0a7e30ccdcd2f20dcf5";

// POST Request URL
const apiUrl = "https://api.arenaracingcompany.co.uk/auth";

// Month Number
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;

let monthNumber = currentMonth;


// Month displayed on the page
displayMonthName.innerText = "July";

getJWT();

// Change month based on button selection
function changeMonth(btnNumber) {
  monthNumber = btnNumber;
  if (btnNumber === 1) {
    displayMonthName.innerText = "January";
  }
  else if (btnNumber === 2) {
    displayMonthName.innerText = "February";
  }
  else if (btnNumber === 3) {
    displayMonthName.innerText = "March";
  }
  else if (btnNumber === 4) {
    displayMonthName.innerText = "April";
  }
  else if (btnNumber === 5) {
    displayMonthName.innerText = "May";
  }
  else if (btnNumber === 6) {
    displayMonthName.innerText = "June";
  }
  else if (btnNumber === 7) {
    displayMonthName.innerText = "July";
  }
  else if (btnNumber === 8) {
    displayMonthName.innerText = "August";
  }
  else if (btnNumber === 9) {
    displayMonthName.innerText = "September";
  }
  else if (btnNumber === 10) {
    displayMonthName.innerText = "October";
  }
  else if (btnNumber === 11) {
    displayMonthName.innerText = "November";
  }
  else if (btnNumber === 12) {
    displayMonthName.innerText = "December";
  }
  getEvents();
}

// JWT Token
let JWTtoken;



// Function to get the JWT and then fetch events
function getJWT() {

  // Settings for the JWT request
  let requestJWT = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(apiUrl, requestJWT)
    .then(response => response.text())
    .then(jwt => {
      JWTtoken = jwt;
      // Assigning the value of requestEvents after obtaining JWT
      requestEvents = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      };
      // fetch events function
      getEvents();
    })
    .catch(error => {
      console.error("Error occurred while fetching JWT:", error);
    });
}

function decodeHTMLTags(str) {
  const decoder = document.createElement('div');
  decoder.innerHTML = str;
  return decoder.textContent;
}

function getEvents() {

  // Settings for the Get Events request
  let requestEvents = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${JWTtoken}`,
      "Content-Type": "application/json",
    },
  };

  // GET request URL for the events
  const eventsUrl = `https://api.arenaracingcompany.co.uk/event/month/1318/${monthNumber}`;

  // Make the GET request to the events API for the events for the month
  fetch(eventsUrl, requestEvents)
    .then(response => response.json())
    .then(data => {
      console.log("Events data:", data);

      // Clear the existing list items on the page
      eventsList.innerHTML = '';

      // Check if the events array is empty
      if (data.length === 0) {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = `Im sorry, there are currently no events organised for ${displayMonthName.innerText}, please check the other months to make sure you dont miss out!`;
        eventsList.appendChild(noEventsMessage);
      } else {
      data.forEach(event => {
        // Create a new unordered list for each event
        const eventList = document.createElement('ul');
        eventList.setAttribute('id', 'eventItem');

        // Create a list item for the Title
        const titleListItem = document.createElement('h1');
        titleListItem.textContent = event.title;
        eventList.appendChild(titleListItem);

        // Create a list iten for the image 
        const image = document.createElement('img');
        image.src = event.images.desktop; // Set the image source URL
        image.alt = "Event Image"; // Add alt text for accessibility
        eventList.appendChild(image);

        // Create a list item for the description
        const descriptionListItem = document.createElement('div');
        descriptionListItem.innerHTML = decodeHTMLTags(event.description);
        eventList.appendChild(descriptionListItem);

        // Create a list item for the date
        // Format the date for en-UK format from the data passed from the API
        const eventDate = new Date(event.date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = eventDate.toLocaleDateString('en-UK', options);
        // Send the date to the page in Ul of events
        const dateListItem = document.createElement('h3');
        dateListItem.textContent = "Date Posted: " + formattedDate;
        eventList.appendChild(dateListItem);

        // Append the eventList to the main eventsList
        eventsList.appendChild(eventList);
      });
    }
    })
    .catch(error => {
      console.error("Error occurred while fetching events data:", error);
    });
}