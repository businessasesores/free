$('.carousel').carousel();

function solicitarTutorial(){
    $(".enviando_mensaje").css('display','block');
    var correo = $("#correo_tutorial").val();
    var mensaje = $("#mensaje_tutorial").val();
    var html="";
    if(correo == '' || mensaje == ''){
        html += '<p style="text-align:center;font-size: 20px;color: #fff;">Para solicitar un tutorial debes ingresar datos válidos</p><center><a class="btn btn-secondary btn-lg mt-2 btn_premium" style="text-align: center;margin: 0 auto;color:#ffffff;" onclick="limpiarEnviando();">Vale</a></center>';
        $('.pos_mensaje').append(html);
    }else{
        html += '<div class="spinner-border text-info" role="status"></div><p style="font-size: 20px;color: #ffffff;">Enviando...</p>';
        $('.pos_mensaje').append(html);
        var datos = 'correo_tutorial=' + correo + '&mensaje_tutorial=' + mensaje;
        $.ajax({
			type: "POST",
			url: "tutorial_mensaje.php",
			data: datos,
			success: function(res) {
				$(".pos_mensaje").empty();
				(parseInt(res)) == 1 ? html = '<p style="text-align:center;font-size: 20px;color: #fff;">Mensaje enviado</p>' : html = '<p style="text-align:center;font-size: 20px;color: #fff;">Error al enviar, intenta más tarde</p>';
				$('.pos_mensaje').append(html);
			},
			error: function(res) {
			    $(".pos_mensaje").empty();
			    $('.pos_mensaje').append('<p style="text-align:center;font-size: 20px;color: #fff;">Error al enviar, intenta más tarde</p>');
			}
		});
    }
}
function limpiarEnviando(){
    $("#correo_tutorial").val('');
    $("#mensaje_tutorial").val('');
    $(".pos_mensaje").empty();
    $(".enviando_mensaje").css('display','none');
    
}

function estaDisponible(){
	console.log("hola");
	$(".boton_checar").prop('disabled', true);
	$('.error_check').addClass("esconder");
	$('.spinner_checar').removeClass("esconder");
	$(".result_domains").empty();
	var domain_name = $("#buscar_domino").val();
	var reg_exp = /^[a-z]+$/;
	//console.log(domain_name);
	var domain_name_result = reg_exp.test(domain_name);
	//console.log(domain_name);
	if (domain_name_result ==true) {
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://my.freenom.com/includes/domains/fn-available.php?domain="+ domain_name +"&tld=",
		  "method": "POST",
		  "headers": {
		    "cache-control": "no-cache"
		  }
		}

		$.ajax(settings).done(function (response) {
		  //console.log(response.free_domains);
		  showDomains(response.free_domains);
		  $(".boton_checar").prop('disabled', false);
		  $('.spinner_checar').addClass("esconder");
		});
	}else{
		$('.spinner_checar').addClass("esconder");
		$(".error_check").removeClass("esconder");
		$(".boton_checar").prop('disabled', false);
	}
}

function showDomains(dominios){
	console.log(dominios);
	console.log(dominios.length);
	$(".result_domains").empty();
	var html = ""
	for(var i=0; i < dominios.length; i++ ){
		//html += "		<div class'col'>"
		html += "		<div class='card card_domains' style='width: 18rem;'>"
		html += "		  <div class='card-body card_body_domain'>"
		html += "		    <p class='card-text card_text_domain'>"+ dominios[i].domain+"</p>"
		html += "		    <h5 class='card-title card_title_domain'>"+ dominios[i].tld+"</h5>"
		if(dominios[i].status === "AVAILABLE"){
			html += "		    <a target='_blank' href='https://my.freenom.com/domains.php?a=availability&domain="+ dominios[i].domain +"' class='btn btn-success btn_free_domain'>                 viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'></path></svg><span class='domain_available_text'>Registrar</span></a>"
		}else{
			html += "		    <p class='not_avilable_domain'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-x-circle' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg><span class='domain_not_available_text'>Registrado</span></p>"
		}
		html += "		  </div>"
		html += "		</div>"
		//html += "		</div>"
	}
	$(".result_domains").append(html);
}


























