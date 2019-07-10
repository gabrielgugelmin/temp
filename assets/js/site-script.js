$(function(){
	
	/* FORM NEWSLETTER */
	$('#formNewsletter').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim( $(this).find('input').val() ); 
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/newsletter.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Cadastrado com sucesso.');
			 			// Limpa o form
			 			$('#formNewsletter').trigger("reset");
					} else {
					  alert('Erro ao tentar cadastrar e-mail. Tente novamente.');
					}
					}
				});
			}else{
				//alert('Erro ao tentar enviar mensagem. Tente novamente.');
			}
	});

});