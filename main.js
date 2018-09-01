
const learnMore = document.querySelector('.learnMore');
const homeButton = document.querySelector('#homeBTN');
const aboutMeButton = document.querySelector('#aboutMeBTN');
const myWorkButton = document.querySelector('#myWorkBTN');
const contactButton = document.querySelector('#contactBTN');


const home = document.querySelector('.home');
const aboutMe = document.querySelector('.aboutMe');
const myWork = document.querySelector('.myWork');
const contact = document.querySelector('.contact');
const circReveal = document.querySelector('.circReveal')

let inElement = document.querySelector('.aboutMe');
let outElement = document.querySelector('.home');

const bg1 = document.querySelector('#bg1');
const bg2 = document.querySelector('#bg2');

let currentPage = home;


const navItems = document.getElementsByClassName('navListItem');
const menuBTN = document.querySelector('.menu-wrapper');

function onNavChange(item){
    [].forEach.call(navItems, li => {
        if(li == item){
            li.className = "navListItem itemActive";
        }else{
            li.className = "navListItem";
        }
    })
}


const changePage = (item) => () => {
    if(item.page !== currentPage){
        onNavChange(item.button)
        if(window.innerWidth < 950) toggleMenu();
        circularReveal(item.page, currentPage, item.colors, item.img);
        currentPage = item.page;
    }
    
}

const learnMoreAnim = (item) => () => {
    if(item.page !== currentPage){
        onNavChange(item.button)
        circularReveal(item.page, currentPage, item.colors, item.img);
        currentPage = item.page;
    }
    
}

const inAnim = (target) =>{
    target.style.display = "none";
    anime({
        targets: target,
        opacity: ["0","1"],
        delay: 500,
        duration: 500,
        easing: 'linear',
        begin: () => {
            target.style.display = "flex";
        }
    })
} 

const outAnim = (target) => {
    anime({
        targets: target,
        opacity: ["1","0"],
        duration: 500,
        easing: 'linear',
        complete: () => {
            target.style.display = "none";
        }
    });
}

const changeBg = (img) => {
    
    if(bg2.style.opacity === "0"){
        bg2.style.backgroundImage = `url(./Images/pageStyles/${img})`
        bgCrossFade(bg2, bg1)
    }else{
        bg1.style.backgroundImage = `url(./Images/pageStyles/${img})`
        bgCrossFade(bg1, bg2)
    }
}

const bgCrossFade = (bg1, bg2) => {
    anime({
        targets: bg1,
        opacity: 1,
        duration: 500,
        easing: 'linear'
    })
    anime({
        targets: bg2,
        opacity: 0,
        duration: 500,
        easing: 'linear'
    })
}

const circularReveal = (targetIn, targetOut, colors, img) => {
    let borRadius = 0;
    outAnim(targetOut);
    inAnim(targetIn);
    gradientAnim(colors.start, colors.end);
    changeBg(img);
    anime({
        targets: circReveal,
        width: [0, "200%"],
        height: [0, "200%"],
        easing: 'easeInOutSine',
        duration: 500,
        backgroundColor: [colors.start, colors.end],
        opacity: {
            delay: 500,
            value: [1, 0]
        },
    })
}

const gradients = {
    start: '#f5576c',
    end: '#f093fb'
}

const gradientAnim = (cl1, cl2) => {
    const body = document.querySelector('body');
    anime({
        targets: gradients,
        start: cl1,
        end: cl2,
        duration: 1000,
        easing: 'linear',
        round: 1,
        update: (a) => {
            let value1 = a.animations[0].currentValue;
            let value2 = a.animations[1].currentValue;
            body.style.backgroundImage = `linear-gradient(120deg, ${value1} 0%, ${value2} 100%)`
        }
    })
}

const states = {
    home: {
        page: home,
        button: homeButton,
        colors: { start: "#F093FB", end: "#F5576C" },
        img: 'homeStyle.svg'
    },
    myWork: {
        page: myWork,
        button: myWorkButton,
        colors: { start: "#4FACFE", end: "#00F2FE" },
        img: 'myWorkStyle.svg'
    },
    aboutMe: {
        page: aboutMe,
        button: aboutMeButton,
        colors: { start: "#38F9D7", end: "#43E97B" },
        img: 'aboutMeStyle.svg'
    },
    contact: {
        page: contact,
        button: contactButton,
        colors: { start: "#37ECBA", end: "#72AFD3" },
        img: 'contactStyle.svg'
    },
}

let menuVisible = false;

const toggleMenu = () => {
    document.querySelector('.hamburger-menu').classList.toggle('animate')
    let navLinks = document.querySelector('.navLinks');
    anime({
        targets: navLinks,
        height: menuVisible ? "0" : "250px",
        duration: 250,
        easing: 'easeInOutSine',
        begin: () => {
            navLinks.style.display = "block";
        },
        complete: () => {
            menuVisible = !menuVisible;
            if(!menuVisible){
                navLinks.style.display = "none";
            }
        }
    })
}

learnMore.addEventListener('click', learnMoreAnim(states.aboutMe, true));
aboutMeButton.addEventListener('click', changePage(states.aboutMe));
homeButton.addEventListener('click', changePage(states.home));
myWorkButton.addEventListener('click', changePage(states.myWork));
contactButton.addEventListener('click', changePage(states.contact));
menuBTN.addEventListener('click', toggleMenu);







