function setup_markdown_content(note_container, note) {
    let body = document.createElement("section");
    body.setAttribute("contenteditable", true);
    body.classList.add("note-body");
    body.classList.add("markdown");
    body.textContent = note.content;
    note_container.appendChild(body);
}

// TODO: add event listener for onchange and render markdown