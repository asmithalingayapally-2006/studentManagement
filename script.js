
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const studentCount = document.getElementById("studentCount");
const emptyMessage = document.getElementById("emptyMessage");
const editIndex = document.getElementById("editIndex");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

let students = [];

try {
    const savedStudents = JSON.parse(
        localStorage.getItem("students") || "[]"
    );

    if (Array.isArray(savedStudents)) {
        students = savedStudents.filter(student =>
            student &&
            typeof student.id === "string" &&
            typeof student.name === "string" &&
            typeof student.course === "string" &&
            typeof student.email === "string"
        );
    }
} catch (error) {
    students = [];
}

// Display student records
function displayStudents() {
    table.replaceChildren();

    const keyword = search.value.trim().toLowerCase();

    const filteredStudents = students
        .map((student, index) => ({ student, index }))
        .filter(({ student }) =>
            student.id.toLowerCase().includes(keyword) ||
            student.name.toLowerCase().includes(keyword) ||
            student.course.toLowerCase().includes(keyword) ||
            student.email.toLowerCase().includes(keyword)
        );

    studentCount.textContent =
        "Total Students: " + students.length;

    emptyMessage.textContent = filteredStudents.length
        ? ""
        : students.length
            ? "No matching students found."
            : "No students added yet.";

    emptyMessage.hidden = filteredStudents.length > 0;

    filteredStudents.forEach(({ student, index }) => {
        const row = document.createElement("tr");

        [student.id, student.name, student.course, student.email]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", () => editStudent(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteStudent(index));

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// Save student records in the browser
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Add or update a student
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = {
        id: document.getElementById("studentId").value.trim(),
        name: document.getElementById("name").value.trim(),
        course: document.getElementById("course").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    if (!student.id || !student.name ||
        !student.course || !student.email) {
        alert("Please fill in all fields.");
        return;
    }

    const currentIndex = editIndex.value === ""
        ? -1
        : Number(editIndex.value);

    // Prevent duplicate student IDs
    const duplicate = students.some((item, index) =>
        item.id.toLowerCase() === student.id.toLowerCase() &&
        index !== currentIndex
    );

    if (duplicate) {
        alert("This Student ID already exists.");
        return;
    }

    if (currentIndex === -1) {
        students.push(student);
        alert("Student added successfully!");
    } else {
        students[currentIndex] = student;
        alert("Student updated successfully!");
    }

    saveStudents();
    resetForm();
    displayStudents();
});

// Edit student
function editStudent(index) {
    const student = students[index];

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("email").value = student.email;

    editIndex.value = index;
    formTitle.textContent = "Edit Student";
    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;

    form.scrollIntoView({ behavior: "smooth" });
}

// Delete student
function deleteStudent(index) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
        students.splice(index, 1);
        saveStudents();
        resetForm();
        displayStudents();
    }
}

// Reset form
function resetForm() {
    form.reset();
    editIndex.value = "";
    formTitle.textContent = "Add Student";
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}

// Cancel editing
cancelBtn.addEventListener("click", resetForm);

// Search students
search.addEventListener("input", displayStudents);

// Initial display
displayStudents();
