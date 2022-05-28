import { imgData, imgTitle } from "./imgData.js";

var currentSelectedIndex = 0;
let leftChild = document.querySelector(".child-left");
var flag_selected = 0;

// function used to calculate the title and convert to abc...xyz format incase of large length
function compute_new_title(title) {
  // if length is less than 30 characters then show as it is
  if (title.length < 30) {
    return title;
  } else {
    // in case length is greater than 30 characters than take first 12 characters and last 12 characters
    let new_title = title.slice(0, 12) + "..." + title.slice(title.length - 12);
    return new_title;
  }
}

// add img data imported to the HTML page by iterating over each element of imgData
for (const key in imgData) {
  setDataToHTML(key);
}

// set data to HTML in a organised manner
var is_vertical;
function setDataToHTML(key) {
  console.log(`${key}: ${imgData[key]["title"]}`);
  // create new conaier for the img to be added
  let new_img = document.createElement("div");
  is_vertical = 0;
  is_vertical = parseInt(imgData[key]["vertical"]);
  if (flag_selected === 0) {
    flag_selected = 1;
    // if intial no image selected so view the title in the input view of title
    new_img.className = "img-short option-selected";
    document.querySelector('input[name="img-title"]').value =
      imgData[key]["title"];
    document.querySelector('input[name="img-view-link"]').value =
      imgData[key]["previewImage"];
  } else {
    new_img.className = "img-short";
  }
  // create the div element containing image tag
  let new_img_left = document.createElement("div");
  new_img_left.className = "img-short-left";
  // create the div element containg title of image
  let new_img_right = document.createElement("div");
  new_img_right.className = "img-short-right";
  // calculate the title according to syntax abc..xyz
  new_img_right.innerText = compute_new_title(imgData[key]["title"]);
  // image element of the left side
  let img1 = document.createElement("img");
  img1.src = imgData[key]["previewImage"];
  let img2 = document.createElement("img");
  img2.src = imgData[key]["previewImage"];
  if (is_vertical) {
    img1.style.width = "70%";
  }
  let imgSpan = document.createElement("span");
  // append the elements to provide perfect orientation
  imgSpan.appendChild(img2);
  new_img_left.appendChild(img1);
  new_img_left.appendChild(imgSpan);
  new_img.appendChild(new_img_left);
  new_img.appendChild(new_img_right);
  leftChild.appendChild(new_img);

  // add event listener of click so on click we show coreesponding image and title
  new_img.addEventListener("click", (event) => {
    console.log("Image clicked : " + key);
    select(event, key, 0);
  });
}

function select(e, key, is_keypressed) {
  // update the image to the right side
  let img_view = document.querySelector(".child-right .img-view img");
  img_view.src = imgData[key]["previewImage"];
  // update the title to the left
  document.querySelector('input[name="img-title"]').value = imgTitle[key];
  document.querySelector('input[name="img-view-link"]').value =
    imgData[key]["previewImage"];
  //update the current index of image
  currentSelectedIndex = key;
  console.log("Index of image selected : ", currentSelectedIndex);
  // change color of selected image and unset rest of the images
  changeSelectedBackground(e, is_keypressed);
}

function changeSelectedBackground(e, is_keypressed) {
  const selected = document.querySelectorAll(".child-left .option-selected");
  // unset all the images
  selected.forEach(function (el) {
    el.classList.remove("option-selected");
  });

  // console.log(e.target.classList);
  if (is_keypressed == "0") {
    // if the item was clicked then we have to find the element where we want to add the class option selected
    var x = e.target;
    while (x.parentElement.classList[0] != "img-short") {
      x = x.parentElement;
    }
    x.parentElement.classList.add("option-selected");
  } else {
    // when the key was pressed we already gave the element where we had to add the class
    document
      .querySelector(".child-left")
      .children[currentSelectedIndex].classList.add("option-selected");
  }
}

let img_Title = document.querySelector('input[name="img-title"]');
let img_Link = document.querySelector('input[name="img-view-link"]');
// add event listener for title change and upadate to left side along with the database of imgTitle
img_Title.addEventListener("keypress", function (e) {
  console.log("maybe the title changed");
  var newTitle = document.querySelector('input[name="img-title"]').value;
  // current index tracks the image to be shown
  imgTitle[parseInt(currentSelectedIndex)] = newTitle;
  document.querySelector(".child-left").children[
    currentSelectedIndex
  ].children[1].innerText = compute_new_title(newTitle);
});

img_Link.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // code for enter
    console.log("maybe the link changed");
    var newLink = document.querySelector('input[name="img-view-link"]').value;
    // current index tracks the image to be shown
    imgData[parseInt(currentSelectedIndex)]["previewImage"] = newLink;
    // updating image element
    document.querySelector(".child-left").children[
      currentSelectedIndex
    ].children[0].children[0].src = newLink;
    // updating the span element
    document.querySelector(".child-left").children[
      currentSelectedIndex
    ].children[0].children[1].children[0].src = newLink;
    let img_view = document.querySelector(".child-right .img-view img");
    img_view.src = imgData[currentSelectedIndex]["previewImage"];
  }
});

// add event listener when some keyboard key is pressed
document.addEventListener("keydown", (event) => {
  console.log("keypressed");
  // if the key is arrow key down
  if (event.key == "ArrowDown") {
    console.log("key down");
    if (currentSelectedIndex < imgTitle.length - 1) {
      select(event, parseInt(currentSelectedIndex) + 1, 1);
    }
  }

  // if the key is arrow key up
  if (event.key == "ArrowUp") {
    // select(event, key);
    console.log("keyup");
    if (currentSelectedIndex > 0) {
      select(event, parseInt(currentSelectedIndex) - 1, 1);
    }
  }
});

window.addEventListener(
  "keydown",
  function (e) {
    if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  },
  false
);
