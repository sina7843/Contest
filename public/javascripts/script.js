(function () {
   const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

   let birthday = "Mar 25, 2021 13:00:00",
      countDown = new Date(birthday).getTime(),
      x = setInterval(function () {

         let now = new Date().getTime(),
            distance = countDown - now;
         let dayleft = Math.floor(distance / (day)),
            hourleft = Math.floor((distance % (day)) / (hour)),
            minuteleft = Math.floor((distance % (hour)) / (minute)),
            secondleft = Math.floor((distance % (minute)) / second);
         document.getElementById("days").innerHTML = `<span>${Math.floor(dayleft / 10)}</span><span>${dayleft % 10}</span>`,
            document.getElementById("hours").innerHTML = `<span>${Math.floor(hourleft / 10)}</span><span>${hourleft % 10}</span>`,
            document.getElementById("minutes").innerHTML = `<span>${Math.floor(minuteleft / 10)}</span><span>${minuteleft % 10}</span>`,
            document.getElementById("seconds").innerHTML = `<span>${Math.floor(secondleft / 10)}</span><span>${secondleft % 10}</span>`;

         //do something later when date is reached
         if (distance < 0) {
            let headline = document.getElementById("headline"),
               countdown = document.getElementById("countdown"),
               content = document.getElementById("content");

            headline.innerText = "It's my birthday!";
            countdown.style.display = "none";
            content.style.display = "block";

            clearInterval(x);
         }
         //seconds
      }, 0)
}());
