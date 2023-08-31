$(function () {

  $(window).resize(function() {
    var windowWidth = $(window).width();


    if (windowWidth < 767) {

      $('.mobile-menu').css('display', 'block');
    } else {
      $('.mobile-menu').css('display', 'none');

    }
  });

  var prevScrollPos = window.pageYOffset;

  var windowWidth = $(window).width();


  function showHideMenu() {
    $(window).scroll(function() {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        // Скролюємо вгору - показуємо mobile-menu
        $('.mobile-menu').css('display', 'block');
      } else {
        // Скролюємо вниз - ховаємо mobile-menu
        $('.mobile-menu').css('display', 'none');
      }

      prevScrollPos = currentScrollPos;
    });
  }

  if (windowWidth < 767) {
    showHideMenu();
  }

  $(window).resize(function() {
    var windowWidth = $(window).width();


    if (windowWidth < 767) {

      showHideMenu();
    } else {
      $(window).off('scroll');

    }
  });


  // open catalog
  function openCatalog(button, currentBlock) {
    $(document).on('click', button, function () {
      var popUpBg = $('.pop-up__bg');
      var currentBlockPage = $(currentBlock);

      $('body').addClass('no-scroll');

      popUpBg.fadeIn();
      currentBlockPage.toggleClass('show'); // Додали клас для анімації виїзду
    });
  };

  openCatalog('.btn-category', '.catalogue--goods');
  openCatalog('.mobile__nav-button--catalog', '.catalogue--goods');
  openCatalog('.button__wish', '.goods-list--wish');
  openCatalog('.mobile__nav-button--wish', '.goods-list--wish');
  //cart
  openCatalog('.mobile__nav-button--cart', '.goods-list--cart');

  // open outher modal  page
  function openPopUp(button, currentBlock) {
    $(document).on('click', button, function () {
      var popUpBg = $('.pop-up__bg');
      var currentBlockPage = $(currentBlock);
      console
      $('body').addClass('no-scroll');

      popUpBg.fadeIn();
      currentBlockPage.fadeIn();

    });
  };

  openPopUp('.button__search', '.search');
  openPopUp('.button__person', '.login-person');


  // open fast order

  function openFastOrder(button, currentBlock) {
    $(document).on('click', button, function () {
      var popUpBg = $('.pop-up__bg');
      var currentBlockPage = $(currentBlock);
      var cartBlock = $('.goods-list--cart');
      console
      $('body').addClass('no-scroll');

      popUpBg.fadeIn();
      currentBlockPage.fadeIn();
      cartBlock.removeClass('show');

    });
  };

  openFastOrder('.btn--fast-order', '.fast-order');


  // open modal for change locations address
  $('.btn.btn--location').on('click', function(){
      var popUpBg = $('.pop-up__bg');
      var currentBlockPage = $('.location-change');
      var infoPage = $('.info-page');
      var infoBtn = $('.button__info');

      $('body').addClass('no-scroll');
      infoBtn.removeClass('is-open');
      infoPage.fadeOut();
      popUpBg.fadeIn();
      currentBlockPage.fadeIn(); // Додали клас для анімації виїзду
  });

  // close modal by click on bg

  $(document).on('click', '.pop-up__bg', function () {
    var popUpBlocks = $('.pop-up-block');

    $(this).fadeOut();
    popUpBlocks.fadeOut();
    $('.goods-list--wish').removeClass('show');
    $('.catalogue--goods').removeClass('show');
    $('.goods-list--cart').removeClass('show');
  });

   // close modal by click on button

  $(document).on('click', '.close', function () {
    var popUpBlocks = $('.pop-up-block');
    var popUpBg = $('.pop-up__bg');

    popUpBg.fadeOut();
    popUpBlocks.fadeOut();
    $('.catalogue--goods').removeClass('show');
  });

  // autocomplite

  var availableTags = [
    { label: 'Молоко коров`яче питне пастеризоване 2,6% жиру ТМ "Яготинське" 1500 г', image: '../carpaccio-food/assets/image/milk.png', price: '10$' },
    { label: 'Молоко коров`яче питне пастеризоване 2,6% жиру ТМ "Яготинське" 1500 г', image: '../carpaccio-food/assets/image/milk.png', price: '15$' },
    { label: 'Чай індійський', image: '../carpaccio-food/assets/image/tea.jpg', price: '35$' },
  ];

  var availableTagsCategories = [
    { label: 'Молоко', category: 'Солодощі' },
    { label: 'Молоко',  category: 'Цукерки' },
    { label: 'Чай',  category: 'Напої' }

  ];

  // $("#searchGoods").autocomplete({
  //   source: availableTags
  // });

  $("#searchGoods").autocomplete({
    source: function(request, response) {
      var results = [];

      var term = request.term.toLowerCase();

      // Searching in the first resource
      for (var i = 0; i < availableTags.length; i++) {
        if (availableTags[i].label.toLowerCase().indexOf(term) !== -1) {
          results.push(availableTags[i]);
        }
      }

      // Searching in the second resource
      var categoryTitleAdded = false; // To track if category title is added
      for (var j = 0; j < availableTagsCategories.length; j++) {
        if (availableTagsCategories[j].label.toLowerCase().indexOf(term) !== -1) {
          if (!categoryTitleAdded) {
            results.push({
              categoryTitle: true,
              title: "Пошук в категоріях"
            });
            categoryTitleAdded = true;
          }
          // Add the item with both label and category information
          results.push({
            label: availableTagsCategories[j].label + ' в категорії ' + availableTagsCategories[j].category,
            category: availableTagsCategories[j].category,
            image: availableTagsCategories[j].image,
            price: availableTagsCategories[j].price
          });
        }
      }

      response(results);
    },
    minLength: 1,
    select: function(event, ui) {
      if (!ui.item.categoryTitle) {
        $("#searchGoods").val(ui.item.label);
        $("#userID").val(ui.item.id);
      }
    }
  }).data("ui-autocomplete")._renderItem = function(ul, item) {
    var listItem;

    function formatLabel(label) {
      const lastWordStart = label.lastIndexOf(' ') + 1; // знаходимо індекс початку останнього слова
      const labelWithBoldLastWord = label.substring(0, lastWordStart - 1) + ' <b>' + label.substring(lastWordStart) + '</b>';
      return '<a class="custom-autocomplete__name ui-menu-item-wrapper" href="#" id="ui-id-9" tabindex="-1">' + labelWithBoldLastWord + '</a>';
    }


    if (item.categoryTitle) {
      listItem = $('<li class="custom-autocomplete__category-title">')
        .append('<span class="custom-autocomplete__category-title-text">' + item.title + '</span>')
        .appendTo(ul);
    } else if (item.category) {
      listItem = $('<li class="custom-autocomplete__category">')
        .append(formatLabel(item.label, item.category))
        .appendTo(ul);
    } else {
      listItem = $('<li class="custom-autocomplete__item">')
        .data("item.autocomplete", item)
        .append('<div class="d-flex align-center">' +
          '<img class="custom-autocomplete__icon" src="' + item.image + '" alt="icon">' +
          '<a class="custom-autocomplete__name" href="#">' + item.label + '</a>' +
          '</div>' +
          '<span class="custom-autocomplete__price">' + item.price + '</span>' +
          '<button class="button--add-to-cart" type="button">' +
          '<img class="custom-autocomplete__search-icon" src="../carpaccio-food/assets/image/search-icon.svg"/>' +
          '<img class="custom-autocomplete__search-icon custom-autocomplete__search-icon-checked" src="../carpaccio-food/assets/image/search-cheked.svg"/>' +
          '</svg>' +
          '</button>')
        .appendTo(ul);

      listItem.find('.button--add-to-cart').on('click', function(event) {
        event.stopPropagation();
        $(this).addClass('checked');
        // Add item to cart logic
      });

      listItem.find('.custom-autocomplete__category-title').on('click', function(event) {
        event.stopPropagation();
        // Add item to cart logic
      });

    }

    return listItem;
  };



// Додати клас для <ul>
$("#searchGoods").autocomplete("widget").addClass("custom-autocomplete__list");






  // catalog

    $(document).ready(function () {
      $('[data-cat-op]').each(function () {
          var targetBlockId = $(this).data('cat-op'); // Отримуємо ID цільового блоку

          $(this).on('click', function () {
              $('.catalogue__main-options').hide(); // Зникаємо всі блоки
              $(targetBlockId).fadeIn('fast'); // Відображаємо цільовий блок
          });
      });

      // close cataloge options after click by on button close
      $('.close--catalogue-option').each(function(){
        $(this).on('click', function () {
            $('.catalogue__sub-block').hide(); // Зникаємо всі блоки
            $('.catalogue__main-options').show(); // Відображаємо цільовий блок
        });
      });

      // close cataloge options after click by on button name category
      $('.catalogue__link--sub').each(function(){
        $(this).on('click', function () {
            $('.catalogue__sub-block').hide(); // Зникаємо всі блоки
            $('.catalogue__main-options').show(); // Відображаємо цільовий блок
        });
      });
  });


  // close wish-list

  $('.goods-list-close').on('click', function(){
    $('.goods-list--wish').removeClass('show');
    $('.goods-list--cart').removeClass('show');
    $('.pop-up__bg').fadeOut();
  });

   // close wish-list



  // open cart

  $('.button__cart').on('click', function () {
    // $(this).toggleClass('open'); // Додати/видалити клас open
    var cartBlock = $('.goods-list--cart');
    var popUpBg = $('.pop-up__bg');

    cartBlock.addClass('show');
    popUpBg.fadeIn();

  });

  // add to cart
  $(document).ready(function () {
    var buttonAdCartFromWish = $('.button--add-to-cart');

    buttonAdCartFromWish.each(function () {
      // Додаємо клас "checked" до поточної кнопки
      $(this).on('click', function () {
        $(this).addClass('checked');
      });

    });
  });

  // remove from cart

  


  // select type of delivery

  $(document).ready(function () {
    // Пройдемось циклом по всім radio buttons з класом location-change__select-type
    $('.location-change__select-type').each(function () {
        var targetBlockId = $(this).data('select-del'); // Отримуємо ID цільового блоку

        // Відслідковуємо зміну стану radio button
        $(this).on('change', function () {
            // Перевіряємо, чи radio button вибраний
            if ($(this).prop('checked')) {
                // Приховуємо всі блоки form__block--location-change, крім цільового
                $('.form__block--location-change').not('#' + targetBlockId).hide();

                // Показуємо цільовий блок
                $('#' + targetBlockId).show();

                // Перевіряємо, чи data-select-del="deliv-block-1", якщо ні, то приховуємо location-change__map
                if (targetBlockId !== 'deliv-block-1') {
                  $('.location-change__map').hide();
                  $('.location-change__block').css('border-radius', '20px'); // Правильний синтаксис
                } else {
                    $('.location-change__map').show();
                    $('.location-change__block').css('border-radius', '0'); // Правильний синтаксис
                }
            }
        });
    });
  });


  $('.btn.btn--location').on('click', function(){
      var popUpBg = $('.pop-up__bg');
      var currentBlockPage = $('.location-change');
      var infoPage = $('.info-page');
      var infoBtn = $('.button__info');

      $('body').addClass('no-scroll');
      infoBtn.removeClass('is-open');
      infoPage.fadeOut();
      popUpBg.fadeIn();
      currentBlockPage.fadeIn(); // Додали клас для анімації виїзду
  });


  $('.banner__wrapper').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: $('.banner-prev-arrow'),
    nextArrow: $('.banner-next-arrow')
  });

  $('.promotions__wrapper').slick({
    dots: false,
    infinite: false,
    speed: 300,
    margin: 50,
    slidesToShow: 4,
    centerPadding: '20px',
    adaptiveHeight: true,
    prevArrow: $('.block__navigations-arrows-prew'),
    nextArrow: $('.block__navigations-arrows-next'),

    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
        }

      }
    ]
  });

  $('.category-list__wrapper').slick({
    dots: false,
    infinite: false,
    speed: 300,

    slidesToShow: 6,
    rows: 2,
    adaptiveHeight: true,
    prevArrow: $('.block__navigations-arrows-prew-categ'),
    nextArrow: $('.block__navigations-arrows-next-categ'),

    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  $('.type-goods-list__wrapper').slick({
    dots: false,
    infinite: false,
    speed: 300,
    margin: 50,
    slidesToShow: 5,
    centerPadding: '20px',
    adaptiveHeight: true,
    prevArrow: $('.block__navigations-arrows-prew-type'),
    nextArrow: $('.block__navigations-arrows-next-type'),

    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]

  });


  $('.reviews__story-slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    margin: 50,
    slidesToShow: 4,
    centerPadding: '20px',
    adaptiveHeight: true,
    prevArrow: $('.reviews__navigations-arrows-prew-storis'),
    nextArrow: $('.reviews__navigations-arrows-next-storis'),

    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]

  });

  $('.reviews__influencer-slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    margin: 50,
    slidesToShow: 4,
    centerPadding: '20px',
    adaptiveHeight: true,
    prevArrow: $('.reviews__navigations-arrows-prew-infl'),
    nextArrow: $('.reviews__navigations-arrows-next-infl'),
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('.slider-cards').each(function(){
    var slider = $(this).find('.section__sider');

    var prevArrow = $(this).find('.block__navigations-arrowscard-card-prew');
    var nextArrow = $(this).find('.block__navigations-arrows-card-next');

    $(slider).slick({
      dots: false,
      infinite: false,
      speed: 300,
      margin: 50,
      slidesToShow: 5,
      centerPadding: '20px',
      adaptiveHeight: true,
      prevArrow: prevArrow,
      nextArrow: nextArrow,

      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 4,
          }
        },

        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 1,
            dots: true
          }
        }
      ]
    });
  });



  // fancy pop-up

  $('.video-wrapper').hover(function() {
    var video = $(this).find('video')[0];
    video.play();
  }, function() {
      var video = $(this).find('video')[0];
      video.pause();
      video.currentTime = 0;
  });

  $('.video-wrapper').on('click', function() {
    var video = $(this).find('video')[0];
    video.play();
});


