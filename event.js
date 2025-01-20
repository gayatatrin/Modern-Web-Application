// Fetch XML and populate data
document.addEventListener("DOMContentLoaded", () => {
    fetch("event-data.xml")
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            // Populate "About" Section
            const aboutText = xmlDoc.querySelector("about > description").textContent;
            document.getElementById("about-text").textContent = aboutText;

            // Populate Schedule
            const scheduleBody = document.getElementById("schedule-body");
            const sessions = xmlDoc.querySelectorAll("schedule > session");
            sessions.forEach(session => {
                const time = session.querySelector("time").textContent;
                const title = session.querySelector("title").textContent;
                const speaker = session.querySelector("speaker").textContent;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${time}</td>
                    <td>${title}</td>
                    <td>${speaker}</td>
                `;
                scheduleBody.appendChild(row);
            });

            // Populate Speakers
            const speakersList = document.getElementById("speakers-list");
            const speakers = xmlDoc.querySelectorAll("speakers > speaker");
            speakers.forEach(speaker => {
                const name = speaker.querySelector("name").textContent;
                const bio = speaker.querySelector("bio").textContent;

                const listItem = document.createElement("li");
                listItem.innerHTML = <strong>${name}:</strong> ${bio};
                speakersList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading XML:", error));
});
