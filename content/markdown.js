function setup_content(note_container, note) {
    let css = document.createElement("link");
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    css.href = "https://imp1.github.io/jotter/content/markdown.css";
    document.head.appendChild(css);
    
    let body = document.getElementById("note-content");
    body.setAttribute("contenteditable", true);
    body.classList.add("note-body");
    body.classList.add("markdown");
    body.textContent = note.content;
}

// TODO: add event listener for onchange and render markdown
