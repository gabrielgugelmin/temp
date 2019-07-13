$(function() {
  // Ajusta header-top
  if (checkWindowWidth() == "mobile") {
    $(".header-top")
      .detach()
      .appendTo(".header-bottom");
  }

  $(window).on("resize", function() {
    if (checkWindowWidth() == "mobile") {
      $(".header-top")
        .detach()
        .appendTo(".header-bottom");
    } else {
      $(".header-top")
        .detach()
        .prependTo(".header");
    }
  });

  // Banner principal
  $(".js-banner-slider").slick({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true
  });

  // Grid slider
  $(".js-grid-slider").slick({
    arrows: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });

  // Veiculo slider
  $(".js-slider-veiculo").slick({
    arrows: true,
    asNavFor: $(".js-slider-veiculo-nav"),
    cssEase: "linear",
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 1
  });

  $(".js-slider-veiculo-nav").slick({
    arrows: true,
    asNavFor: $(".js-slider-veiculo"),
    cssEase: "linear",
    dots: false,
    focusOnSelect: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".js-slider-sobre").slick({
    dots: true,
    arrows: false,
    autoplay: true
  });

  $(".js-slider-historia").slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  });

  // MENU
  // click no hamburguer icon
  $(".hamburger").on("click", function(e) {
    e.preventDefault();

    if ($(".header").hasClass("header--open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // pesquisa

  $(".js-search").on("focus", function(e) {
    $(".search__result").addClass("search__result--open");
  });

  $(".js-toggle-search").on("click", function() {
    $(".search").addClass("search--open");
    $(".js-search").focus();
  });

  var veiculosArray = "";

  $.ajax({
    url: "/assets/json/busca-veiculos.php",
    dataType: "json",
    async: false,
    success: function(data) {
      veiculosArray = data;
    }
  });

  var ScrollSneak = function(prefix, wait) {
    // clean up arguments (allows prefix to be optional - a bit of overkill)
    if (typeof wait == "undefined" && prefix === true)
      (prefix = null), (wait = true);
    prefix = (typeof prefix == "string" ? prefix : window.location.host)
      .split("_")
      .join("");
    var pre_name;

    // scroll function, if window.name matches, then scroll to that position and clean up window.name
    this.scroll = function() {
      if (window.name.search("^" + prefix + "_(\\d+)_(\\d+)_") == 0) {
        var name = window.name.split("_");
        window.scrollTo(name[1], name[2]);
        window.name = name.slice(3).join("_");
      }
    };
    if (!wait) this.scroll();

    this.sneak = function() {
      // prevent multiple clicks from getting stored on window.name
      if (typeof pre_name == "undefined") pre_name = window.name;

      // get the scroll positions
      var top = 0,
        left = 0;
      if (typeof window.pageYOffset == "number") {
        // netscape
        (top = window.pageYOffset), (left = window.pageXOffset);
      } else if (
        document.body &&
        (document.body.scrollLeft || document.body.scrollTop)
      ) {
        // dom
        (top = document.body.scrollTop), (left = document.body.scrollLeft);
      } else if (
        document.documentElement &&
        (document.documentElement.scrollLeft ||
          document.documentElement.scrollTop)
      ) {
        // ie6
        (top = document.documentElement.scrollTop),
          (left = document.documentElement.scrollLeft);
      }
      // store the scroll
      if (top || left)
        window.name = prefix + "_" + left + "_" + top + "_" + pre_name;
      return true;
    };
  };

  $(".filtro__item").click(function() {
    $("html,body").animate(
      {
        scrollTop: $(".grid").offset().top
      },
      "slow"
    );
  });
  //   var veiculosArray = [{"value":"BMW","data":"bmw"},{"value":"Porsche 911","data":"porsche 911"},{"value":"Camaro","data":"camaro"},{"value":"Porsche 911","data":"porsche 911"},{"value":"Hublot","data":"hublot"},{"value":"Panerai","data":"panerai"},{"value":"IWC","data":"iwc"},{"value":"Rolex","data":"rolex"},{"value":"Camaro","data":"camaro"},{"value":"IWC","data":"iwc"},{"value":"Rolex","data":"rolex"}];

  // https://github.com/devbridge/jQuery-Autocomplete
  $(".js-search").autocomplete({
    lookup: veiculosArray,
    triggerSelectOnValidInput: false,
    lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
      var re = new RegExp(
        "\\b" + $.Autocomplete.utils.escapeRegExChars(queryLowerCase),
        "gi"
      );
      return re.test(suggestion.data);
    },
    onSelect: function(suggestion) {
      //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
      window.location.href = "/veiculo/" + suggestion.link;
    },
    appendTo: ".search__result",
    onSearchComplete: function() {
      $(".search__result").addClass("search__result--visible");
    }
  });

  $(".js-search-xs").autocomplete({
    lookup: veiculosArray,
    triggerSelectOnValidInput: false,
    lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
      var re = new RegExp(
        "\\b" + $.Autocomplete.utils.escapeRegExChars(queryLowerCase),
        "gi"
      );
      return re.test(suggestion.data);
    },
    onSelect: function(suggestion) {
      //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
      window.location.href = "/veiculo/" + suggestion.link;
    },
    appendTo: ".search__result-xs",
    onSearchComplete: function() {
      $(".search__result-xs").addClass("search__result--visible");
    }
  });

  $(document).mouseup(function(e) {
    var container = $(".search");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass("search--open");
    }
  });

  var $containerInstafeed = $("#instafeed");
  // Instagram
  if ($("#instafeed").length) {
    var feed = new Instafeed({
      get: "user",
      userId: "248226773",
      clientId: "604a50aa8fab404f9705ed4b7dd7ad17",
      accessToken: "248226773.604a50a.984628d4b0a740b7a9df16b2b56a80b6",
      limit: 7,
      resolution: "standard_resolution",
      template:
        '<li class="instafeed__item" style="background-image: url({{image}});"><a href="{{link}}" target="_blank"><div class="instafeed__info"><span>{{likes}}</span><span>{{comments}}</span></div></a></li>',
      after: function() {
        if (checkWindowWidth() == "desktop") {
          setTimeout(function() {
            $("#instafeed").isotope({
              masonry: {
                columnWidth: $containerInstafeed.width() / 5
              }
            });
          }, 500);
        }
      }
    });
    feed.run();
  }

  $(window).on("resize", function() {
    $containerInstafeed.isotope({
      // update columnWidth to a percentage of container width
      masonry: {
        columnWidth:
          $containerInstafeed.width() < 480
            ? $containerInstafeed.width() / 2
            : $containerInstafeed.width() / 5
      }
    });
  });

  // máscaras de formulário

  // Mascara de CPF e CNPJ
  var cpfCnpjMaskBehavior = function(val) {
      return val.replace(/\D/g, "").length <= 11
        ? "000.000.000-009"
        : "00.000.000/0000-00";
    },
    cpfCnpjpOptions = {
      onKeyPress: function(val, e, field, options) {
        field.mask(cpfCnpjMaskBehavior.apply({}, arguments), options);
      }
    };

  var phoneMaskBehavior = function(val) {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    },
    options = {
      onKeyPress: function(val, e, field, options) {
        field.mask(phoneMaskBehavior.apply({}, arguments), options);
      }
    };

  $.validator.addMethod("validateData", function(value, element) {
    return (
      this.optional(element) ||
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
        value
      )
    );
  });

  $(".js-phone").mask(phoneMaskBehavior, options);
  $(".js-cpfcnpj").mask(cpfCnpjMaskBehavior, cpfCnpjpOptions);
  $(".js-ano").mask("0000");
  $(".js-date").mask("00/00/0000");

  // form validate
  var $formNewsletter = $("#formNewsletter");
  var $formConsignado = $("#formConsignado");
  var $formFinanciamento = $("#formFinanciamento");
  var $formContato = $("#formContato");
  var $formProposta = $("#formProposta");
  var $formConsorcio = $(".formConsorcio");

  $formNewsletter.validate({
    rules: {
      nome: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      }
    },
    errorClass: "form__control--error",
    highlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .removeClass("error");
    },
    errorPlacement: function(error, element) {
      return true;
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      $(".form__control").removeClass("form__control--error");

      $formNewsletter.ajaxSubmit({
        url: "/ajax/newsletter.php",
        type: "POST",
        success: function(data) {
          // Limpa o form
          $formNewsletter.trigger("reset");

          if (data == 1) {
            window.location.href =
              "https://kikoautos.com.br/obrigado-newsletter";
          } else {
            alert(
              "Seu e-mail já está cadastrado em nossa base de dados. Obrigado!"
            );
          }
        },
        error: function(data) {
          console.log("erro", data);
        }
      });
    }
  });

  $formConsignado.validate({
    rules: {
      nome: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      cpfcnpj: {
        required: true
      },
      endereco: {
        required: true
      },
      marca: {
        required: true
      },
      modelo: {
        required: true
      },
      ano: {
        required: true
      },
      detalhes: {
        required: true
      }
    },
    errorClass: "form__control--error",
    highlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .removeClass("error");
    },
    errorPlacement: function(error, element) {
      return true;
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      $(".form__control").removeClass("form__control--error");

      $formConsignado.ajaxSubmit({
        url: "/ajax/consignado.php",
        type: "POST",
        success: function(data) {
          //alert('Mensagem enviada com sucesso.');
          // Limpa o form
          $formConsignado.trigger("reset");
          window.location.href =
            "https://kikoautos.com.br/obrigado-pela-solicitacao-consignado";
        },
        error: function(data) {
          console.log("erro", data);
        }
      });
    }
  });

  $formFinanciamento.validate({
    rules: {
      nome: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      qtd_parcelas: {
        required: true
      },
      cpfcnpj: {
        required: true
      },
      data_nascimento: {
        required: true,
        validateData: true
      },
      marca: {
        required: true
      },
      modelo: {
        required: true
      },
      ano: {
        required: true
      },
      detalhes: {
        required: true
      }
    },
    errorClass: "form__control--error",
    highlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .removeClass("error");
    },
    errorPlacement: function(error, element) {
      return true;
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      $(".form__control").removeClass("form__control--error");

      $formFinanciamento.ajaxSubmit({
        url: "/ajax/financiar.php",
        type: "POST",
        success: function(data) {
          //alert('Mensagem enviada com sucesso.');
          // Limpa o form
          $formFinanciamento.trigger("reset");
          //window.location.href = 'https://kikoautos.com.br/obrigado-pela-solicitacao-financiamento';
        },
        error: function(data) {
          console.log("erro", data);
        }
      });
    }
  });

  $formContato.validate({
    rules: {
      nome: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      assunto: {
        required: true
      },
      mensagem: {
        required: true
      }
    },
    errorClass: "form__control--error",
    highlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .removeClass("error");
    },
    errorPlacement: function(error, element) {
      return true;
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      $(".form__control").removeClass("form__control--error");

      $formContato.ajaxSubmit({
        url: "/ajax/contato.php",
        type: "POST",
        success: function(data) {
          //alert('Mensagem enviada com sucesso.');
          // Limpa o form
          $formContato.trigger("reset");
          window.location.href =
            "https://kikoautos.com.br/obrigado-pelo-contato";
        },
        error: function(data) {
          console.log("erro", data);
        }
      });
    }
  });

  $formProposta.validate({
    rules: {
      nome: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      formas_pagamento: {
        required: true
      },
      mensagem: {
        required: true
      }
    },
    errorClass: "form__control--error",
    highlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element)
        .parent()
        .removeClass("error");
    },
    errorPlacement: function(error, element) {
      return true;
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      $(".form__control").removeClass("form__control--error");

      $formProposta.ajaxSubmit({
        url: "/ajax/proposta.php",
        type: "POST",
        success: function(data) {
          //alert('Mensagem enviada com sucesso.');
          // Limpa o form
          $formProposta.trigger("reset");

          window.location.href = "https://kikoautos.com.br/obrigado";
        },
        error: function(data) {
          console.log("erro", data);
        }
      });
    }
  });

  $(".formConsorcio").submit(function(e) {
    e.preventDefault();
    var qtdErro = 0;

    $(this)
      .find("[data-validate=true]")
      .each(function() {
        var value = $(this).val();
        if (value.length == 0) {
          $(this)
            .parent()
            .addClass("form__control--error");
          qtdErro++;
        } else {
          $(this)
            .parent()
            .removeClass("form__control--error");
          //qtdErro--;
        }
      });

    if (qtdErro == 0) {
      return $.ajax({
        type: "POST",
        url: "/ajax/consorcio.php",
        data: $(this).serialize(),
        success: function(data) {
          if (data === "success") {
            //alert('Solicitação enviada com sucesso.');
            // Limpa o form
            $(this).trigger("reset");
            window.location.href =
              "https://kikoautos.com.br/obrigado-pela-solicitacao-consorcio";
          } else {
            alert("Erro ao tentar enviar mensagem: " + data);
          }
        }
      });
    }
  });

  // Grid

  if ($(".js-grid").length) {
    getProducts();
  }

  if ($(".js-grid-semi").length) {
    getSeminovos();
  }

  if ($(".js-grid-blog").length) {
    getBlog();
  }
});

