function setup_input_form_content(note_container, note) {
    let css = document.createElement("link");
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    css.href = "https://raw.githubusercontent.com/IMP1/jotter/gh-pages/content/input_form.css";
    document.head.appendChild(css);

    let form = document.createElement("section");
    form.classList.add("note-body");
    form.classList.add("input-form-container");
    form.classList.add("row");

    for (key in note.content) {
        let input_field = document.createElement("div");
        input_field.classList.add("input-field", "col", "s6");
        if (note.content_layout_data[key].position !== undefined) {
            input_field.style.position = "absolute";
            input_field.style.left = note.content_layout_data[key].position[0];
            input_field.style.top = note.content_layout_data[key].position[1];
        }
        if (note.content_layout_data[key].size !== undefined) {
            input_field.style.width = note.content_layout_data[key].size[0];
            input_field.style.height = note.content_layout_data[key].size[1];
        }

        let input = document.createElement("input");
        input.setAttribute("id", "note-content-" + key);
        input.setAttribute("type", note.content_layout_data[key].type);
        input.setAttribute("value", note.content[key]);
        input_field.appendChild(input);

        let label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.textContent = note.content_layout_data[key].label;
        input_field.appendChild(label);

        form.appendChild(input_field);
    }

    note_container.appendChild(form);
    // TODO: use content_layout_data to position input fields
}