$('[data-fancybox]').fancybox({
  hideScrollbar: false,
  toolbar: false,
  beforeShow: function(instance, current) {
    if (current.type === 'video') {
      // Видалити кнопку закрити
      current.opts.closeButton = false;

      // Видалити тулбар
      current.opts.toolbar = false;

      // Видалити плей-паузу кнопку з тулбару
      current.opts.buttons = ["fullScreen", "thumbs"];
    }
  },
  afterLoad: function(instance, current) {
    if (current.type === 'video') {
      // Додати свої кастомні класи до FancyBox контенту
      current.$content.addClass('reviews-fancybox-video');

      // Додати вашу верстку після відео
      var customContent = `
        <div class="reviews__story-contant reviews__story-contant--short">
          <h4 class="reviews__story-title">@BIGBOB_UA</h4>
          <p class="reviews__story-text">під Ідол ідеально)))о)буду та дивитисяна цю неймовірну вікенда. Точніше, заїдати))</p>
        </div>
      `;
      current.$content.append(customContent);
    }
  }
});

// show add weight

$('.card__add-to-cart').each(function(){
  $(this).on('click', function(){
    var changeWeight = $(this).next('.card__select-weight');
    $(this).addClass('hidden');
    changeWeight.addClass('showed');
  });
});

$('.card__select-weight').each(function() {
  var card = $(this);

  card.find('.card-minus-weight').on('click', function() {
    var input = card.find('.cart__weight-input');
    var currentValue = parseFloat(input.val());
    var newValue = currentValue - 0.1;
    if (newValue >= 0) {
      input.val(newValue.toFixed(1));
      updateVisibility(card, newValue);
    }
  });

  card.find('.card-plus-weight').on('click', function() {
    var input = card.find('.cart__weight-input');
    var currentValue = parseFloat(input.val());
    var newValue = currentValue + 0.1;
    input.val(newValue.toFixed(1));
    updateVisibility(card, newValue);
  });

  // Функція для оновлення видимості елементів
  function updateVisibility(card, newValue) {
    var cardFooterBlock = card.closest('.card__footer');
    var addToCartButton = cardFooterBlock.find('.card__add-to-cart');
    var selectWeight = cardFooterBlock.find('.card__select-weight');
    var input = cardFooterBlock.find('.cart__weight-input');

    if (newValue === 0.0) {
      addToCartButton.removeClass('hidden');
      selectWeight.removeClass('showed');
      input.val('0.1'); // Встановлюємо значення input на 0.1
    } else {
      addToCartButton.addClass('hidden');
      selectWeight.addClass('showed');
    }
  }
});

