const flags = document.querySelectorAll(".flags");
const boxes = document.querySelectorAll(".boxes");
const btn = document.querySelector(".btn-check");
let currentDrag;

const dragStart = ({ target }) => {
    currentDrag = target;
    setTimeout(() => (target.style.opacity = 0), 0);
};

const dragEnd = ({ target }) => (target.style.opacity = 1);

flags.forEach((flag) => {
    flag.addEventListener("dragstart", dragStart);
    flag.addEventListener("dragend", dragEnd);
});

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
}

function dragLeave() {
    this.classList.remove("hovered");
 }
 
function dragDrop(e, box) {
    e.preventDefault(); 
    box.classList.remove("hovered");
    box.classList.add("full");
    box.append(currentDrag);
}

boxes.forEach((box) => {
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", (e) => dragDrop(e, box));
});

// VALIDATION
btn.addEventListener("click", () => {
    $('.btn-check').hide();
    $('.footnotetwo').show();
    boxes.forEach((box) => {
        box.classList = "boxes";
        let boxColor = "error";

        if (box.children.length === 1) {
            const boxflag = box.dataset.flag;

            const img = document.querySelector(
                `div[data-flag="${boxflag}"] > img`
            );

            const imgFlag= img.dataset.flag;

            if (boxflag === imgFlag) boxColor = "valid";
        }
        
        box.classList.add(boxColor);
        
    });
});

$(function() {
    $(".flags").draggable();
  });