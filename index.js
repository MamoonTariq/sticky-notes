let add_btn = document.getElementById("submit");
add_btn.addEventListener("click", function () {
  let sticky_text = document.getElementById("sticky_text");
  let sticky_notes = localStorage.getItem("sticky_notes");
  if (sticky_notes == null) {
    sticky_arr = [];
  } else {
    sticky_arr = JSON.parse(sticky_notes);
  }
  sticky_arr.push(sticky_text.value);
  localStorage.setItem("sticky_notes", JSON.stringify(sticky_arr));
  sticky_text.value = "";
  display_notes();
});

function display_notes() {
  let sticky_notes = localStorage.getItem("sticky_notes");
  if (sticky_notes == null) {
    sticky_arr = [];
  } else {
    sticky_arr = JSON.parse(sticky_notes);
  }
  let content = "";
  sticky_arr.forEach(function (element, index) {
    content += `<div class="single-note">
                <h5>${index + 1}</h5>
                <p>${element}</p>
                <button id="${index}" onclick="delete_note(this.id)">Delete</button>
            </div>`;
  });
  let notes_el = document.getElementById("dis_all_notes");
  if (sticky_arr.length != 0) {
    notes_el.innerHTML = content;
  } else {
    notes_el.innerHTML = `No notes found`;
  }
}
function delete_note(index) {
  //console.log(index);
  let sticky_notes = localStorage.getItem("sticky_notes");
  if (sticky_notes == null) {
    sticky_arr = [];
  } else {
    sticky_arr = JSON.parse(sticky_notes);
  }
  sticky_arr.splice(index, 1);
  localStorage.setItem("sticky_notes", JSON.stringify(sticky_arr));
  display_notes();
}

display_notes();

// Search Functionlaity;
let search = document.getElementById("search");
search.addEventListener("input", function () {
  let search_val = search.value.toLowerCase();
  // console.log(search_val);
  let all_note = document.getElementsByClassName("single-note");
  Array.from(all_note).forEach(function (element, index) {
    let cardtext = element.getElementsByTagName("p")[0].innerText;
    //console.log(cardtext);
    if (cardtext.includes(search_val)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
