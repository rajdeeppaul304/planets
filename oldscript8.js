// horizontal scrollbar

// window.addEventListener('DOMContentLoaded', () => {
//   const scrollCompletionBar = document.getElementById('scrollCompletionBar');

//   // Show the completion bar when the page is scrolled
//   window.addEventListener('scroll', () => {
//     const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
//     const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;
//     scrollCompletionBar.style.width = `${scrolledPercentage}%`;

//     // Show the completion bar if not already visible
//     if (scrolledPercentage > 0) {
//       scrollCompletionBar.style.display = 'block';
//     } else {
//       scrollCompletionBar.style.display = 'none';
//     }
//   });
// });

let lastScrollY = 0; // Variable to store the last scroll position
let isAutoScrolling = false; // Flag to indicate if automatic scrolling is happening

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    scrollbarContainer: null, // Disable Locomotive Scroll's scrollbar

  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  const scrollCompletionBar = document.getElementById('scrollCompletionBar');

  // Show the completion bar when the page is scrolled
  locoScroll.on('scroll', () => {

    const scrolledPercentage = (locoScroll.scroll.instance.scroll.y / 8305) * 100;
    // console.log(locoScroll.scroll.instance.scroll.y)
    scrollCompletionBar.style.width = `${scrolledPercentage}%`;

    // Show the completion bar if not already visible
    if (scrolledPercentage > 0) {
      scrollCompletionBar.style.display = 'block';
    } else {
      scrollCompletionBar.style.display = 'none';
    }

    const currentScrollY = locoScroll.scroll.instance.scroll.y;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;

    // Log the scroll direction
    // console.log('Scroll Direction:', scrollDirection);



    // console.log(scrolledPercentage)

    if (!isAutoScrolling) {
      // isAutoScrolling =   true; // Set flag to true during automatic scrolling

      var local_scroll = locoScroll.scroll.instance.scroll.y

  

    if (scrollDirection === "down"){
    // console.log()

      if (scrolledPercentage > 21 && scrolledPercentage < 22) {
        // console.log('Scrolling to 8000 pixels');
        // locoScroll.scrollTo(8305 * 0.28);//  21 28; 48 55; 76 83
        locoScroll.scrollTo("#page2", 0);
        disableScrollTemporarily();

      }
      else if (scrolledPercentage > 47 && scrolledPercentage < 48) {
        // console.log('Scrolling to 8000 pixels');
        locoScroll.scrollTo("#page3", 0);     
        disableScrollTemporarily();
      }
      else if (scrolledPercentage > 75 && scrolledPercentage < 76) {
        // console.log('Scrolling to 8000 pixels');
        locoScroll.scrollTo("#page4", 0);      
        disableScrollTemporarily();
      }
  
    }
    if (scrollDirection === "up"){

      if (scrolledPercentage > 21 && scrolledPercentage < 22) {
        // console.log('Scrolling to 8000 pixels');
        locoScroll.scrollTo("#page1", 0);
        disableScrollTemporarily();


      }
      else if (scrolledPercentage > 47 && scrolledPercentage < 48) {
        // console.log('Scrolling to 8000 pixels');
        locoScroll.scrollTo("#page2", 0);
        disableScrollTemporarily();

      }
      else if (scrolledPercentage > 75 && scrolledPercentage < 76) {
        // console.log('Scrolling to 8000 pixels');
        locoScroll.scrollTo("#page3", 0);
        disableScrollTemporarily();

      }
  
    }

    // isAutoScrolling = false; // Set flag to true during automatic scrolling


  }


  });

  function disableScrollTemporarily() {
    const disableTime = 500; // Time in milliseconds to disable scroll (adjust as needed)
    isAutoScrolling = true
    setTimeout(() => {
      isAutoScrolling = false
    }, disableTime);
  }


  window.addEventListener('wheel', (e) => {
    if (isAutoScrolling) {
      console.log(1234)
      e.preventDefault();
    }
  }, { passive: false });


  document.addEventListener("DOMContentLoaded", function() {

    const page1Top = document.querySelector('#page1').getBoundingClientRect().top;
    const page1Bottom = document.querySelector('#page1').getBoundingClientRect().bottom;
    const page2Top = document.querySelector('#page2').getBoundingClientRect().top;
    const page2Bottom = document.querySelector('#page2').getBoundingClientRect().bottom;
    const page3Top = document.querySelector('#page3').getBoundingClientRect().top;
    const page3Bottom = document.querySelector('#page3').getBoundingClientRect().bottom;
    const page4Top = document.querySelector('#page4').getBoundingClientRect().top;
    const page4Bottom = document.querySelector('#page4').getBoundingClientRect().bottom;


    // console.log('Top pixel of #page2:', page1Top, page2Top, page3Top, page4Top, page1Bottom,page2Bottom,page3Bottom,page4Bottom);
// 0.0010000000474974513 2265 4530 6795 755.2010122070787 3020.2000122070312 5285.200012207031 7550.200012207031
  })


}


