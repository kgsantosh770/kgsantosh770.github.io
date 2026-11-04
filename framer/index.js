var menuIcon = $("#menuIcon");
var mobileMenu = $("#mobileMenu");
var mobileNavItems = $("#mobileMenu .nav-items");

menuIcon.on('click', toggleMobileMenuState);
mobileNavItems.on('click', toggleMobileMenuState);

function toggleMobileMenuState() {
    mobileMenu.toggleClass("opened");
}

// skills show and hide details
function toggleSkillDetails() {
    $('#skills').toggleClass('details-hidden');
}
