document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.hero-swiper-container', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 2000,
    autoplay: {
      delay: 2000
    }
  });

    // burger-menu

    document.querySelector('#burger').addEventListener('click', function () {
      document.querySelector('#menu').classList.add('is-active-header');
    });
    document.querySelector('.header__navigation-close').addEventListener('click', function () {
      document.querySelector('#menu').classList.remove('is-active-header');
    });

    // search-menu

  const btnMenu = document.querySelector('#search-btn');
  const menuSearch = document.querySelector('#search-box');
  const toggleMenu = function() {
      menuSearch.classList.toggle('open');
    }

    btnMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

  document.addEventListener('click', function(e) {
        const target = e.target;
        const its_menu = target == menuSearch || menuSearch.contains(target);
        const its_btnMenu = target == btnMenu;
        const menu_is_active = menuSearch.classList.contains('open');

        if (!its_menu && !its_btnMenu && menu_is_active) {
            toggleMenu();
        }
    });

    document.querySelector('.disabled').addEventListener('click', function () {
      document.querySelector('#search-box').classList.remove('open');
    });


    // hero-bar
  const params = {
    btnClassName: "header-bottom-nav__btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }
  setMenuListener();

  // gallery
  let gallerySlider = new Swiper(".gallery-slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery .gallery-swiper-pagination",
      type: "fraction",

    },
    navigation: {
      nextEl: ".gallery-swiper__next",
      prevEl: ".gallery-swiper__prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2
        },
        spaceBetween: 34
      },

      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 2
        },
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо
    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    slideVisibleClass: 'slide-visible',

    on: {
      init: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      },
      slideChange: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      }
    }

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });

    // Pass single element (select)
    const element = document.querySelector('.select1');
    const choices = new Choices(element,{
      searchEnabled:  false,
      // shouldSort: false,
    });


    // section catalog
    // accordion
    $( ".js-accordion" ).accordion({
      collapsible: true,
      // active: true,
      icons: false,
      heightStyle: 'content'
    });

    // tabs
    document.querySelectorAll('.tabs-item__btn').forEach(function(tabsBtn) {
      tabsBtn.addEventListener('click', function(event) {
        const path = event.currentTarget.dataset.path

        document.querySelectorAll('.catalog-content-wrap').forEach(function(tabContent) {
          tabContent.classList.remove('catalog-content-wrap-active')
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('catalog-content-wrap-active')
      });
     });

      // tabs
    document.querySelectorAll('.catalog-painter-item').forEach(function(tabsBtn2) {
      tabsBtn2.addEventListener('click', function(event) {
        const path = event.currentTarget.dataset.path

        document.querySelectorAll('.catalog-painter-info').forEach(function(tabContent2) {
          tabContent2.classList.remove('catalog-painter-info-active')
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('catalog-painter-info-active')
      });
     });

    //  document.querySelectorAll('.js-tab-btn').forEach(function(was) {
    //   was.addEventListener('click', function(asdd) {
    //      asdd.target.classList.toggle ('tabs-item__btn-click')
    //    });
    //  });

    (() => {
      function setTabs (dataPath, dataTarget) {
          const btnCatalog = document.querySelectorAll(`.js-tab-btn[${dataPath}]`);

          btnCatalog.forEach((btn) => {
            btn.addEventListener('click', function (evt) {

              btnCatalog.forEach((currentBtn) => {
                currentBtn.classList.remove('tabs-item__btn-click');
            });

            this.classList.add('tabs-item__btn-click');
          });
        });
    }
    setTabs('data-flags-path');
    })();



    //  event
    (() => {
      const MOBILE_WIDTH = 576;
      const DESKTOP_WIDTH = 992;
      const btn = document.querySelector(".js-show");

      const sliderMobileParams = {
        paginationClassName: "events-pagination",
        cardsContainerName: "js-slider-event",
        cardsWrapName: "js-slides-wrap-event",
        card: "slide-event",
        hiddenClass: "is-hidden"
      };

      function getWindowWidth() {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.body.clientWidth,
          document.documentElement.clientWidth
        );
      }

      function activateMobileSlider(params) {
        const pagination = document.createElement("div");
        pagination.classList.add(params.paginationClassName);
        params.cardsContainer.append(pagination);

        params.cardsContainer.classList.add("swiper-container");
        params.cardsWrap.classList.add("swiper-wrapper");

        params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
          slidesPerView: 1,
          spaceBetween: 50,
          pagination: {
            el: `.${params.cardsContainerName} .${params.paginationClassName}`
          },

          on: {
            beforeInit() {
              document.querySelectorAll(`.${params.card}`).forEach((el) => {
                el.classList.add("swiper-slide");
              });
            },

            beforeDestroy() {
              this.slides.forEach((el) => {
                el.classList.remove("swiper-slide");
                el.removeAttribute("role");
                el.removeAttribute("aria-label");
              });

              this.pagination.el.remove();
            }
          }
        });
      }

      function destroyMobileSlider(params) {
        params.cardsSlider.destroy();
        params.cardsContainer.classList.remove("swiper-container");
        params.cardsWrap.classList.remove("swiper-wrapper");
        params.cardsWrap.removeAttribute("aria-live");
        params.cardsWrap.removeAttribute("id");
      }

      function setHiddenCards(params, windowWidth) {
        const cards = document.querySelectorAll(`.${params.card}`);
        let quantity = cards.length;

        if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
          quantity = 2;
        }

        if (windowWidth >= DESKTOP_WIDTH) {
          quantity = 3;
        }

        cards.forEach((card, i) => {
          card.classList.remove(params.hiddenClass);
          if (i >= quantity) {
            card.classList.add(params.hiddenClass);
          }
        });
      }

      function showCards(e) {
        const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

        e.target.style = "display: none";

        cards.forEach((card) => {
          card.classList.remove(sliderMobileParams.hiddenClass);
        });
      }

      function checkWindowWidthMobile(params) {
        const currentWidth = getWindowWidth();
        btn.style = "";
        params.cardsContainer = document.querySelector(
          `.${params.cardsContainerName}`
        );
        params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

        if (
          currentWidth <= MOBILE_WIDTH &&
          (!params.cardsSlider || params.cardsSlider.destroyed)
        ) {
          activateMobileSlider(params);
        } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
          destroyMobileSlider(params);
        }

        setHiddenCards(params, currentWidth);
      }

      checkWindowWidthMobile(sliderMobileParams);
      btn.addEventListener("click", showCards);

      window.addEventListener("resize", function () {
        checkWindowWidthMobile(sliderMobileParams);
      });
    })();

