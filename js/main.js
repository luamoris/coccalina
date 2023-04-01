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
   window.setInterval(function () {
      clockElm.textContent = getCLockUTC(timezoneUTC);
   }, 1000);
}



// Share
const shareButton = document.getElementById("share-button");
const shareUrl = window.location.href;
const shareTitle = document.title;

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