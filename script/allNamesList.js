// allNamesList.js - Load and display all names when page loads
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:8080/api/names/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Error fetching names:', response.status);
            alert('Error fetching names from server');
            return;
        }

        const namesList = await response.json();

        // Update the count
        const countElement = document.querySelector('.count-names');
        countElement.textContent = `There are ${namesList.length} names`;

        // Container for names list
        const namesContainer = document.createElement('div');
        namesContainer.classList.add('names-container');
        namesContainer.innerHTML = '<h4 class="actions-names">Names:</h4>';

        if (namesList.length > 0) {
            // Table header
            const headerRow = document.createElement('div');
            headerRow.classList.add('name-row', 'header-row');
            headerRow.innerHTML = `
                <div class="name-cell"><strong>Name</strong></div>
                <div class="actions-cell"><strong>Actions</strong></div>
            `;
            namesContainer.appendChild(headerRow);

            // Rows for each name
            namesList.forEach((name, index) => {
                const row = document.createElement('div');
                row.classList.add('name-row');

                // name cell
                const nameCell = document.createElement('div');
                nameCell.classList.add('name-cell');
                nameCell.textContent = name;

                // actions cell
                const actionsCell = document.createElement('div');
                actionsCell.classList.add('actions-cell');

                // update button
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.classList.add('update-btn');
                updateButton.addEventListener('click', () => {
                    sessionStorage.setItem('nameIndex', index);
                    window.location.href = 'update.html';
                });

                // remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.classList.add('remove-btn');
                removeButton.addEventListener('click', async () => {
                    try {
                        const deleteResponse = await fetch(`http://localhost:8080/api/names/${index}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });

                        if (!deleteResponse.ok) {
                            console.error('Error removing name:', deleteResponse.status);
                            alert(`Error removing name: ${deleteResponse.status}`);
                            return;
                        }

                        // Remove row from DOM
                        row.remove();

                        // Update count
                        const remaining = document.querySelectorAll('.name-row').length - 1; // minus header
                        countElement.textContent = `There are ${remaining} names`;

                        // Show message if empty
                        if (remaining === 0) {
                            namesContainer.innerHTML = '<h4>Names:</h4><p>No names available.</p>';
                        }

                        console.log(`Successfully removed: ${name}`);
                    } catch (error) {
                        console.error('Error removing name:', error);
                        alert('Error connecting to server while removing name');
                    }
                });

                actionsCell.appendChild(updateButton);
                actionsCell.appendChild(removeButton);

                row.appendChild(nameCell);
                row.appendChild(actionsCell);

                namesContainer.appendChild(row);
            });
        } else {
            namesContainer.innerHTML += '<p>No names available.</p>';
        }

        // Add list to page
        document.body.appendChild(namesContainer);

    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server');
    }
});
