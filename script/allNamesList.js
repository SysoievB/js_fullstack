// allNamesList.js - Load and display all names when page loads
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:8080/api/names/all', {
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
                namesList.forEach((name, index) => {
                    const li = document.createElement('li');
                    const updateButton = document.createElement('button');
                    const removeButton = document.createElement('button');
                    // Set button text
                    updateButton.textContent = 'Update';
                    updateButton.style.cssText = `
                       backgroundColor: yellow;
                       color: white;
                       border: none;
                       padding: 5px 10px;
                       border-radius: 3px;
                       cursor: pointer;
                       `;

                    removeButton.textContent = 'Remove';
                    removeButton.style.backgroundColor = 'red';
                    removeButton.style.color = 'white';
                    removeButton.style.border = 'none';
                    removeButton.style.padding = '5px 10px';
                    removeButton.style.borderRadius = '3px';
                    removeButton.style.cursor = 'pointer';

                    // Create text node for the name
                    const nameText = document.createTextNode(name);

                    // Append elements in desired order
                    li.appendChild(nameText);
                    li.appendChild(updateButton);
                    li.appendChild(removeButton);

                    ul.appendChild(li);

                    // Add event listener for remove button
                    removeButton.addEventListener("click", async function () {
                        try {
                            // Make DELETE request to server
                            const deleteResponse = await fetch(`http://localhost:8080/api/names/${index}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });

                            if (deleteResponse.ok) {
                                // Remove the list item
                                li.remove();

                                // Update the count
                                const remainingItems = ul.children.length;
                                countElement.textContent = `There are ${remainingItems} names`;

                                // If no names left, show "No names available"
                                if (remainingItems === 0) {
                                    namesContainer.innerHTML = '<h3>Names:</h3><p>No names available.</p>';
                                }

                                console.log(`Successfully removed: ${name}`);
                            } else {
                                console.error('Error removing name:', deleteResponse.status);
                                alert(`Error removing name: ${deleteResponse.status}`);
                            }
                        } catch (error) {
                            console.error('Error removing name:', error);
                            alert('Error connecting to server while removing name');
                        }
                    });
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