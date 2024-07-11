(function ($) {

    "use strict";

    $(function () {
        $("#tabs").tabs();
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });


    $('.schedule-filter li').on('click', function () {
        var tsfilter = $(this).data('tsfilter');
        $('.schedule-filter li').removeClass('active');
        $(this).addClass('active');
        if (tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function () {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });


    // Window Resize Mobile Menu Fix
    mobileNav();


    // Scroll animation init
    window.sr = new scrollReveal();


    // Menu Dropdown Toggle
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }


    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }


    // Page loading animation
    $(window).on('load', function () {

        $('#js-preloader').addClass('loaded');

    });


    // Window Resize Mobile Menu Fix
    $(window).on('resize', function () {
        mobileNav();
    });


    // Window Resize Mobile Menu Fix
    function mobileNav() {
        var width = $(window).width();
        $('.submenu').on('click', function () {
            if (width < 767) {
                $('.submenu ul').removeClass('active');
                $(this).find('ul').toggleClass('active');
            }
        });
    }


})(window.jQuery);

document.querySelector('#car-search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    filterCars();
});

function filterCars() {
    const formData = {
        make: document.querySelector('#car-search-form select[name="make"]').value,
        model: document.querySelector('#car-search-form select[name="model"]').value,
        price: document.querySelector('#car-search-form select[name="priceRange"]').value,
        mileage: document.querySelector('#car-search-form select[name="mileage"]').value,
        engineSize: document.querySelector('#car-search-form select[name="engineSize"]').value,
        power: document.querySelector('#car-search-form select[name="power"]').value,
        fuelType: document.querySelector('#car-search-form select[name="fuelType"]').value,
        gearbox: document.querySelector('#car-search-form select[name="gearbox"]').value,
        doors: document.querySelector('#car-search-form select[name="doors"]').value,
        seats: document.querySelector('#car-search-form select[name="seats"]').value,
    };

    // Reset visibility of all cars
    document.querySelectorAll('.col-lg-4').forEach(car => {
        car.style.display = 'none'; // Initially hide all cars
    });

    // Filter cars based on selected criteria
    document.querySelectorAll('.col-lg-4').forEach(car => {
        const matchesCriteria = Object.entries(formData).every(([key, value]) => {
            if (value === "") return true;
            return car.dataset[key] === value || parseInt(car.dataset[key]) <= parseInt(value);
        });
        if (matchesCriteria) {
            car.style.display = 'block'; // Show matching cars
        }
    });
}

const itemsPerPage = 6; // Number of cars to show per page
let currentPage = 1;

// Function to update the view based on the current page
function updateView(page) {
    // Remove the active class from the previous page indicator
    const previousActiveItem = document.querySelector('#pagination-controls .page-item.active');
    if (previousActiveItem) {
        previousActiveItem.classList.remove('active');
    }

    // Add the active class to the new page indicator
    const newActiveItem = document.querySelector(`#pagination-controls .page-item[data-page="${page}"]`);
    if (newActiveItem) {
        newActiveItem.classList.add('active');
    }
    currentPage = page;
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    console.log(`Updating view for page ${page}, showing items ${startIdx} to ${endIdx}`);


    // Hide all cars
    document.querySelectorAll('.col-lg-4').forEach((car, index) => {
        car.style.display = 'none';
    });

    // Show only cars for the current page
    document.querySelectorAll('.col-lg-4').forEach((car, index) => {
        if (index >= startIdx && index < endIdx) {
            car.style.display = 'block';
        }
    });

    // Update pagination controls
    document.querySelectorAll('#pagination-controls.page-item').forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('.page-link').getAttribute('data-page') == currentPage) {
            item.classList.add('active');
        }
    });
}

// Attach event listeners to pagination links
document.querySelectorAll('#pagination-controls .page-link[data-page]').forEach(link => {
    console.log(`Attaching event listener to ${link.getAttribute('data-page')}`);
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const pageNumber = parseInt(link.getAttribute('data-page'));
        updateView(pageNumber);
    });
});

// Ensure this script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize pagination on page load
    updateView(currentPage);
});

/*===== SHOW AND HIDE  FORM ======*/

const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    signin__id = document.getElementById('signin_id'),
    signup__id = document.getElementById('signup_id')

signUp.addEventListener('click', () => {
    // FIRST REMOVE CLASSES
    signin__id.classList.remove('block')
    signup__id.classList.remove('none')

    // ADD CLASSES
    signin__id.classList.add("none");
    signup__id.classList.add("block");

})


signIn.addEventListener("click", () => {
    // REMOVE CLASSES
    signin__id.classList.remove("none");
    signup__id.classList.remove("block");

    // ADD CLASSES
    signin__id.classList.add("block");
    signup__id.classList.add("none");
})