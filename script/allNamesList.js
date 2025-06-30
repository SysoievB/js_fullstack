// allNamesList.js - Load and display all names when page loads
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:8080/api', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const namesList = await response.json();

            // Update the count
            const countElement = document.getElementsByClassName('countNames')[0];
            countElement.textContent = `There are ${namesList.length} names`;

            // Create and display the list of names
            const namesContainer = document.createElement('div');
            namesContainer.innerHTML = '<h4>Names:</h4>';

            if (namesList.length > 0) {
                const ul = document.createElement('ul');
                namesList.forEach(name => {
                    const li = document.createElement('li');
                    li.textContent = name;
                    ul.appendChild(li);
                });
                namesContainer.appendChild(ul);
            } else {
                namesContainer.innerHTML += '<p>No names available.</p>';
            }

            // Add the names list to the page
            document.body.appendChild(namesContainer);

        } else {
            console.error('Error fetching names:', response.status);
            alert('Error fetching names from server');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server');
    }
});