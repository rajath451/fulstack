const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick =()=>{
    navLinks.classlist.toggle('active');
}