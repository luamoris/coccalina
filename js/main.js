//  Частицы Stars
const bg = document.getElementById("bg");
const starsCounter = 20;

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min;
}

function createStar() {
   const star = document.createElement("span");
   star.classList.add("star");
   return star;
}

function sizeWindow() {
   return {
      widht: window.innerWidth,
      height: window.innerHeight,
   };
}

function initStar() {
   const star = createStar();
   let size = sizeWindow();
   let point = { x: 0, y: 0 };
   let x = 0, y = 0, speed = 0;
   let width = 6, height = 6;
   let xRandom, yRandom = 0;
   const colors = ["_c_pink", "_c_yellow", "_c_blue", "_c_green"];
   let color = colors[getRandomInt(0, colors.length)];
   let right = getRandomInt(0, 2) == 0 ? true : false;
   let top = getRandomInt(0, 2) == 0 ? true : false;

   const createPoints = () => {
      return {
         x: getRandomInt(0, size.widht),
         y: getRandomInt(0, size.height),
      };
   };

   const init = () => {
      x, y = 0, 0;
      size = sizeWindow();
      point = createPoints();
      speed = getRandomInt(-1, 2);
      width = getRandomInt(6, 11);
      height = getRandomInt(6, 11);
      color = colors[getRandomInt(0, colors.length)];
      star.style.width = width + "px";
      star.style.height = height + "px";
      star.style.left = point.x + "px";
      star.style.top = point.y + "px";
      star.style.transform = `translate(0px, 0px)`;
      right = getRandomInt(0, 2) == 0 ? true : false;
      top = getRandomInt(0, 2) == 0 ? true : false;
      xRandom = right ? getRandomInt(1, 3) : getRandomInt(-3, -1);
      yRandom = top ? getRandomInt(1, 3) : getRandomInt(-3, -1);
   };

   init();
   star.classList.add(color);
   star.classList.add("_start");
   let isPaused = false;

   const move = setInterval(function () {
      if (!isPaused) {
         x = x + xRandom;
         y = y + yRandom;
         star.style.transform = `translate(${x}px, ${y}px)`;
         if (point.x + x < 0 - width || point.x + x > size.widht || point.y + y < 0 - height || point.y + y > size.height) {
            // console.log(point.x + x, point.y + y);
            // clearInterval(move);
            star.classList.remove("_start");
            star.classList.remove(color);
            star.classList.add("_end");
            isPaused = true;
            setTimeout(function () {
               init();
               star.classList.remove("_end");
               star.classList.add(color);
               star.classList.add("_start");
               isPaused = false;
            }, 2000);
         }
      }
   }, 25);

   return star;
}

// Current Year
const yearElm = document.getElementById("year");
const currentYear = (new Date()).getFullYear();
yearElm.textContent = currentYear;

// Clock
const clockElm = document.getElementById("clock");
const timezoneUTC = "2"; // Duesseldorf GMT+0200

function getCLockUTC(utc) {
   const now = new Date();
   const ms = now.getTime() + (now.getTimezoneOffset() * 60000) + utc * 3600000;
   const time = new Date(ms);
   const hour = time.getHours();
   const minute = time.getMinutes();
   return ((hour < 10) ? "0" : "") + hour + ((minute < 10) ? ":0" : ":") + minute;
}

clockElm.textContent = getCLockUTC(timezoneUTC);
window.onload = function () {
   let i = 0;
   const createStars = setInterval(function () {
      if (i > starsCounter) {
         clearInterval(createStars)
      }
      bg.appendChild(initStar());
      i++;
   }, 1000);

   window.setInterval(function () {
      clockElm.textContent = getCLockUTC(timezoneUTC);
   }, 1000);
}



// Share
const shareButton = document.getElementById("share-button");
const shareUrl = window.location.href;
const shareTitle = "I'm Alina Rundko, a graphic designer. My portfolio demonstrates my skill in creating eye-catching and distinctive designs for brands, packaging, web, and UI. With my attention to detail, aesthetics, and understanding of clients' needs, I can help elevate your brand's visual identity. Take a look at my work and let's discuss how I can help you.\n"; // document.title;

shareButton.addEventListener('click', () => {
   if (navigator.share) {
      navigator.share({
         title: shareTitle,
         url: shareUrl,
      }).catch(console.error);
   } else {
      alert('Web Share API is not supported!');
   }
});

// Colors
const avatarElm = document.getElementById("avatar");
const colorClasses = ["_white", "_pink", "_orange", "_green", "_blue"];
let colorId = 0;

avatarElm.addEventListener('click', () => {
   avatarElm.classList.remove(colorClasses[colorId]);
   colorId = colorId == colorClasses.length - 1 ? 0 : colorId + 1;
   avatarElm.classList.add(colorClasses[colorId]);
});

// Go to the Moon
const cardElm = document.getElementById("card");
const catElm = document.getElementById("cat");
const favoriteColor = 2; // orange
const timeoutSecMoon = 3000;
const timeoutSecBack = 1000;
const classMoon = "to-the-moon";
const classBack = "to-the-back";
const classNotEvents = "notevent";

catElm.addEventListener('click', async () => {
   if (colorId == favoriteColor) {
      cardElm.classList.add(classMoon, classNotEvents);
      await new Promise(r => setTimeout(r, timeoutSecMoon));
      cardElm.classList.remove(classMoon);
      cardElm.classList.add(classBack);
      await new Promise(r => setTimeout(r, timeoutSecBack));
      cardElm.classList.remove(classBack, classNotEvents);
   }
});
