let imgData = {
  img1: {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  img2: {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title:
      "a man and a woman trying to cook a meal together in a modern kitchen.jpg",
  },
  img3: {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  img4: {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2022.ppt",
  },
  img5: {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-may-2022.key",
  },
};
let imgTitle = [
  "cat.jpeg",
  "a man and a woman trying to cook a meal together in a modern kitchen.jpg",
  "bali-kelingking-beach-plastic-removal-drive.key",
  "NextByk Investor Pitch 2022.ppt",
  "interns-performance-report-may-2022.key",
];
function compute_new_title(title) {
  if (title.length < 30) {
    return title;
  } else {
    let new_title = title.slice(0, 12) + "..." + title.slice(title.length - 12);
    return new_title;
  }
}

let leftChild = document.querySelector(".child-left");

document.querySelector('input[name="img-title"]').value =
  imgData["img1"]["title"];
var flag_selected = 0;

for (const key in imgData) {
  //   console.log(`${key}: ${imgData[key]["title"]}`);
  let new_img = document.createElement("div");
  if (flag_selected === 0) {
    flag_selected = 1;
    new_img.className = "img-short option-selected";
  } else {
    new_img.className = "img-short";
  }
  let new_img_left = document.createElement("div");
  new_img_left.className = "img-short-left";
  let new_img_right = document.createElement("div");
  new_img_right.className = "img-short-right";
  new_img_right.innerText = compute_new_title(imgData[key]["title"]);
  let img = document.createElement("img");
  img.src = imgData[key]["previewImage"];
  new_img_left.appendChild(img);
  new_img.appendChild(new_img_left);
  new_img.appendChild(new_img_right);
  leftChild.appendChild(new_img);
  new_img.addEventListener("click", (event) => {
    console.log("Image clicked : " + key);
    let img_view = document.querySelector(".child-right .img-view img");
    img_view.src = imgData[key]["previewImage"];
    document.querySelector('input[name="img-title"]').value =
      imgData[key]["title"];
    select(event);
  });
}

let img_Title = document.querySelector('input[name="img-title"]');
var currentTitle;
img_Title.addEventListener("click", () => {
  currentTitle = img_Title.value;
});

img_Title.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // code for enter
    let newImgTitle = imgTitle.forEach((element) => {
      if (element === currentTitle) {
        return img_Title.value;
      }
    });
  }
});

function select(e) {
  // Unset selected class from other options
  const selected = document.querySelectorAll(".child-left .option-selected");
  selected.forEach(function (el) {
    el.classList.remove("option-selected");
  });
  console.log(e.target.classList);
  var x = e.target;
  while (x.parentElement.classList[0] != "img-short") {
    x = x.parentElement;
  }
  x.parentElement.classList.add("option-selected");
}
