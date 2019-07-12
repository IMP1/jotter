function setup_input_form_content(note_container, note) {
    let form = document.createElement("section");
    form.classList.add("note-body");

    for (key in note.content) {
        let input = document.createElement("input");
        input.setAttribute("type", note.content_layout_data[key].type);
        input.setAttribute("value", note.content[key]);
        form.appendChild(input);
    }

    note_container.appendChild(form);
    // TODO: use content_layout_data to position input fields
}