var qsRegex;
var buttonFilter;
var marcaFilter;
var modeloFilter;
var novoFilter;
var seminovoFilter;
var blindadoFilter;

function initIsotope() {
  // GRID
  // init Isotope
  var $container = $(".js-grid").isotope({
    itemSelector: ".grid__item",
    layoutMode: "fitRows",
    getSortData: {
      valor: "[data-valor] parseInt",
      ano: "[data-ano]",
      modelo: "[data-modelo]"
    },
    filter: function() {
      var $this = $(this);
      var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
      var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
      var marcaResult = marcaFilter ? $this.is(marcaFilter) : true;
      var modeloResult = modeloFilter ? $this.is(modeloFilter) : true;
      var novoResult = novoFilter ? $this.is(novoFilter) : true;
      var seminovoResult = seminovoFilter ? $this.is(seminovoFilter) : true;
      var blindadoResult = blindadoFilter ? $this.is(blindadoFilter) : true;
      return (
        searchResult &&
        marcaResult &&
        modeloResult &&
        novoResult &&
        seminovoResult &&
        blindadoResult &&
        buttonResult
      );
    }
  });

  var initShow = 40; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data("isotope"); // get Isotope instance
  var footer = $(".grid__footer .container");

  if ($container.is("#Container")) {
    //append load more button
    footer.append(
      '<button class="button button--red button--ghost button--icon button--medium js-load-more">CARREGAR MAIS<svg version="1.1" id="Capa_1" xmlns=http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><g id="plus"><polygon points="32,12 20,12 20,0 12,0 12,12 0,12 0,20 12,20 12,32 20,32 20,20 32,20"/></g></g></svg></button >'
    );
  }

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    var elems = $container.isotope("getFilteredItemElements");

    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems
      .slice(toShow, elems.length)
      .map(function(item) {
        return item.element;
      }); //alert(hiddenElems);

    $(hiddenElems).addClass("hidden");
    $container.isotope("layout");

    //when no more to load, hide show more button
    if (hiddenElems.length == 0 && $container.is("#Container")) {
      jQuery(".js-load-more").hide();

      //$('.grid__footer .container').html('<a href="/contato" id="entreContato" class="button button--red button--ghost button--medium">entre em contato</a>');

      if (footer.find("#entreContato").length) {
      } else {
        footer.append(
          '<a href="/contato" id="entreContato" class="button button--red button--ghost button--medium">entre em contato</a>'
        );
      }
    } else {
      jQuery("#entreContato").show();
      jQuery(".js-load-more").show();
    }

    $(".js-load-more").removeClass("is-loading");
  }

  //when load more button clicked
  $(".js-load-more").click(function() {
    $(this).addClass("is-loading");

    if ($(".js-filter button").data("clicked")) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $(".js-filter button").data("clicked", false);
    } else {
      counter = counter;
    }

    counter = counter + initShow;

    loadMore(counter);
  });

  // bind sort button click
  /*
  $('.filtro-veiculo').on('click', 'a', function () {
    var sortByValue = $(this).attr('data-sort-by');
    
     alert(categoria);
      if(categoria=='.grid__item--novo'){
	      novoFilter = this.value;
      }else if(categoria=='.grid__item--seminovo'){
	      seminovoFilter = this.value;
      }else if(categoria=='.grid__item--blindado'){
	      blindadoFilter = this.value;
	  }
    
    $container.isotope({ sortBy: sortByValue });
    
  });
*/

  // change is-active class on buttons
  //$('.filtro__item').each(function (i, buttonGroup) {
  $(".filtro__item").on("click", function() {
    $(".filtro__item")
      .not(this)
      .removeClass("is-active");
    $(this).addClass("is-active");
    buttonFilter = $(this).attr("data-filter");
    var categoria = $(this).attr("data-filter");

    $container.isotope();
    loadMore(1000);
  });
  //});

  $("#ordem").on("change", function() {
    var filterValue = this.value;
    loadMore(1000);
    $container.isotope({
      sortBy: filterValue,
      sortAscending: true
    });
  });

  $("#marca").on("change", function() {
    marcaFilter = this.value;
    loadMore(1000);
    $container.isotope();
  });

  $("#modelo").on("change", function() {
    modeloFilter = this.value;
    loadMore(1000);
    $container.isotope();
  });

  // use value of search field to filter
  var $quicksearch = $(".quicksearch").keyup(
    debounce(function() {
      qsRegex = new RegExp($quicksearch.val(), "gi");

      $container.isotope();
      loadMore(1000);
    }, 200)
  );

  // debounce so filtering doesn't happen every millisecond
  function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
      if (timeout) {
        clearTimeout(timeout);
      }
      function delayed() {
        fn();
        timeout = null;
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  }
}

