let body = document.querySelector("body")
let intrologo = document.querySelector(".introh1")
let intro = document.querySelector(".intro")



let tl = gsap.timeline()
tl.to(body, {
    overflow: "hidden"
})
tl.from(intrologo, {
    display: "none",
    opacity: 0,
    y: 50,
    duration: 0.5,
    delay: 1
})
tl.fromTo(
    intrologo,
    {
        opacity: 1
    },
    {
        duration: 2,
        textShadow: '0 0 10px #439AE1, 0 0 20px #439AE1, 0 0 30px #127cd3ff, 0 0 40px #2089deff',
        textShadow: '0 0 20px #439AE1, 0 0 40px #439AE1, 0 0 60px #1981d5ff, 0 0 80px #1c81d3ff',
        repeat: 2,  // Infinite loop
        yoyo: true,  // Reverse the effect for a smooth glowing pulse
        ease: 'power1.inOut'
    }
)
tl.to(intrologo, {
    scale: 2,
})
tl.to(intrologo, {
    y: 30,
    opacity: 0
})
tl.to(intrologo, {
    display: "none",
})
tl.to(intro, {
    display: "none",
    duration:0.2
})
tl.to(body, {
    backgroundColor: "white"
})

tl.pause()

window.addEventListener('DOMContentLoaded', () => {
    // GSAP animation for smooth glowing effect
    setTimeout(() => {
        window.scrollTo(0, 0);
        tl.play()
    }, 30)



});