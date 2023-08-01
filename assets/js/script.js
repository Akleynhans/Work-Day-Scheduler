// assign variables
var savebtn = document.querySelectorAll(".btn");
var timeBlocksEl = document.querySelectorAll(".time-block");
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

// pull saved text from local storage
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

  // run function to keep colors current
  timeblockloop()

  // run function on interval to keep updated
  setTimeout(clock, 1000);
}

// inital run clock
clock()


// function to check if timeblock is past present or future and add corresponding class
function colorBlocks(timeblock, i) {
  // finds the current hour
  var currentHour = dayjs().format('H');
  
  // uses class attributes to assign colors based on the current time
  if (i + 9 == currentHour) {
    timeBlocksEl[i].classList.remove("future");
    timeBlocksEl[i].classList.remove("past");
    timeBlocksEl[i].classList.add("present");
  } else if (i + 9 < currentHour) {
    timeBlocksEl[i].classList.remove("present");
    timeBlocksEl[i].classList.remove("future");
    timeBlocksEl[i].classList.add("past");
  } else {
    timeBlocksEl[i].classList.remove("past");
    timeBlocksEl[i].classList.remove("present");
    timeBlocksEl[i].classList.add("future");
  }

}

function timeblockloop() {
  // run each timeblock through the function
  timeBlocksEl.forEach((timeblock, i) => {
    colorBlocks(timeblock, i)
   

  });

}