function getSeminovos() {
  $.getJSON(
    "https://" + window.location.host + "/assets/json/showroom-seminovos.php",
    function(data) {}
  )
    .fail(function(data) {
      console.log("error");
    })
    .success(function(data) {
      $elementos = [];

      $.each(data, function(index, element) {
        if (element.modelo != "") {
          //console.log(element);

          var blindado =
            element.blindado == "sim" ? "grid__item--blindado" : "";
          var seminovo =
            element.conservacao == "seminovo" ? "grid__item--seminovo" : "";
          var novo = element.conservacao == "novo" ? "grid__item--novo" : "";

          var $box =
            '<a title="' +
            element.idMarca +
            " " +
            element.modelo +
            '" href="/veiculo/' +
            element.alias +
            "/" +
            element.idVeiculo +
            '" class="grid__item ' +
            seminovo +
            " " +
            novo +
            " " +
            element.idMarca +
            " " +
            element.alias +
            " " +
            blindado +
            '" data-valor="' +
            element.preco +
            '" data-ano="' +
            element.anoModelo +
            '">' +
            '<div class="grid__img" style="background-image: url(/assets/img/albuns/album_' +
            element.idAlbum +
            "/" +
            element.capa +
            ');"></div>' +
            '<div class="grid__desc">' +
            '<h3 class="grid__title">' +
            element.idMarca +
            "</h3>" +
            '<p class="grid__text">' +
            element.modelo +
            " " +
            element.anoFabricacao +
            "/" +
            element.anoModelo +
            "</p>" +
            '<div class="grid__price">R$ ' +
            element.preco +
            "</div>" +
            "</div> " +
            "</a>";
        } else {
          var $box =
            '<p class="text-center">Nenhum veículo em destaque! Veja <a href="/estoque">nosso estoque completo</a>.</p> ';
        }

        $(".js-grid-semi").append($box);
      });
    });
}

