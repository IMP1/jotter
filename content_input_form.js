function setup_input_form_content(note_container, note) {
    let form = document.createElement("section");
    form.classList.add("note-body");

    for (key in note.content) {
        let input_field = document.createElement("div");
        input_field.classList.add("input-field", "col");

        let input = document.createElement("input");
        input.setAttribute("id", "note-content-" + key);
        input.setAttribute("type", note.content_layout_data[key].type);
        input.setAttribute("value", note.content[key]);
        input_field.appendChild(input);

        let label = document.createElement("label");
        label.setAttribute("for", input.id);
        input_field.appendChild(label);

        form.appendChild(input_field);
    }

    note_container.appendChild(form);
    // TODO: use content_layout_data to position input fields
}
