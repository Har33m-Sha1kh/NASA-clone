const menu_icon = document.querySelector(".menu-icon"),
   menu_input = document.querySelector(".menu-input"),
   menu_list = document.querySelector(".menu"),
   sidebar_imgs = document.querySelector(".imgs"),
   search_icon = document.querySelector(".fa-magnifying-glass"),
   loader = document.querySelector(".center"),
   divs = document.querySelectorAll(".anim"),
   img_of_the_day = document.querySelector(".image-of-the-day"),
   imgpara = document.querySelector(".imgpara"),
   header_img = document.querySelector(".header-img"),
   more_imgs = document.querySelectorAll(".more-imgs"),
   header_title = document.querySelector(".header-title");
 
let currentIndex = 0,
   array = [{
      url: "assets/image.jpg",
      title: "Mission Expedition 71 !"
   }];




/// header image transition 

function anim() {
   const currentDiv = divs[currentIndex % divs.length];
   currentDiv.classList.add("loader");
   header_img.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.377),rgba(0, 0, 0, 0.712)), url(${array[currentIndex % array.length].url})`;
   header_title.innerHTML=array[currentIndex % array.length].title;
   setTimeout(() => {
      currentDiv.classList.remove("loader");
   }, 5000);
   currentIndex++;
}

setInterval(anim, 4000);

setTimeout(()=>{
    loader.style.display="none";
    document.body.style.overflowY="scroll";
},5000)


// icon click effect

menu_icon.addEventListener("click", () => {
   func(menu_list, "hide", "show");
   if (menu_list.nextElementSibling.classList.contains("slide-bar"))
      func(menu_list.nextElementSibling, "remove-bar", "slide-bar");

})

menu_input.addEventListener("click", () => {
   func(menu_list, "hide", "show");
   func(sidebar_imgs, "hide", "show");
})

search_icon.addEventListener("click", () => {
   func(menu_list.nextElementSibling, "remove-bar", "slide-bar");
   if (menu_list.classList.contains("show"))
      func(menu_list, "show", "hide");
})


// function for class toggle
const func = (caller, arg1, arg2) => {
   caller.classList.toggle(arg1);
   caller.classList.toggle(arg2);
}



// APIs data fetching for general images 

fetch("https://images-api.nasa.gov/search?q=&media_type=image")
   .then((response) => response.json())
   .then(data => {

      img_of_the_day.setAttribute("src", data.collection.items[0].links[0].href);
      imgpara.innerHTML = data.collection.items[0].data[0].description;

      array.push(
         {
            url: data.collection.items[4].links[0].href
            , title: data.collection.items[4].data[0].title
         },
         {
            url: data.collection.items[5].links[0].href,
            title: data.collection.items[5].data[0].title
         })


      divs.forEach((e, index) => {
         e.firstElementChild.setAttribute("src", array[index].url);
      })

      let index = 5;
      more_imgs.forEach((e) => {
         e.setAttribute("src", data.collection.items[index].links[0].href);
         index++;
      })
   })
   .catch(error => console.log(error));


// fetching technology api

fetch("https://images-api.nasa.gov/search?q=technology&media_type=image")
   .then((response) => response.json())
   .then((data) => {
      let techs = document.querySelectorAll('.tech'),
         tech_containers = document.querySelectorAll('.tech-container');

      techs.forEach((e) => {
         let random = Math.trunc(Math.random() * data.collection.items.length);
         let imageUrl = data.collection.items[random].links[0].href;
         let title = data.collection.items[random].data[0].title;

         e.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.377), rgba(0, 0, 0, 0.712)), url(${imageUrl})`;
         e.firstElementChild.innerHTML = title;

      });

      tech_containers.forEach((e) => {
         let random = Math.trunc(Math.random() * data.collection.items.length);
         let imageUrl = data.collection.items[random].links[0].href;
         let title = data.collection.items[random].data[0].title;

         e.setAttribute("src", imageUrl);
         e.nextElementSibling.children[1].innerHTML = title;
      });
   })
   .catch((error) => console.log(error));

// fetching api for news

fetch("https://images-api.nasa.gov/search?q=news&media_type=image")
   .then((response) => response.json())
   .then((data) => {

      let news_updates = document.querySelectorAll('.news-updates');

      news_updates.forEach((e) => {
         let random = Math.trunc(Math.random() * data.collection.items.length);
         let imageUrl = data.collection.items[random].links[0].href;
         let title = data.collection.items[random].data[0].title;

         e.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.377), rgba(0, 0, 0, 0.712)), url(${imageUrl})`;
         e.children[1].children[1].innerHTML = title;
      })


   })
   .catch((error) => console.log(error));