function getProducts() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }

  //Veriavel com categoria
  var promo = query_string.promo; //if(promo) alert(promo);

  $.getJSON(
    "https://" + window.location.host + "/assets/json/showroom.php",
    { promo: promo },
    function(data) {}
  )
    .fail(function(data) {
      console.log("error");
    })
    .success(function(data) {
      $elementos = [];

      var x = false;
      $.each(data, function(index, element) {
        if (element.modelo != "") {
          //console.log(element);

          var blindado =
            element.blindado == "sim" ? "grid__item--blindado" : "";
          var seminovo =
            element.conservacao == "seminovo" ? "grid__item--seminovo" : "";
          var novo = element.conservacao == "novo" ? "grid__item--novo" : "";

          var $box =
            '<a title="' +
            element.idMarca +
            " " +
            element.modelo +
            " " +
            element.idVeiculoCategoria +
            '" href="/veiculo/' +
            element.alias +
            "/" +
            element.idVeiculo +
            '" data-category=" ' +
            seminovo +
            " " +
            novo +
            " " +
            blindado +
            ' " class="grid__item ' +
            seminovo +
            "  " +
            element.idVeiculoCategoria +
            " " +
            novo +
            "  " +
            element.idMarca +
            " " +
            element.alias +
            " " +
            blindado +
            ' " data-valor="' +
            element.preco +
            '" data-ano="' +
            element.anoModelo +
            '">' +
            '<div class="grid__img" style="background-image: url(/assets/img/albuns/album_' +
            element.idAlbum +
            "/" +
            element.capa +
            ');"></div>' +
            '<div class="grid__desc">' +
            '<h3 class="grid__title">' +
            element.idMarca +
            " " +
            element.modelo +
            " " +
            element.anoFabricacao +
            "/" +
            element.anoModelo +
            "</h3>" +
            '<div class="grid__price">R$ ' +
            element.preco +
            "</div>" +
            '<div style="widht:0px;height:0px;display:none;">' +
            element.idMarca +
            " " +
            element.modelo +
            " " +
            element.idVeiculoCategoria +
            " " +
            element.observacoes +
            "</div>" +
            "</div>" +
            "</a>";

          //'<p class="grid__text">' + element.conservacao +' / '+ element.idTransmissao +' / '+ element.idVeiculoCategoria + '</p>' +
        } else {
          var $box =
            '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
        }

        $(".js-grid").append($box);
      });

      if (x == true) {
      } else {
        initIsotope();
      }
    });
}

function getBlog() {
  $.getJSON("/assets/json/busca-veiculos.php", function(data) {})
    .fail(function(data) {
      console.log("error");
    })
    .success(function(data) {
      $elementos = [];
      console.log(data);

      $.each(data, function(index, element) {
        if (element.id != "") {
          var $box =
            '<a title="' +
            element.title +
            '" href="artigo.html" class="blog-grid__item date ' +
            element.category +
            '"data-category="' +
            element.category +
            '" data-date="' +
            element.date +
            '">' +
            '<div class="blog-grid__img" style="background-image: url(' +
            element.img_link +
            ');"></div>' +
            '<div class="blog-grid__desc">' +
            '<h3 class="blog-grid__title">' +
            element.title +
            "</h3>" +
            '<p class="blog-grid__subtitle">' +
            element.subtitle +
            "</p>" +
            "</div> " +
            "</a>";
        } else {
          var $box = '<p class="text-center">Nenhuma matéria cadastrada.</p> ';
        }

        $(".js-grid-blog").append($box);
      });

      initBlogIsotope();
    });
}

var qsRegex;
var categoryFilter;

function initBlogIsotope() {
  // GRID
  // init Isotope

  var $container = $(".js-grid-blog").isotope({
    itemSelector: ".blog-grid__item",
    layoutMode: "fitRows",
    getSortData: {
      date: "[data-date] parseInt"
    },
    // sortAscending: false,
    filter: function() {
      var $this = $(this);
      var categoryResult = categoryFilter ? $this.is(categoryFilter) : true;
      var search = qsRegex
        ? $(this)
            .text()
            .match(qsRegex)
        : true;
      return categoryResult && search;
    }
  });

  var initShow = 40; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data("isotope"); // get Isotope instance
  var footer = $(".blog-grid .container");

  footer.append(
    '<button class="button button--red button--ghost button--icon button--medium js-load-more">CARREGAR MAIS<svg version="1.1" id="Capa_1" xmlns=http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><g id="plus"><polygon points="32,12 20,12 20,0 12,0 12,12 0,12 0,20 12,20 12,32 20,32 20,20 32,20"/></g></g></svg></button >'
  );

  blogLoadMore(initShow);

  function blogLoadMore(toShow) {
    var elems = $container.isotope("getFilteredItemElements");

    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems
      .slice(toShow, elems.length)
      .map(function(item) {
        return item.element;
      });

    $(hiddenElems).addClass("hidden");
    $container.isotope("layout");

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      jQuery(".js-load-more").hide();

      if (footer.find("#entreContato").length) {
      } else {
        footer.append(
          '<a href="/contato" id="entreContato" class="button button--red button--ghost button--medium">entre em contato</a>'
        );
      }
    } else {
      jQuery("#entreContato").show();
      jQuery(".js-load-more").show();
    }

    $(".js-load-more").removeClass("is-loading");
  }

  //when load more button clicked
  $(".js-load-more").click(function() {
    $(this).addClass("is-loading");

    if ($(".js-filter button").data("clicked")) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $(".js-filter button").data("clicked", false);
    } else {
      counter = counter;
    }

    counter = counter + initShow;

    blogLoadMore(counter);
  });

  $("#date").on("change", function() {
    var filterValue = this.value === "true";

    blogLoadMore(1000);
    $container.isotope({
      sortBy: "date",
      sortAscending: filterValue
    });
  });

  $("#category").on("change", function() {
    categoryFilter = this.value;
    blogLoadMore(1000);
    $container.isotope();
  });

  // use value of search field to filter
  var $quicksearch = $(".quicksearch").keyup(
    debounce(function() {
      qsRegex = new RegExp($quicksearch.val(), "gi");
      console.log("aa");

      $container.isotope();
      blogLoadMore(1000);
    }, 200)
  );

  // debounce so filtering doesn't happen every millisecond
  function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
      if (timeout) {
        clearTimeout(timeout);
      }
      function delayed() {
        fn();
        timeout = null;
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  }
}

function closeMenu() {
  $(".header").removeClass("header--open");
  $(".hamburger").removeClass("is-open");
  $("body").removeClass("overflowHidden");
}

function openMenu() {
  $(".hamburger").addClass("is-open");
  $(".header").addClass("header--open");
  $("body").addClass("overflowHidden");
}

function viewport() {
  var e = window,
    a = "inner";
  if (!("innerWidth" in window)) {
    a = "client";
    e = document.documentElement || document.body;
  }
  return { width: e[a + "Width"], height: e[a + "Height"] };
}

function checkWindowWidth() {
  var w = viewport().width;
  var size = "";
  if (w > 991) {
    size = "desktop";
  } else {
    size = "mobile";
  }

  return size;
}

function PrintElem(elem) {
  var mywindow = window.open("", "PRINT", "height=400,width=600");

  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write("</head><body >");
  //mywindow.document.write('<h1 style="margin-top: 0; margin-bottom: 0;">' + document.title  + '</h1>');
  $("#gruposAbertos, .section__content").css("padding-top", 0);

  mywindow.document.write(
    $("#gruposAbertos").prepend(
      '<h1 style="margin-top: 0; margin-bottom: 0;">' + document.title + "</h1>"
    )
  );
  mywindow.document.write($("#gruposAbertos").html());

  //mywindow.document.write(document.getElementById(elem).innerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}