// editions
(() => {
  const checkBtn = document.querySelector('.js-check-heading');

  checkBtn.addEventListener('click', function () {
      this.classList.toggle('is-active');
  });
})();

(() => {
  const MOBILE_WIDTH = 440;

  const sliderParamsNotMobile = {
    sliderWrap: "js-slider-editions",
    cardsContainerName: "slider-editions-container",
    cardsWrapName: "slides-editions-wrap",
    card: "slide-editions",
    paginationClassName: "editions-pagination",
    navClassName: "editions-navigation",
    navBtnClassName: "editions-slide-btn",
    navPrev: "editions-prev",
    navNext: "editions-next"
  };

  function getWindowWidth() {
    // console.log(document.body.scrollWidth);
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function activateSlider(params) {
    const navigation = document.createElement("div");
    const pagination = document.createElement("div");
    const navBtnPrev = document.createElement("button");
    const navBtnNext = document.createElement("button");

    navigation.classList.add(params.navClassName);

    navBtnPrev.classList.add(params.navBtnClassName);
    navBtnPrev.classList.add(params.navPrev);
    navigation.prepend(navBtnPrev);

    pagination.classList.add(params.paginationClassName);
    navigation.append(pagination);

    navBtnNext.classList.add(params.navBtnClassName);
    navBtnNext.classList.add(params.navNext);
    navigation.append(navBtnNext);

    params.sliderWrapElem.prepend(navigation);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
      slidesPerView: 2,
      spaceBetween: 50,

      pagination: {
        el: `.${params.sliderWrap} .${params.paginationClassName}`,
        type: "fraction"
      },

      navigation: {
        nextEl: `.${params.navNext}`,
        prevEl: `.${params.navPrev}`
      },


      breakpoints: {

        1300: {
          slidesPerView: 3,
          spaceBetween: 50
        }
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
          navigation.remove();
        }
      }
    });
  }

  function destroySlider(params) {
    params.cardsSlider.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function checkWindowWidth(params) {
    const currentWidth = getWindowWidth();
    params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth > MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateSlider(params);
    } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
      destroySlider(params);
    }
  }

  checkWindowWidth(sliderParamsNotMobile);

  window.addEventListener("resize", function () {
    checkWindowWidth(sliderParamsNotMobile);
  });
})();



// project
    tippy('.toltip-js', {
      trigger: 'click',
      allowHTML: true,
      theme: 'light',
    });

    let projectSlider = new Swiper(".slides-container-project", {
      slidesPerView: 1,
      spaceBetween: 35,

      navigation: {
        nextEl: ".project-next",
        prevEl: ".project-prev"
      },

      breakpoints: {
        441: {
          slidesPerView: 2,
          spaceBetween: 30
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },

        1024: {
          slidesPerView: 2,
          spaceBetween: 50
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 50
        }
      },


      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible-projeckt',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible-projeckt')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible-projeckt')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        }
      }

      // on: {
      //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
      //   beforeResize: function () {
      //     this.slides.forEach((el) => {
      //       el.style.marginTop = "";
      //     });
      //   }
      // }
    });



    // contacts
    ymaps.ready(init);
  function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    }
  );

  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "../img/map-point.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -40],
    }
  );

  myMap.geoObjects.add(myPlacemark);

  setTimeout(() => {
    myMap.container.fitToViewport();
  }, 5000);
}


// form

var selector = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7-(999)-999-99-99");
  im.mask(selector);


  new window.JustValidate('.contacts-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 15
      },
      tel: {
        required: true,
        function: () => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
      mail: {
        required: true,
        email: true
      },
    },
  });


// scroll
  function scrollClick(butt, sect) {
    $(function () {
      $(butt).on('click', function (e) {
        $('html,body').stop().animate({ scrollTop: $(sect).offset().top }, 1000);
        e.preventDefault();
      });
    });
  }
  scrollClick('#first-link', '#section1')
  scrollClick('#second-link', '#section2')
  scrollClick('#third-link', '#section3')
  scrollClick('#fourth-link', '#section4')
  scrollClick('#fiveth-link', '#section5')
  scrollClick('#sixth-link', '#section6')
  scrollClick('#seventh-link', '#section7')
  scrollClick('#eighth-link', '#section8')
  scrollClick('.gallery-link', '#section2')
});


