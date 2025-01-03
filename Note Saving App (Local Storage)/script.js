const button = document.getElementById('btn');
        const textArea = document.getElementById('textID');
        const noteContainer = document.querySelector('.noteContainer');
        let notes = JSON.parse(localStorage.getItem('notes')) || []; // Load existing notes

        // Save note on button click
        button.addEventListener('click', function () {
            const note = textArea.value.trim(); // Trim whitespace
            if (note !== '') {
                notes.push(note); // Add note to the array
                localStorage.setItem('notes', JSON.stringify(notes)); // Save to local storage
                textArea.value = ''; // Clear the text area
                displayNotes(); // Update the displayed notes
            } else {
                alert('Please Enter Your Note');
            }
        });

        // Display notes on page load
        window.addEventListener('load', function () {
            displayNotes();
        });

        // Function to display notes
        function displayNotes() {
            noteContainer.innerHTML = ''; // Clear the container
            notes.forEach((note, index) => {
                const newNote = document.createElement('div');
                newNote.classList.add('note-card');
                newNote.innerHTML = `
            <p>${note}</p>
            <button class="deleteBtn" data-index="${index}">Delete</button>`;
                noteContainer.appendChild(newNote);
            });

            // Add event listeners to delete buttons
            const deleteButtons = document.querySelectorAll('.deleteBtn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteNote);
            });
        }

        // Function to delete a note
        function deleteNote(event) {
            const index = event.target.getAttribute('data-index'); // Get the index of the note to delete
            notes.splice(index, 1); // Remove the note from the array
            localStorage.setItem('notes', JSON.stringify(notes)); // Update local storage
            displayNotes(); // Refresh the displayed notes
        }