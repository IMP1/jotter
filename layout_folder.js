function add_note(list_element, note_data) {

    let card_container = document.createElement("div");
    card_container.classList.add("card-container", "col", "s12", "m4", "l3");

    let card = document.createElement("div");
    card.classList.add("mdc-card", "blue-grey");

    let content = document.createElement("a");
    content.setAttribute("href", "?note=" + note_data.id);
    content.classList.add("mdc-card__primary-action");

    let header = document.createElement("header");
    header.classList.add("demo-card__primary", "white-text");

    let icons = document.createElement("ul");
    icons.classList.add("note-card-icons");

    // let child_layout_icon = document.createElement("li");
    // child_layout_icon.classList.add("material-icons");
    // if (note_data.children_layout == 3) {
    //     child_layout_icon.textContent = "dns";
    // } else if (note_data.children_layout == 2) {
    //     child_layout_icon.textContent = "timeline";
    // } else {
    //     child_layout_icon.textContent = "view_module";
    // }
    // icons.appendChild(child_layout_icon);

    let content_layout_icon = document.createElement("li");
    content_layout_icon.classList.add("material-icons");
    if (note_data.content_layout == 3) {
        content_layout_icon.textContent = "assignment_ind";
    } else if (note_data.content_layout == 2) {
        content_layout_icon.textContent = "assignment";
    } else if (note_data.children_layout == 3) {
        content_layout_icon.textContent = "dns";
    } else if (note_data.children_layout == 2) {
        content_layout_icon.textContent = "timeline";
    } else if (note_data.children.length > 0) {
        content_layout_icon.textContent = "folder";
    } else {
        content_layout_icon.textContent = "description";
    }
    icons.appendChild(content_layout_icon);

    header.appendChild(icons);

    let title = document.createElement("h2");
    title.classList.add("note-card-title", "demo-card__title", "mdc-typography", "mdc-typography--headline6", "white-text");
    title.textContent = note_data.name;
    header.appendChild(title);

    content.appendChild(header);

    let body = document.createElement("div");
    body.classList.add("flow-text", "demo-card__secondary", "mdc-typography", "mdc-typography--body2", "white-text");
    body.textContent = note_data.content;
    content.appendChild(body);

    card.appendChild(content);

    let actions = document.createElement("div");
    actions.classList.add("mdc-card__actions");

    let buttons = document.createElement("div");
    buttons.classList.add("mdc-card__action-buttons");

    let main_button = document.createElement("a");
    main_button.classList.add("mdc-button", "mdc-card__action", "mdc-card__action--button", "white-text");
    main_button.setAttribute("href", "?note=" + note_data.id);
    main_button.textContent = "View Note";
    buttons.appendChild(main_button);

    let action_icons = document.createElement("div");
    action_icons.classList.add("mdc-card__action-icons", "white-text");

    let delete_button = document.createElement("button");
    delete_button.classList.add("mdc-icon-button", "material-icons", "mdc-card__action", "mdc-card__action--icon--unbounded");
    delete_button.setAttribute("title", "Delete");
    delete_button.setAttribute("data-mdc-ripple-is-unbounded", true);
    delete_button.textContent = "delete";

    let more_button = document.createElement("button");
    more_button.classList.add("mdc-icon-button", "material-icons", "mdc-card__action", "mdc-card__action--icon--unbounded");
    more_button.setAttribute("title", "More Options");
    more_button.setAttribute("data-mdc-ripple-is-unbounded", true);
    more_button.textContent = "more_vert";

    action_icons.appendChild(delete_button);
    action_icons.appendChild(more_button);

    actions.appendChild(buttons);
    actions.appendChild(action_icons);
    card.appendChild(actions);

    card_container.appendChild(card);
    list_element.appendChild(card_container);
}

function setup_folder(note, list_element) {
    let child_notes = {
        notes: [],
        loaded: 0,
        size: note.children.length,
    };
    for (var i = 0; i < child_notes.size; i ++) {
        let index = i;
        make_cors_request(note.children[i], "application/json",
            function(text) {
                let child_note = JSON.parse(text);
                add_children(list_element, child_notes, child_note, index);
            },
            function() {
                console.log("An error occured when trying to access the following URL: " + url);
            },
        );
    }
}

function add_children(list_element, child_notes, child_note, index) {
    child_notes.notes[index] = child_note;
    child_notes.loaded += 1
    if (child_notes.loaded == child_notes.size) {
        for (var i = 0; i < child_notes.size; i ++) {
            add_note(list_element, child_notes.notes[i]);
        }
    }
}

function setup_folder_container(note_container, note) {
    note_container.classList.add("folder-container");

    let folder = document.createElement("div");
    folder.classList.add("note-children", "row");

    setup_folder(note, folder);

    note_container.appendChild(folder);
}