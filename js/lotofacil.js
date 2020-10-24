// http://loterias.caixa.gov.br/wps/portal/loterias/landing/lotofacil
var script=document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", "https://code.jquery.com/jquery-3.5.1.slim.min.js");
document.body.appendChild(script);
function defer(method){if(window.jQuery){method()}else{setTimeout(function(){defer(method)},50)}};
defer(function(){
	$(document).ready(function(){
		analise_lotofacil();
	});
});
function analise_lotofacil() {
	//var seujogo = [ 08, 16, 06, 07, 09, 21, 12, 15, 17, 18, 22, 23, 05, 19, 02 ]; // 147,31,3,0,0. == bolas menos frequentes.
	//var seujogo = [ 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15 ]; // 167,32,3,0,0.
	//var seujogo = [ 01, 02, 03, 04, 05, 06, 07, 08, 17, 18, 19, 20, 21, 22, 23 ]; // 166,31,3,0,0.
	//var seujogo = [ 01, 02, 03, 04, 09, 10, 11, 13, 14, 17, 18, 19, 20, 21, 22 ]; // 186,52,3,0,0
	//var seujogo = [ 01, 02, 03, 04, 09, 10, 11, 13, 14, 17, 18, 20, 21, 22, 24 ]; // 192,50,2,1,0
	//var seujogo = [ 01, 02, 03, 04, 09, 10, 11, 13, 14, 17, 18, 20, 21, 22, 23 ]; // 196,50,6,0,0
	//var seujogo = [ 18, 20, 25, 23, 10, 11, 24, 14, 06, 02, 13, 09, 05, 16, 03 ]; // 203,38,4,0,1. // primeiro jogo concurso
	//var seujogo = [ 01, 02, 03, 04, 09, 10, 11, 13, 14, 17, 18, 22, 23, 24, 25 ]; // 203,42,8,0,0.
	//var seujogo = [ 01, 02, 03, 04, 09, 10, 11, 13, 14, 17, 18, 22, 23, 24, 25 ]; // 203,42,8,0,0.
	//var seujogo = [ 13, 24, 10, 20, 11, 03, 04, 25, 01, 14, 02, 19, 05, 23, 22 ]; // 219,46,2,0,0. == bolas mais frequentes.
	//var seujogo = [ 13, 22, 24, 07, 25, 19, 11, 17, 06, 10, 20, 18, 12, 09, 21 ]; // 205,47,0,0,1 = concurso 2064.
	//var seujogo = [ 06, 25, 19, 10, 05, 07, 02, 18, 11, 20, 13, 16, 24, 22, 01 ]; // 208,29,5,0,1 = concurso 2063.
	
	var seujogo = [ 13, 24, 10, 20, 11, 03, 04, 25, 01, 14, 02, 19, 05, 23, 22 ]; // 219,46,2,0,0. == bolas mais frequentes.

	var a15="",a14="",a13="",a12="",a11="";
	var asmais = [0, 0,0,0,0,0,0,0,0,0,0  , 0,0,0,0,0,0,0,0,0,0 , 0,0,0,0,0,0];

	$("table tr").each(function(i,x){ // :eq(1)
		var element = $(x).find("td");
		if ( element != undefined ) {
			var concurso = element[0] != undefined ? element[0].innerHTML : "";
			var data = element[1] != undefined ? element[1].innerHTML : "";
			var bolas = [];
			for (var v=1;v<=15;v++){ bolas[v] = element[v+1] != undefined ? element[v+1].innerHTML : ""; }
			if ( concurso != undefined && data != undefined && bolas != undefined ) {
				if ( data.length == 10 && bolas[1] != "" ) {
					
					// Busca seu jogo
					var acerto = 0;				
					for ( var k = 1; k <= 15 ; k++ ){
						for ( meuJog = 0; meuJog <= seujogo.length ; meuJog++ ){
							if( bolas[k] == seujogo[meuJog] ) acerto++;
						}
					}
					if(acerto==15)a15++;
					if(acerto==14)a14++;
					if(acerto==13)a13++;
					if(acerto==12)a12++;
					if(acerto==11)a11++;
					
					// Buscar mais frequentes
					for ( var y = 1 ; y <= 15 ; y++ ){
						asmais[   parseInt(bolas[y])   ]++;
					};

					// String bolas.
					var StringBolas = "Bolas:";
					for (var v=1;v<=15;v++){
						StringBolas = StringBolas + " "+ bolas[v]
					}

					if(acerto>=13){
						console.log( 
							"Concurso: "  + concurso + "\n" +
							"Data: " + data + "\n" + StringBolas + "\n" + "Acertos: " + acerto
						);
					}
					
				}
				
			}
		}
	});
	console.log("15 acertos: " + ( a15 == "" ? "Nenhum" : a15 ) );
	console.log("14 acertos: " + ( a14 == "" ? "Nenhum" : a14 ) );
	console.log("13 acertos: " + ( a13 == "" ? "Nenhum" : a13 ) );
	console.log("12 acertos: " + ( a12 == "" ? "Nenhum" : a12 ) );
	console.log("11 acertos: " + ( a11 == "" ? "Nenhum" : a11 ) );
	// String mais frequentes.
	var StringFreq = "";
	for (v=1;v<=25;v++){
		StringFreq = StringFreq + " [" + v + "]=" + asmais[v];
	}
	console.log("As bolas mais frequentes: " + StringFreq );

}
