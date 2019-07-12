function setup_input_form_content(note_container, note) {
    let body = document.createElement("section");
    body.setAttribute("contenteditable", true);
    body.classList.add("note-body");
    body.textContent = note.content;
    note_container.appendChild(body);
    // TODO: use content_layout_data to position input fields
}