locomotive();

// const page1 = {
//   canvas: document.getElementById("can-1"),
//   context: page1.canvas.getContext("2d"),
//   images: [],
//   imageSeq: { frame: 1 },
//   frameCount: 120,
//   files: (index) => { /* function to get page 1 image paths */ },
// };


function files(index, fileprefix) {
  // Assuming index starts from 1 to 20
  if (index < 1 || index > 600) {
    return 'Index out of range';
  }
  
  // Pad the index with leading zeros to match the file naming convention
  let paddedIndex = index.toString().padStart(3, '0');
  let fileName = `${fileprefix}${paddedIndex}.png`;
  
  return fileName;
}

function createPage(elementId, frameCount, fileprefix, start_top, end_top) {
  const canvas = document.getElementById(elementId);
  const context = canvas.getContext("2d");
  const images = [];
  const imageSeq = { frame: 1 };

  canvas.width = window.innerWidth * 0.5;
  canvas.height = window.innerHeight * 0.5;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i, fileprefix);
    images.push(img);
  }

  
  const render = () => {
    scaleImage(images[imageSeq.frame], context);
  };

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 1,
      // markers:true,
      trigger: `${elementId}`, //change to page no. if doesnt work
      start: `${start_top}% top`,
      end: `${end_top}% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });
  


  return {
    canvas,
    context,
    images,
    imageSeq,
    frameCount,
  };
}

const page1 = createPage("can-1", 150, "./images/icyplanet-600/image_", 0, 300);
const page2 = createPage("can-2", 150, "./images/icyplanet-600/image_",250, 600);
const page3 = createPage("can-3", 150, "./images/icyplanet-600/image_",550, 900);
const page4 = createPage("can-4", 150, "./images/icyplanet-600/image_",850, 1200);



const pages = {page1, page2, page3, page4}


window.addEventListener("resize", function () {

    page1.canvas.width = window.innerWidth * 0.5;
    page1.canvas.height = window.innerHeight * 0.5;
    page2.canvas.width = window.innerWidth * 0.5;
    page2.canvas.height = window.innerHeight * 0.5;
    page3.canvas.width = window.innerWidth * 0.5;
    page3.canvas.height = window.innerHeight * 0.5;
    page4.canvas.width = window.innerWidth * 0.5;
    page4.canvas.height = window.innerHeight * 0.5;

  // page1.render(); 
  // page2.render(); 
  // page3.render(); 
  // page4.render(); 
  scaleImage(page1.images[1], page1.context);
  scaleImage(page2.images[1], page2.context);
  scaleImage(page3.images[1], page3.context);
  scaleImage(page4.images[1], page4.context);

  
  
  // Assuming you have a render function defined elsewhere
});


window.addEventListener("load", (event) => {
  scaleImage(page1.images[1], page1.context);
  scaleImage(page2.images[1], page2.context);
  scaleImage(page3.images[1], page3.context);
  scaleImage(page4.images[1], page4.context);

});


// -----------------------------

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var maxRatio = Math.min(canvas.width / img.width, canvas.height / img.height); // Maintain aspect ratio
  var width = img.width * maxRatio;
  var height = img.height * maxRatio;
  var centerShift_x = (canvas.width - width) / 2;
  var centerShift_y = (canvas.height - height) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    width,
    height
  );
}
ScrollTrigger.create({
  trigger: "#page1>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `bottom top`,
  end: `bottom bottom`,

});

ScrollTrigger.create({
  trigger: "#page2>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `bottom top`,
  end: `bottom bottom`,
  // end: "+=2000%",
});

ScrollTrigger.create({
  trigger: "#page3>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `bottom top`,
  end: `bottom bottom`,

});

ScrollTrigger.create({
  trigger: "#page4>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `bottom top`,
  end: `bottom bottom`,
});



gsap.to("#page1", {
  scrollTrigger: {
    trigger: "#page1",
    start: "top top",
    end: "200% top",
    pin: true,
    scroller: "#main",

  },
});

// gsap.to Animations for Pinning Sections

gsap.to("#page2", {
  scrollTrigger: {
    trigger: "#page2",
    start: "top top",
    end: "200% top",
    pin: true,
    scroller: "#main",
  },
});

gsap.to("#page3", {
  scrollTrigger: {
    trigger: "#page3",
    start: "top top",
    end: "200% top",

    pin: true,
    scroller: "#main",
  },
});


gsap.to("#page4", {
  scrollTrigger: {
    trigger: "#page4",
    start: "top top",
    end: "200% top",
    pin: true,
    scroller: "#main",
  },
});