// append footer__form

function appendFooterForm() {
  var footerForm = $('.footer__form');
  var advantagesWrapper = $('.advantages__wrapper');

  if (window.innerWidth < 991) {
    advantagesWrapper.append(footerForm);
  } else {
    $('.footer__form-col').append(footerForm);
  }
}

//append cart-wish-list

function appendWishList() {
  var countList = $('.goods-list__header-count--wish-list');
  var nameLis = $('.goods-list__header-name-mob--wish');
  console.log(1);

  if (window.innerWidth < 768) {
    nameLis.after(countList);
  } else {
    $('.goods-list__header-name--wish').after(countList);
  }
}

function appendCartList() {
  var countList = $('.goods-list__header-count--cart-list');
  var nameLis = $('.goods-list__header-name-cart');
  var mobBlock = $('.goods-list__header-value-label')
  var mobTotal = $('.goods-list__header-price--cart');
  var descTopBlock = $('.goods-list__total-text');
  var priceBlock = $('.goods-list__header-info--cart');
  var priveVal = $('.btn--cart');
  var descPriceBlock = $('.goods-list__buttons--footer');
  var delivProgBar = $('.mobile-menu__delivery');
  var delivProgBarWrapp = $('.mobile-menu__wrapper');
  var delivProgBarWrappMob = $('.mobile-menu__wrapper-mob');

  console.log(1);

  if (window.innerWidth < 768) {
    nameLis.after(countList);
    priceBlock.append(priveVal);
    mobBlock.after(mobTotal);
    delivProgBarWrappMob.append(delivProgBar);

  } else {
    $('.goods-list__header-name--cart').after(countList);
    descTopBlock.after(mobTotal);
    descPriceBlock.append(priveVal);
    delivProgBarWrapp.append(delivProgBar);
  }
}

// Виклик функції при завантаженні та при ресайзі
$(document).ready(function() {
  appendFooterForm();
  appendPaymentList();
  appendWishList();
  appendCartList();


  $(window).on('resize', function() {
    appendFooterForm();
    appendPaymentList();
    appendWishList();
    appendCartList();

  });
});


// appent payment list

function appendPaymentList() {
  var paymentList = $('.payments__list');
  var appentAfterBlock = $('.footer__elements--firsth-col');
  var startPosition = $('.create-by');

  if (window.innerWidth < 768) {
    paymentList.insertAfter(appentAfterBlock);
  } else {
    paymentList.insertAfter(startPosition);
  }
}


// login-move

$(document).on('click', '.login-person-start', function(){
  var startBlock = $(this).closest('.login-person__step');
  var nextBlock = startBlock.next('.login-person__step');

  startBlock.fadeOut();
  nextBlock.fadeIn();

});

$(document).on('click', '.login-person-back', function(){
  var cuurentBlock = $(this).closest('.login-person__step');
  var prevBlock = cuurentBlock.prev('.login-person__step');

  cuurentBlock.fadeOut();
  prevBlock.fadeIn();

});


// append cart-wish-list

});