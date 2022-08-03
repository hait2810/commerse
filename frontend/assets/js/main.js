var scoll = document.querySelector(".wrapper__header-top")
window.addEventListener("scroll", () => {
    var y = scrollY;
    if(y >= 50) {
        scoll.classList.add("fixed")
    }else {
        scoll.classList.remove("fixed")
    }
})



var modal = document.querySelector(".modal_search");
var btn = document.querySelector(".search");
var close = document.querySelector(".close")
btn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("hj"); 
    modal.style.display = "block";
})
close.addEventListener("click", (e) => {
    e.preventDefault()
    modal.style.display = "none"
})




var btnnav = document.querySelector('.btn_nav')
var subnav = document.querySelector('.subnav')
btnnav.addEventListener("click", (e) => {
        e.preventDefault() 
        subnav.style.display = "block"
})


window.onclick = function(event)  {
    
    if(event.target === modal) {
        modal.style.display = "none"
    }
    if(event.target != btnnav) {
        subnav.style.display = "none"
    }
}



var logo = document.querySelector(".main__logo")
var btns = document.querySelectorAll(".btn__logo")
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
            btns.forEach((button) => button.classList.remove('active'))
            btn.classList.add("active")
            logo.src = btn.src
    })
})





var btnsize = document.querySelectorAll(".btn_size")
btnsize.forEach((btns) => {
    btns.addEventListener("click", (e) => {
        e.preventDefault()
        btnsize.forEach((btn) => btn.classList.remove('active__size'))
        btns.classList.add('active__size')
    })
})



var btncolor = document.querySelectorAll(".btn_color")
btncolor.forEach((btns) => {
    btns.addEventListener('click', (e) => {
        e.preventDefault()
        btncolor.forEach((btn) => btn.classList.remove('active__color'))
        btns.classList.add('active__color')
    })
})


var add = document.querySelector(".add")
var minus = document.querySelector(".minus")


var i = document.querySelector('.show_quantity').value;
add.addEventListener('click' , (e) => {
    e.preventDefault() 
    i++
    document.querySelector('.show_quantity').value = i
})

minus.addEventListener('click', (e) => {
    e.preventDefault()
    if(i > 0) {
        i--
    document.querySelector('.show_quantity').value = i
    }

})