document.addEventListener("DOMContentLoaded", function () {

  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const symbol = counter.getAttribute("data-symbol") || "+";
    let count = 0;

    const duration = 2000; // animation duration (2 seconds)
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      count++;

      counter.innerText = count + symbol;

      if (count >= target) {
        counter.innerText = target + symbol;
        clearInterval(timer);
      }

    }, stepTime);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }

    });
  }, {
    threshold: 0.6
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });

});