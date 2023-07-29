// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var savebtn = document.querySelectorAll(".btn");
var timeBlocksEl = document.querySelectorAll(".time-block");
// var i = 0;
var currentHour = dayjs().format('H');
var array4log = [];

renderText()

// addevent listener for save buttons
savebtn.forEach((button, i) => {
  savebtn[i].addEventListener("click", saveFunction);
})

// save text to local storage
function saveFunction(e) {
  // get time-block id of clicked button
  var parentid = e.target.parentElement.parentElement.getAttribute("id");
  // get time-block element
  var parentEl = document.getElementById(parentid);
  // object containing id and content
  var object = {
    id: parentid,
    content: parentEl.children[1].value
  }

  // find if content is already saved for that timeBlock
  const matchingIndex = array4log.findIndex(
    (item) => item.id === object.id
)
// if so replace the content
  if (matchingIndex !== -1) {
    array4log[matchingIndex] = {id: object.id, content: object.content}
  } else {
    // if it doesnt exist add it to the array
    array4log.push(object);
  }

  // save to local storage
  localStorage.setItem("savedText", JSON.stringify(array4log))
}

function renderText() {
  array4log = JSON.parse(localStorage.getItem("savedText") || "[]");

  for (var i = 0; i < array4log.length; i++) {
    var parentEl = document.getElementById(array4log[i].id);
    parentEl.children[1].textContent = array4log[i].content;
  }
}



// add date & time to page
function clock() {
  // display clock
  $('#currentDay').text(dayjs().format('MMMM D, YYYY h:mm A'));

  // refresh calander at the hour
  if (dayjs().format('m') == 11) {
    timeblockloop()
  }
  // run function on interval to keep updated
  setTimeout(clock, 1000);
}

// inital run clock
clock()


// function to check if timeblock is past present or future and add corresponding class

function colorBlocks(timeblock, i) {
  if (i + 9 == currentHour) {
    timeBlocksEl[i].classList.remove("future");
    timeBlocksEl[i].classList.add("present");

  } else if (i + 9 < currentHour) {
    timeBlocksEl[i].classList.remove("present");
    timeBlocksEl[i].classList.add("past");
  } else {
    timeBlocksEl[i].classList.remove("past");
    timeBlocksEl[i].classList.add("future");
  }

}

function timeblockloop() {
  // run each timeblock through the function
  timeBlocksEl.forEach((timeblock, i) => {
    colorBlocks(timeblock, i)

  });

}
timeblockloop()




// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });
