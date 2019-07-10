$(function(){
  new WOW().init();

  var $scroll;

  if(checkWindowWidth() == 'desktop'){
    $scroll = false;
  } else{
    $scroll = true;
  }

  // SCROLLBAR
  $('.js-scrollbar').perfectScrollbar({
    wheelPropagation: $scroll
  });

  if($('.PostContent__text').height() < 938){
    $('.PostContent__text.js-scrollbar').perfectScrollbar('destroy');
  }

  $('.autocomplete-suggestions').perfectScrollbar();

  // SMOOTH SCROLL
  $('.js-scroll').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      if(checkWindowWidth() == 'desktop'){
        h = 70;
      } else{
        h = 60;
      }

      $('html, body').animate({
        scrollTop: $(hash).offset().top - h
      }, 800, function(){
        window.location.hash = hash;
      });
    } // End if
  });

  	/* SMOOTH SCROLL */
	$('.js-scroll').on('click', function(event) { 

		$('.slick-slide').css('z-index','99999');
		$('.dropdown').removeClass('open');
		$('.navbar-collapse').removeClass('in');
	
	// Make sure this.hash has a value before overriding default behavior
	if (this.hash !== '') {
	  // Prevent default anchor click behavior
	  event.preventDefault();
	
	  // Store hash
	  var hash = this.hash;
	
	  // Using jQuery's animate() method to add smooth page scroll
	  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	  $('html, body').animate({
	    scrollTop: $(hash).offset().top-120	}, 800, function(){
	
	    // Add hash (#) to URL when done scrolling (default click behavior)
	    window.location.hash = hash;
	    
	    
	  });
	} // End if
	});
	
   // dropdown
   $('.Dropdown').on('click', function(){
      $(this).toggleClass('is-open');
   });

   $('.Dropdown a').on('click', function(){
      var option = $(this).attr('data-option');
      var value  = $(this).text();

      if( option == '') option = $(this).text();
      var set = $(this).attr('data-set'); 

      $('.'+set+'').text(value).addClass('is-selected');
      $('.'+set+'').val(option);
   });

  // MASK
  $('.js-date').mask('00/00/0000');
  $('.js-rg').mask('0.000.000-0', {reverse: true});
  $('.js-tel').mask('(99) 09999.9999');
  $('.js-cpf').mask('000.000.000-00', {reverse: true});

  // MENU
  // click no hamburguer icon
  $('.MenuTrigger').on('click', function(e){
    e.preventDefault();   

    if( $('.Menu').hasClass('Menu--open') ){
      closeMenu();
    } else{
      openMenu();
    }
  });

  // abre um sub menu
  $('.Menu--hasSub > a').on('click', function(e){
    e.preventDefault();

    $(this).siblings('.Menu-sub').addClass('Menu-sub--subOpen');
    $(this).addClass('is-selected');
    $('.Menu').addClass('Menu--subOpen');
  });

  // volta ao menu principal
  $('.js-back').on('click', function(){
    $(this).parent().removeClass('Menu-sub--subOpen');
    $('.Menu--hasSub > a').removeClass('is-selected');
    $('.Menu').removeClass('Menu--subOpen');
  });

  // menu fixo ao scollar
  if( $(window).scrollTop() >= 70) {
    $('.Header').addClass('is-scrolling');
  }
  
  $(window).scroll(function(){
    
    if( $(this).scrollTop() >= 70 ){
      $('.Header').addClass('is-scrolling');
    } else{
    	$('.Header').removeClass('is-scrolling');
    }
  });

  

  // abre campo de busca
  $('.SearchTrigger').on('click touch', function(){
    $('.Header').addClass('search-open');
    
    setTimeout(function(){
      $('.Search input').focus();
    }, 500);
  });

  $('.Search__close').on('click touch', function(){
    $('.Header').removeClass('search-open');
  });

  if( $('#instafeed').length ){
    var $limit;
    if(checkWindowWidth() == 'desktop'){
      $limit = 7;
    } else{
      $limit = 6;
    }

    var feed = new Instafeed({
        accessToken: '4168706409.728edcc.16d6576a16e34d5da9357f1fd94c1e74',
        clientId: '728edccb235240fca43a48a156daa277',
        get: 'user',
        limit: $limit,
        resolution: 'low_resolution',
        tagName: 'pdkmotors',
        template: '<a class="Instafeed__item" href="{{link}}"><div class="Instafeed__content"><span class="like">{{likes}}</span><span class="comment">{{comments}}</span></div><img src="{{image}}" /></a>',
        userId: '4168706409'
    });
    feed.run();
  }
  

  $('.js-searchBlog').on('focus', function(e){
    $('.js-resultBlog .SearchResult').addClass('is-open');
  });

  $('.js-searchHeader').on('focus', function(e){
    $('.js-resultHeader .SearchResult').addClass('is-open');
  });


  // estoque
  var stockArray = '';

  $.ajax({
    url: "/assets/json/veiculos.php",
    dataType: "json",
    async: false,
    success: function(data) {
      stockArray = data;
    }
  });

  // blog
  var blogArray = '';

  $.ajax({
    url: "/assets/json/veiculos.php",
    dataType: "json",
    async: false,
    success: function(data) {
      blogArray = data;
    }
  });
  
  $('.js-searchBlog').autocomplete({
      lookup: blogArray,
      lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
	        var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
	        return re.test(suggestion.data);
	    },
      onSelect: function (suggestion) {
            
      //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
      window.location.href = "/veiculo/"+suggestion.link;
          
      },
      appendTo: '.js-resultBlog .SearchResult',
      onSearchComplete: function(){
        $('.js-resultBlog .SearchResult').addClass('is-visible');
      }
  });

  // header
  var headerArray = '';

  $.ajax({
    url: "/assets/json/veiculos.php",
    dataType: "json",
    async: false,
    success: function(data) {
      headerArray = data;
    }
  });
  
  $('.js-searchHeader').autocomplete({
      lookup: headerArray,
      lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
	        var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
	        return re.test(suggestion.data);
	    },
      onSelect: function (suggestion) {
            
      //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
      window.location.href = "/veiculo/"+suggestion.link;
          
      },
      appendTo: '.js-resultHeader .SearchResult',
      onSearchComplete: function(){
        $('.js-resultHeader .SearchResult').addClass('is-visible');
      }
  });
  
  if( $('.js-grid').length ){
    getProducts();
  } 
  
  if( $('.js-gridBlog').length ){
    getPosts();
  } 

	//load more produtos
	// $('body').on('click', '#LoadProducts', function(){
	// $(this).addClass('is-loading');
	
	// 	getProducts();
	
	// 	$(this).removeClass('is-loading');
 //  });
  
	function initialize() {

   	var chicago = new google.maps.LatLng(-23.630113, -46.696802);
   	var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: chicago,
        mapTypeControl: false,
        scrollwheel: false,
        styles: 
        [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f5f5f5"
                    }
                  ]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#f5f5f5"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#bdbdbd"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#eeeeee"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#e5e5e5"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dadada"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#e5e5e5"
                    }
                  ]
                },
                {
                  "featureType": "transit.station",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#eeeeee"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#c9c9c9"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                }
        ]
    };
    
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    pixelOffset = new google.maps.Size(100,140);

    markerMuseu = new google.maps.Marker({
      position: new google.maps.LatLng(-23.630113, -46.696802),
      map: map,
      title: 'PDK Motors',
      pixelOffset: new google.maps.Size(100,140)
    });

    var contentString = '<div class="InfoWindow">'+
      '<a href="https://goo.gl/maps/FUZNALqiESU2" target="_blank">' +
      '<h1 class="InfoWindow__title">PDK Motors</h1>'+
      '<div class="InfoWindow__content">'+
      '<p>R. Américo Brasiliense, 999 <br> Chácara Santo Antônio, São Paulo - SP, <br>CEP: 04715-003</p>'+
      '<p>(11) 5182-9999</p>'+
      '</div>'+
      '</a>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    

    markerMuseu.addListener('click', function() {
      infowindow.open(map, markerMuseu);
    });
  }

  if( $('#map').length ){
    initialize();
  }


	/* FORM CONTATO */
	$('#formContato').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input, textarea').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/contato.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Mensagem enviada com sucesso.');
			 			// Limpa o form
			 			$('#formContato').trigger("reset");
					} else {
					  alert('Erro ao tentar enviar mensagem: '+data);
					}
					}
				});
			}else{
				alert('Erro ao tentar enviar mensagem. Tente novamente.');
			}
	
	});
	
	
	/* FORM AVALIE */
	$('#formAvalie').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input, textarea').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/avalie.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Dados enviados com sucesso. Entraremos em contato por e-mail ou telefone.');
			 			// Limpa o form
			 			$('#formAvalie').trigger("reset");
					} else {
					  alert('Erro ao tentar enviar dados: '+data);
					}
					}
				});
			}else{
				alert('Erro ao tentar enviar dados. Tente novamente.');
			}
	
	});
	
	
	/* FORM FINANCIAMENTO */
	$('#formFinanciamento').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input, textarea').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/financiar.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Dados enviados com sucesso. Entraremos em contato por e-mail ou telefone.');
			 			// Limpa o form
			 			$('#formFinanciamento').trigger("reset");
					} else {
					  alert('Erro ao tentar enviar dados: '+data);
					}
					}
				});
			}else{
				alert('Erro ao tentar enviar dados. Tente novamente.');
			}
	
	});
	
	
	/* FORM FINANCIAMENTO */
	$('#formProposta').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input, textarea').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/proposta.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Proposta enviada com sucesso. Entraremos em contato por e-mail ou telefone.');
			 			// Limpa o form
			 			$('#formProposta').trigger("reset");
					} else {
					  alert('Erro ao tentar enviar dados: '+data);
					}
					}
				});
			}else{
				alert('Erro ao tentar enviar dados. Tente novamente.');
			}
	
	});
	
	
	/* FORM FINANCIAMENTO */
	$('#formNewsletter').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/newsletter.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Cadastro realizado com sucesso.');
			 			// Limpa o form
			 			$('#formNewsletter').trigger("reset");
					} else {
					  alert('Erro ao tentar enviar dados: '+data);
					}
					}
				});
			}else{
				alert('Erro ao tentar enviar dados. Tente novamente.');
			}
	
	});


  // VEICULO
  // produto

  $('.js-SliderProduct').slick({
    autoplay: true,
    arrows: false,
    dots: false,
    slide: '.Slider__item',
    speed: 800,
    asNavFor: '.SliderNav',
    infinite: false,
    mobileFirst: true
  });

  $('.js-SliderNav').slick({
    arrows: true,
    asNavFor: '.js-SliderProduct',
    focusOnSelect: true,
    infinite: true,
    mobileFirst: true,
    nextArrow: '<button type="button" class="Arrow__button Arrow__button--next"></button>',
    prevArrow: '<button type="button" class="Arrow__button Arrow__button--prev"></button>',
    slidesToScroll: 2,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true
        }
      }
    ]
  });

  // estoque
  $('.js-SliderStock').slick({
    autoplay: true,
    arrows: true,
    dots: true,
    slide: '.Slider__item',
    speed: 800,
    nextArrow: '<button type="button" class="Arrow__button Arrow__button--next"></button>',
    prevArrow: '<button type="button" class="Arrow__button Arrow__button--prev"></button>',
    infinite: true,
    mobileFirst: true
  });

  $('.js-SliderFilter').slick({
    arrows: true,
    autoplay: false,
    dots: false,
    infinite: false,
    mobileFirst: true,
    nextArrow: '<button type="button" class="Arrow__button Arrow__button--next"></button>',
    prevArrow: '<button type="button" class="Arrow__button Arrow__button--prev"></button>',
    slidesToScroll: 2,
    slidesToShow: 2,
    speed: 800,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
          infinite: true
        }
      }
    ]
  });

  // blog
  $('.js-SliderBlog').slick({
    autoplay: true,
    arrows: false,
    dots: false,
    slide: '.Slider__item',
    speed: 800,
    fade: true,
    nextArrow: '<button type="button" class="Arrow__button Arrow__button--next"></button>',
    prevArrow: '<button type="button" class="Arrow__button Arrow__button--prev"></button>',
    infinite: true,
    mobileFirst: true
  });
});


function initIsotope(){
  // quick search regex
  var qsRegex;

  // GRID
  // init Isotope
  var $container = $('.js-grid').isotope({
    itemSelector: '.Grid__item',
    layoutMode: 'fitRows',
    getSortData: { 
      marca: '[data-marca]',
      modelo: '[data-modelo]',
      anofabicacao: '[data-anofabricacao]',
      anomodelo: '[data-anomodelo]',
      category: '[data-category]',
      valor: '[data-valor] parseInt'
    },
    filter: function(){
    	return qsRegex ? $(this).text().match( qsRegex ) : true;
    }
  });

  // use value of search field to filter
	var $quicksearch = $('.js-searchStock').keyup( debounce( function() {
	  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
	  $container.isotope();
	}, 200 ) );

  var initShow = 16; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data('isotope'); // get Isotope instance

  if($container.is('#Container')){
    //append load more button
    $('.Ver .container-loader').html('<a href="#/" class="u-button" id="LoadProducts"><span>carregar mais</span></a>');
  }

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
  	
  	var elems = $container.isotope('getFilteredItemElements'); 

    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, elems.length).map(function(item) {
      return item.element;
    });

    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0 && $container.is('#Container')) {
      jQuery("#LoadProducts").hide();
      $('.Ver .container-loader').html('<a href="#/" id="entreContato" class="u-button" data-toggle="modal" data-target="#modalContato"><span>entre em contato</span></a>');
    } else {
      jQuery("#entreContato").show();
      jQuery("#LoadProducts").show();
    };

    $('#LoadProducts').removeClass('is-loading');

  }  

  //when load more button clicked
  $('body').on('click', '#LoadProducts', function(e) {

  if ($('.js-filter button').data('clicked')) {
    //when filter button clicked, set initial value for counter
    counter = initShow;
    $('.js-filter button').data('clicked', false);
  } else {
    counter = counter;
  };

    counter = counter + initShow;

    loadMore(counter);
  });
  
  //when filter button clicked
  $(".js-filter button").click(function() {
    $(this).data('clicked', true);
    loadMore(initShow);
  });
  
  // bind sort button click
  $('.filtro-veiculo').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by'); 
    $container.isotope({ sortBy: sortByValue });
  });

  // change is-active class on buttons
  $('.filtro-veiculo').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-active').removeClass('is-active');
      $( this ).addClass('is-active');
    });
  });
  
  
  
  //Filtro por categoria
  $('.js-filter').on('click', 'a', function(e) {
    e.preventDefault();    
    var filterValue = $(this).attr('data-filter');
    	
	 // use filterFn if matches value
	  $container.isotope({ filter: filterValue });
	  
	  //Resolve bug: nao aparecia item quando nao estva listado 
	  loadMore(initShow);
	  
	  //jQuery("#LoadProducts").hide();
    jQuery("#entreContato").hide();
    $('.Filter-clear').removeClass('hidden');
    $('.Filter-clear').show();
    
      
    if(filterValue == ''){ 
      $('.Ver .container-loader').html('<a href="#/" class="u-button" id="LoadProducts"><span>carregar mais</span></a>');
      $("#LoadProducts").show();
	    $("#entreContato").hide();
	    $('.Filter-clear').addClass('hidden');
      $('.js-filter button').removeClass('is-active');
    }

  });  
}

function getProducts(){
	
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
	    // If first entry with this name
	if (typeof query_string[pair[0]] === "undefined") {
		  query_string[pair[0]] = decodeURIComponent(pair[1]);
		    // If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
		  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
		  query_string[pair[0]] = arr;
		    // If third or later entry with this name
		} else {
		  query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 
	
	//Veriavel com categoria
	var idCategoria = query_string.categoria; 
	
	$.getJSON( "assets/json/showroom.php", function(data) {
  	
	})
  .fail(function(data) {
    //console.log( "error" );
  }).success(function(data) {
  	$elementos = [];
  	
  	var x = false;
  	$.each(data, function(index, element) { 
		if(element.modelo!=''){
	  //albuns/album_' + element.idAlbum + '/' + element.capa +'
      var blindado = 'Blindado';
      if(element.blindado=='sim'){ blindado = 'Blindado'; } else { blindado = ''; }

      var $box = '<div class="Grid__item marca_' + element.km + '" data-category="' + element.idVeiculoCategoria + '" data-marca="' + element.idMarca + '" data-modelo="' + element.modelo + '" data-valor="' + element.preco + '" data-anofabricacao="' + element.anoFabricacao + '" data-anomodelo="' + element.anoModelo + '">' +
        '<a href="/veiculo/'+ element.alias +'/'+ element.idVeiculo +'">' +
          '<div class="Grid__img" style="background-image: url(/assets/img/albuns/album_'+ element.idAlbum +'/'+ element.capa +');"></div>' +
          '<div class="Grid__title">' +
            '<h4>' + element.idMarca + '</h4>' +
            '<h5>' + + '</h5>' +
            '<small>'+ element.anoFabricacao +'/'+ element.anoModelo + '<br> R$ ' + element.preco +'</small>' +
          '</div>' +
        '</a>' +
      '</div>';
  		
  		}else{

	  		var $box = '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
		}
		
		$(".js-grid").append($box);
		
	});
	
	if(x==true){
	}else{				
		initIsotope();
	}	
		
  });
}

function closeMenu(){
  $('.Menu').removeClass('Menu--open');
  $('.Menu').removeClass('Menu--subOpen');

  $('.Menu-sub').removeClass('Menu-sub--subOpen');
  $('.MenuTrigger').removeClass('is-open');

  $('.Menu--hasSub > a').removeClass('is-selected');

  $('body').removeClass('overflowHidden');
}

function openMenu(){
  $('.MenuTrigger').addClass('is-open');
  $('.Menu').addClass('Menu--open');
  $('body').addClass('overflowHidden');
}

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function checkWindowWidth(){
  var w = viewport().width;
  var size = '';
  if(w > 991){
    size = 'desktop';
  } else{
    size = 'mobile';
  }

  return size;
}

function clickOutsideMenu(){
  
  var x = checkWindowWidth();
  if(x == 'desktop'){
    $(document).on('mouseup touchend', function (e){ 
      var elem = $('.Menu-sub');

      if (!elem.is(e.target) && elem.has(e.target).length === 0){
        closeMenu();
      }
    });
  } else{
    $(document).off('mouseup');
  }
}

function initIsotopeBlog(){
  // GRID
  // init Isotope
  var $container = $('.js-gridBlog').isotope({
    itemSelector: '.Post__item',
    layoutMode: 'vertical'
  });

  var initShow = 5; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data('isotope'); // get Isotope instance

  if($container.is('#ContainerBlog')){
    //append load more button
    $('.Ver .container-loader').append('<a href="#/" class="u-button" id="LoadPosts"><span>carregar mais</span></a>');
  }

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
  	
  	var elems = $container.isotope('getFilteredItemElements'); 

    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, elems.length).map(function(item) {
      return item.element;
    });

    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0 && $container.is('#ContainerBlog')) {
      jQuery("#LoadPosts").hide();
      $('.Ver .container-loader').html('<a href="#/" id="entreContato" class="u-button" data-toggle="modal" data-target="#modalContato"><span>entre em contato</span></a>');
    } else {
      jQuery("#entreContato").show();
      jQuery("#LoadPosts").show();
    };

    $('#LoadPosts').removeClass('is-loading');

  }


  

  //when load more button clicked
  $("#LoadPosts").click(function(e) {
  	$(this).addClass('is-loading');

    if ($('.js-filter button').data('clicked')) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $('.js-filter button').data('clicked', false);
    } else {
      counter = counter;
    };

    counter = counter + initShow;

    loadMore(counter);
  });

  $('.js-filterBlog').on( 'click', 'a', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });
  
}

function getPosts(){
	
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
	    // If first entry with this name
	if (typeof query_string[pair[0]] === "undefined") {
		  query_string[pair[0]] = decodeURIComponent(pair[1]);
		    // If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
		  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
		  query_string[pair[0]] = arr;
		    // If third or later entry with this name
		} else {
		  query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 
	
	//Veriavel com categoria
  var idCategoria = query_string.categoria; 
	
	$.getJSON( "assets/json/veiculos.php", function(data) {
  	
	})
  .fail(function(data) {
    //console.log( "error" );
  }).success(function(data) {
  	$elementos = [];
  	
  	var x = false;
  	$.each(data, function(index, element) { 
		if(element.modelo!=''){

      // essa classe opcao é vem lá do dropdown da página blog.html "filtrar por categoria"
      var $box = '<div class="Post__item opcao1">' + 
					'<a href="post.html" style="background-image: url(assets/img/post1.jpg);">' +
						'<div class="Post__title">' +
						'<h3>Any way the wind blows - The <span>Mercedes-AMG </span>GT R in the wind tunnel</h3>' +
						'<small>Por PDK Motors - 22 de março de 2017</small>' +
					'</div>' +
					'</a>' +
					'<div class="Post__share">' +
						'<span>Compartilhar:</span>' +
							'<ul>' +
							'<li>' +
								'<a href="">' +
									'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="160.77px" height="309.466px" viewBox="225.675 332.768 160.77 309.466" enable-background="new 225.675 332.768 160.77 309.466" xml:space="preserve">' +
											'<path id="f" fill="#6b7073" d="M330.026,642.234V501.068h47.454l7.052-54.984h-54.506v-35.143c0-15.897,4.423-26.775,27.253-26.775 h29.166v-49.247c-5.021-0.717-22.353-2.151-42.434-2.151c-42.075,0-70.763,25.699-70.763,72.794v40.641h-47.573v54.984h47.573 v141.047H330.026z"/>' +
									'</svg>' +
								'</a>' +
							'</li>' +
							'<li>' +
								'<a href="">' +
									'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="28.801px" height="20.164px" viewBox="1.599 5.919 28.801 20.164" enable-background="new 1.599 5.919 28.801 20.164" xml:space="preserve">' +
										'<g transform="translate(144 0)">' +
											'<path fill="#6b7073" d="M-113.6,10.227c0-2.379-1.928-4.308-4.305-4.308h-20.192c-2.377,0-4.305,1.929-4.305,4.308v11.546 c0,2.379,1.928,4.31,4.305,4.31h20.192c2.377,0,4.305-1.931,4.305-4.31V10.227z M-130.881,20.871V10.025l8.225,5.423 L-130.881,20.871z"/>' +
										'</g>' +
									'</svg>' +
								'</a>' +
							'</li>' +
							'<li>' +
								'<a href="">' +
									'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="380.945px" height="309.697px" viewBox="115.587 332.537 380.945 309.697" enable-background="new 115.587 332.537 380.945 309.697" xml:space="preserve">' +
										'<path id="XMLID_22_" fill="#6b7073" d="M235.357,642.234c143.796,0,222.448-119.173,222.448-222.447c0-3.348,0-6.694-0.239-10.16 c15.3-11.117,28.448-24.743,38.967-40.521c-14.224,6.335-29.404,10.519-44.943,12.312c16.376-9.801,28.567-25.102,34.425-43.27 c-15.3,9.084-32.154,15.539-49.605,19.005c-29.644-31.437-79.13-32.991-110.566-3.347c-20.32,19.125-28.927,47.573-22.592,74.707 c-62.873-3.108-121.443-32.871-161.128-81.64c-20.798,35.74-10.16,81.401,24.146,104.351c-12.431-0.358-24.623-3.706-35.501-9.802 c0,0.358,0,0.598,0,0.956c0,37.175,26.297,69.209,62.754,76.62c-11.475,3.107-23.547,3.586-35.262,1.314 c10.28,31.795,39.565,53.67,73.034,54.268c-27.731,21.754-61.917,33.588-97.06,33.588c-6.216,0-12.432-0.358-18.646-1.076 C151.207,630.042,192.804,642.234,235.357,642.234"/>' +
									'</svg>' +
								'</a>' +
							'</li>' +
							'<li>' +
								'<a href="">' +
									'<svg enable-background="new 0 0 100 100" height="100px" id="Layer_1" version="1.1" viewBox="0 0 100 100" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
										'<g><defs><rect height="100" id="SVGID_1_" width="100"/></defs><path fill="#6b7073" d="M95,49.247c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L5,95.406   l7.975-23.522c-4.023-6.606-6.34-14.354-6.34-22.637c0-24.213,19.781-43.841,44.184-43.841C75.223,5.406,95,25.034,95,49.247    M50.818,12.388c-20.484,0-37.146,16.535-37.146,36.859c0,8.066,2.629,15.535,7.076,21.611l-4.641,13.688l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.858C87.964,28.924,71.301,12.388,50.818,12.388    M73.129,59.344c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.494c-0.993-0.359-1.717-0.539-2.438,0.536   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.334   c-3.219-2.847-5.393-6.364-6.025-7.44c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.976   c-0.902-2.151-1.803-1.793-2.436-1.793c-0.631,0-1.354-0.09-2.076-0.09s-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.114c0.541,0.716,7.49,11.92,18.5,16.223   C63.2,71.177,63.2,69.742,65.186,69.562c1.984-0.179,6.406-2.599,7.312-5.107C73.398,61.943,73.398,59.792,73.129,59.344"/></g>' +
									'</svg>' +
								'</a>' +
							'</li>' +
						'</ul>' +
					'</div>' +
				'</div>';
  		
  		}else{

	  		var $box = '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
		}
		
		$(".js-gridBlog").append($box);
		
	});
	
	if(x==true){
	}else{				
		initIsotopeBlog();
	}	
		
  });
}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}