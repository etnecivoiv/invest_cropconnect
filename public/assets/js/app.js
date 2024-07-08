"use strict";

(function ($) {
  /* 1.0 Dropdown Menu  */
  // check if widnow inner width is greater than 991px
  $(".menu-item-has-children > a").on("click", function () {
    var element = $(this).parent("li");

    if (element.hasClass("open")) {
      element.removeClass("open");
      element.find("li").removeClass("open");
      element.find("ul").slideUp(300);
      element.find(".rt-mega-menu").slideUp(300);
    } else {
      element.addClass("open");
      element.children("ul").slideDown(300);
      element.children(".rt-mega-menu").slideDown(300);
      element.siblings("li").children("ul").slideUp();
      element.siblings("li").removeClass("open");
      element.siblings("li").find("li").removeClass("open");
      element.siblings("li").find("ul").slideUp();
    }
  });

  function stickyHeader() {
    var mainheader = $(".rt-sticky"),
      height = mainheader.outerHeight(),
      scroll = $(document).scrollTop();
    $(window).on("load", function () {
      if ($(document).scrollTop() > height) {
        if (mainheader.hasClass("rt-sticky-active")) {
          mainheader.removeClass("rt-sticky-active");
        } else {
          mainheader.addClass("rt-sticky-active");
        }
      }
    });
    $(window).on("scroll", function () {
      var scrolled = $(document).scrollTop(),
        header = $(".rt-sticky-active");

      if (scrolled > scroll) {
        header.addClass("sticky");
      } else {
        header.removeClass("sticky");
      }

      if (scrolled === 0) {
        mainheader.removeClass("rt-sticky-active");
      } else {
        mainheader.addClass("rt-sticky-active");
      }

      scroll = $(document).scrollTop();
    });
  }

  if ($(window).width() > 991.98) {
    stickyHeader();
  } // menu menu active link

  /* 1.02 Main Menu  */


  $(".main-menu ul li").on("click", function () {
    $(".main-menu ul li").removeClass("active");
    $(this).addClass("active");
  }); // mobile menu click


  // 1.04 scroll up js

  $.scrollUp({
    scrollText: '<i class="ph-caret-up-light"></i>'
  }); //1.05 progressbar js

  $(".progressbar-group .ani").each(function () {
    $(this).animate({
      width: $(this).attr("data-progress") + "%"
    }, 1000);
  });

  var dataWidth = document.querySelectorAll("[data-width]");
  dataWidth.forEach(function (item) {
    item.style.maxWidth = item.getAttribute("data-width");
  });

  // 1.06 nice select

  // $("select").niceSelect(); // 1.07 tab

  $("#tabs-nav li:first-child").addClass("active");
  $(".tab-content").hide();
  $(".tab-content:first").show(); // Click function

  $(document).on('click', "#tabs-nav li", function () {
    $("#tabs-nav li").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").hide();
    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  }); // 1.08 checkbox price

  $("#pricechnage").on("change", function () {
    $("body").toggleClass("price-toggole");
  }); // fillteing

  $(".grids").imagesLoaded(function () {
    var $grid = $(".grids").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: 0
      }
    });
  }); //1.09 isotop filter

  $(".filter-list").on("click", "li", function () {
    $(".filter-list li").removeClass("active");
    $(this).addClass("active");
    var filterValue = $(this).attr("data-filter");
    $(".grids").isotope({
      filter: filterValue
    });
    $(window).trigger("resize");
  }); // 1.10 tippy active

  $(document).on("click", '.modal-trigger', function () {
    $("body").toggleClass("modal-open");
  });

})(jQuery);