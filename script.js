var $total = -1
var pontos = -1
var correta = 0;
var errada = 0;
var usuario = "";
var cont = 1;
var flag = 1;
var pontos = 0;
var pontosBar = 10;
var perguntasTotal = "0";
var totalCertas = "0";
var totalErradas = "0";
var desc = '0';
var barr = 0;
var progress = 0;
var sendMail = true;
var p = 0;
var ac = ""; bc = ""; cc = ""; dc = ""; ec = ""; fc = ""; gc = ""; hc = ""; ic = ""; jc = "";
var ae = ""; be = ""; ce = ""; de = ""; ee = ""; fe = ""; ge = ""; he = ""; ie = ""; je = "";
var descj = "";
var desca = ""; descb = ""; descc = ""; descd = ""; desce = ""; descf = ""; descg = ""; desch = ""; desci = "";
/******Tamanho da barra de progress ******/
/* PARA ACERTAR O BUG DO BOTÃO É SÓ COLOCAR TUDO EM BUTTON
/************************************************ */
console.log($("[id*='ctl00_hnlPerfil']", window.parent.document).html());
var user = $("[id*='ctl00_hnlPerfil']", window.parent.document).html();
/****************TESTES************************* */
/************************************************ */
/*cont = 0 vai ser a primeira questão*/
function Cont() {
	cont++;
	return cont;
}
function Flag() {
	flag++;
	return flag;
}
function Time1() {
	setTimeout(function () {
		document.getElementById('pag0').style.display = 'none';
	}, 100);
}
function Time2() {
	setTimeout(function () {
		document.getElementById('pag1').style.display = 'none';
	}, 100);
}
function Time3() {
	setTimeout(function () {
		document.getElementById('pag2').style.display = 'none';
	}, 100);
}
function Time4() {
	setTimeout(function () {
		document.getElementById('pag3').style.display = 'none';
	}, 100);
}
function Time5() {
	setTimeout(function () {
		document.getElementById('pag4').style.display = 'none';
	}, 100);
}
function Time6() {
	setTimeout(function () {
		document.getElementById('pag5').style.display = 'none';
	}, 100);
}
function Time7() {
	setTimeout(function () {
		document.getElementById('pag6').style.display = 'none';
	}, 100);
}
function Time8() {
	setTimeout(function () {
		document.getElementById('pag7').style.display = 'none';
	}, 100);
}
function Time9() {
	setTimeout(function () {
		document.getElementById('pag8').style.display = 'none';
	}, 100);
}
/*********************************************************************** */
function proGress(num, circle) {
	var canvas = document.getElementById('progress-bar');
	canvas.width = canvas.height = 250;
	var ctx = canvas.getContext('2d');
	var radius = 100;
	var center = {
		x: canvas.width / 2,
		y: canvas.height / 2
	};

	Number.prototype.degree = function () {
		var startPaint = 180;
		return (this + startPaint) * Math.PI / 180;
	};

	function clearCanvas() {
		canvas.width = canvas.width;
	}
	function drawMiniCircle(x, y) {
		ctx.beginPath()
		ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
		ctx.fillStyle = circle;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#fff';
		ctx.stroke()
	}
	function progress(sAngle, eAngle) {
		clearCanvas();
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 5;
		ctx.arc(center.x, center.y, radius, sAngle.degree(), eAngle.degree());
		ctx.stroke();
		// mine circle
		var x = center.x + Math.cos(eAngle.degree()) * radius;
		var y = center.y + Math.sin(eAngle.degree()) * radius;
		drawMiniCircle(x, y);

	}
	////////////////////////////////
	function animate(options) {
		var start = performance.now();
		requestAnimationFrame(function animate(time) {
			// timeFraction от 0 до 1
			var timeFraction = (time - start) / options.duration;
			if (timeFraction > 1) timeFraction = 1;
			// текущее состояние анимации
			var progress = options.timing(timeFraction)
			options.draw(progress);
			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}
		});
	}
	animate({
		duration: 2000,
		timing: function circ(timeFraction) {
			return 1 - Math.sin(Math.acos(timeFraction))
		},
		draw: function (prog) {
			progress(-45, prog * num);
		}
	});
}

/************************************************************************** */
/***************************************** */
//Barra de progresso
setInterval(function () {
	jQuery('#myBar').animate({ opacity: 0 }, 400, "linear", function () {
		jQuery(this).delay(500);
		jQuery(this).animate({ opacity: 1 }, 400, function () {
		});
		jQuery(this).delay(300);
	});
}, 1000);

/*********************************************************************************************************/
/************************** DOM **************************************************************************/
$(document).ready(function () {
/*******************************************************************************************************/
/********************************************************************************************************/
	$('.btn3').click(function () {
		setTimeout(function () {
			document.getElementById('pagA').style.display = 'none';
			document.getElementById('pag0').style.display = 'block';
			document.getElementById('myProgress').style.display = 'block';
			document.getElementById('progress').style.display = 'block';
			document.getElementById('p').style.display = 'block';
		}, 400);
	});
	$('.absolute').click(function () {
		$("body").css({ "position": "absolute" });
	});

	$('.btn').click(function () {
		    pontosBar+=10;
				$("#c").html(pontosBar + "%")
	});

	$('.absolute').click(function () {
		setTimeout(function () {
			var div = $(".finalResult");
			div.animate({ height: '200px', opacity: '0.4' }, "slow");
			div.animate({ width: '500px', opacity: '0.8' }, "slow");
			div.animate({ height: '210px', opacity: '0.4' }, "slow");
			div.animate({ width: '600px', opacity: '0.8' }, "slow");
		}, 3500);
	});

	//get total of questions
	var $questionNumber = $('h2').length;
	console.log($questionNumber);
	//caching final score
	var $totalScore = 0;

	$('li').click(function () {
		//caching variables
		var $parent = $(this).parent();
		var $span = $(this).find('.fa');

		//deactivate options on click
		$parent.find('li').off("click");

		/* progresso da barra */
		barr += 20;
		/*** */

		//check for .correct class
		//if yes
		if ($(this).hasClass('correct')) {/* Função perguntas certas e erradas */
			//add .correctAnswer class
			$(this).addClass('correctAnswer');
			//find next span and change icon
			$span.removeClass('fa fa-square-o').addClass('fa fa-check-square-o');
			//reduce opacity of siblings
			$(this).siblings().addClass('fade');
			//show answer
			var $answerReveal = $parent.next('.answerReveal').show();
			var $toShowCorrect = $answerReveal.find('.quizzAnswerC');
			var $toShowFalse = $answerReveal.find('.quizzAnswerF');
			$toShowCorrect.show();
			$toShowFalse.remove();
			//add 1 to total score
			$totalScore += 1;
			//console.log($totalScore);
			var cabAcertou = "acertou"
			/********************/
			correta += 1;
			/************ */
			var soundID = "bonus";
			function loadSound() {
				createjs.Sound.registerSound("bonus.mp3", soundID);
			}
			/*loadSound();*/
			function playSound() {
				createjs.Sound.play(soundID);
			}
			/*playSound();*/

			/************* */
			$("#myBar").css("background", "green");
			/***********/
			$("#myBar").width(60);

			/* Barra de progresso */
			p += 30
			proGress(p, "green")
			$("#c").css("color", "green")
			$("#c").css("border-color", "green")
			$("#c").css("display", "block")


			var certa = correta - 1;
			if (correta > certa && cont == 1) {
				ac = '1, ';
				pontos += 10
				document.getElementById("pontos").style.display = 'block';
				document.getElementById("pontos").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*********************************/
				/*$("#myBar").width(barr +10);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr + 10);
				document.getElementById("bar").innerHTML = "10%"
				/****************/
				$("#b").width(barr + 10);
				$("#b").css("background", "blue");
				/********** */
			}
			if (correta > certa && cont == 2) {
				bc = '2, ';
				pontos += 10
				document.getElementById("pontos1").style.display = 'block';
				document.getElementById("pontos1").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "20%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 3) {
				cc = '3, ';
				pontos += 10
				document.getElementById("pontos2").style.display = 'block';
				document.getElementById("pontos2").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				$("#myBar").width(barr);
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				/*$("#bar").width(barr);*/
				document.getElementById("bar").innerHTML = "30%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 4) {
				dc = '4, ';
				pontos += 10
				document.getElementById("pontos3").style.display = 'block';
				document.getElementById("pontos3").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "40%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 5) {
				ec = '5, ';
				pontos += 10
				document.getElementById("pontos4").style.display = 'block';
				document.getElementById("pontos4").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "50%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 6) {
				fc = '6, ';
				pontos += 10
				document.getElementById("pontos5").style.display = 'block';
				document.getElementById("pontos5").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "60%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 7) {
				gc = '7, ';
				pontos += 10
				document.getElementById("pontos6").style.display = 'block';
				document.getElementById("pontos6").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "70%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 8) {
				hc = '8, ';
				pontos += 10
				document.getElementById("pontos7").style.display = 'block';
				document.getElementById("pontos7").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "80%"
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 9) {
				ic = '9, ';
				pontos += 10
				document.getElementById("pontos8").style.display = 'block';
				document.getElementById("pontos8").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "90%"
				/****************/
				$("#b").width(barr + 10);
				$("#b").css("background", "blue");
			}
			if (correta > certa && cont == 10) {
				jc = ' 10';
				pontos += 10
				document.getElementById("pontos9").style.display = 'block';
				document.getElementById("pontos9").innerHTML = "Você ganhou " + pontos + " pontos!"
				playSound();
				/*$("#myBar").width(barr+10);*/
				document.getElementById("myBar").innerHTML = "" + pontos + " <b>Pontos</b>"
				$("#bar").width(barr + 10);
				document.getElementById("bar").innerHTML = "100%"
				/****************/
				$("#b").width(barr + 10);
				$("#b").css("background", "blue");
			}// final do if 
			setTimeout(function () {
				var div = $(".pontos");
				div.animate({ height: '105px', opacity: '0.4' }, "slow");
				div.animate({ width: '175px', opacity: '0.8' }, "slow");
				div.animate({ height: '95px', opacity: '0.4' }, "slow");
				div.animate({ width: '160px', opacity: '0.8' }, "slow");
			}, 1200);
			/********************************************************************************** */
		} else {
			//add .wrongAnswer class
			$(this).addClass('wrongAnswer').addClass('fade');
			//change icon
			$span.removeClass('fa fa-square-o').addClass('fa fa-check-square-o');
			//reduce opacity of its siblings
			$(this).siblings().addClass('fade');
			//show wrong Message
			var $answerReveal = $parent.next('.answerReveal').show();
			var $toShowCorrect = $answerReveal.find('.quizzAnswerC');
			var $toShowFalse = $answerReveal.find('.quizzAnswerF');
			$toShowCorrect.remove();
			$toShowFalse.show();
			//locate correct answer and highlight
			$parent.find('.correct').addClass('correctAnswer');
			$("#myBar").css("background", "red");
			/***************/
			$("#myBar").width(60);
			/* Barra de progresso */
			p += 35
			proGress(p, "red")
			$("#c").css("color", "red")
			$("#c").css("border-color", "red")
			$("#c").css("display", "block")

			playSound2();

			errada += 1;
			var erro = errada - 1;
			if (erro < errada && flag == 1) {
				/*$("#myBar").width(barr+10);*/
				$("#bar").width(barr + 10);
				$("#myBar").css("background", "red");
				document.getElementById("bar").innerHTML = "10%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				/*****/
				ae = " 1, ";
				$('#pag0').on('click', '#n1', function () { /* FUNCIONA COM CLASSE TAMBÉM */
					desca = ae;
					if (desca == ae) { ae = "" }
				});
				/****************/
				$("#b").width(barr + 10);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 2) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "20%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				be = " 2, ";
				$('#pag1').on('click', '#n2', function () {
					descb = be;
					if (descb == be) { be = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 3) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "30%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				ce = " 3, ";
				$('#pag2').on('click', '#n3', function () {
					descc = ce;
					if (descc == ce) { ce = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 4) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "40%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				de = " 4, ";
				$('#pag3').on('click', '#n4', function () {
					descd = de;
					if (descd == ce) { de = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 5) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "50%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				ee = " 5, ";
				$('#pag4').on('click', '#n5', function () {
					desce = ee;
					if (desce == ce) { ee = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 6) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "60%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				fe = " 6, ";
				$('#pag5').on('click', '#n6', function () {
					descf = fe;
					if (descf == ce) { fe = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 7) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "70%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				ge = " 7, ";
				$('#pag6').on('click', '#n7', function () {
					descg = ge;
					if (descg == ce) { ge = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 8) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "80%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				he = " 8, ";
				$('#pag7').on('click', '#n8', function () {
					desch = he;
					if (descd == he) { he = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 9) {
				/*$("#myBar").width(barr);*/
				$("#bar").width(barr);
				document.getElementById("bar").innerHTML = "90%"
				document.getElementById("myBar").innerHTML = "" + pontos + " Pontos"
				ie = " 9, ";
				$('#pag8').on('click', '#n9', function () {
					desci = ie;
					if (desci == ce) { ie = "" }
				});
				/****************/
				$("#b").width(barr);
				$("#b").css("background", "blue");
			}
			if (erro < errada && flag == 10) {
				/*$("#myBar").width(barr+10);*/
				$("#bar").width(barr + 10);
				document.getElementById("bar").innerHTML = "100%"
				document.getElementById("myBar").innerHTML = "<b>Pontos: </b>" + pontos + ""
				document.getElementById("myBar").innerHTML = "" + pontos + ""
				je = "10";
				$('.absolute').on('click', '#n10', function () {
					descj = je;
					if (descj == je) { je == "" }
				});
				/****************/
				$("#b").width(barr + 10);
				$("#b").css("background", "blue");
			}
		};// Final do else
	});//final da função perguntas certas e erradas
	//print Results
	function printResult() {
		var resultText = '<p style="color: #800000; font-size:larger;">';
		if ($totalScore === $questionNumber) {
			resultText += 'Você acertou ' + $totalScore + ' de um total de  ' + $questionNumber + ' perguntas ! </p>';
			$('.resultContainer').append(resultText);
			$('#halfText').append('<p style="color: #00008B">parabens Voçe conhece muito sobre risco</p>');
		} else if ($totalScore >= 5 && $totalScore < $questionNumber) {
			resultText += 'Você acertou ' + $totalScore + ' de um total de ' + $questionNumber + ' perguntas! </p>';
			$('.resultContainer').append(resultText);
			$('#halfText').append('<p style="color: #00008B">Parabéns continue melhorando!</p>')
		} else if ($totalScore < 5) {
			resultText += 'Você acertou ' + $totalScore + ' de um total de ' + $questionNumber + ' perguntas! </p>';
			$('.resultContainer').append(resultText);
			$('#halfText').append('<p style="color: #00008B">Tente refazer os testes com mais calma.</p>');
		}
	};//Final da função result - resultado final 
	//final score
	$('.absolute').click(function () {
		setTimeout(function () {
			document.getElementById('pag9').style.display = 'none';
		}, 4000);
		/************************************ */
		setTimeout(function () {
			document.getElementById('final').style.display = 'block';
		}, 1000);
	});
	$('.absolute').last().click(function () {
		//prevent further clicks on this
		$(this).off('click');
		//show result after last li is clicked
		var $height = $('.finalResult').height();
		printResult();
		$('.finalResult').show();
		/*$('html, body').animate({
			scrollTop: $(document).height() - $height
		},
			15000);*/
		function email() {
			/*perguntasTotal = a + "-" + b + "-" + c + "-" + d + "-" + e + "-" + f + "-" + g + "-" + h + "-" + i + "-" + j + "";*/
			totalCertas = ac + "" + bc + "" + cc + "" + dc + "" + ec + "" + fc + "" + gc + "" + hc + "" + ic + "" + jc + "";
			totalErradas = ae + "" + be + "" + ce + "" + de + "" + ee + "" + fe + "" + ge + "" + he + "" + ie + "" + je + "";
			desc = desca + "" + descb + "" + descc + "" + descd + "" + desce + "" + descf + "" + descg + "" + desch + "" + desci + "" + descj + "";
			pontos = parseInt($totalScore) * 10;
			alert("teste usuario" + user);
			usuario = "" + user + "";
		}//final da função email 
		email();
		desc = desca + descb + descc + descd + desce + descf + descg + desch + desci + descj + "";


		/*
		(function(){
			emailjs.init("user_qceEfEnVdgQKZo6PSLsmD");
		})();
		*/
		/*		function SendMail1() {
					var templateParams = {
						"user": usuario,
						"TotalErrada": errada,
						"TotalCertas": correta,
						"Pontos": pontos,
						"Certas": totalCertas,
						"Erradas": totalErradas,
						"Desconhecidas": desc,
					};*/
		/* Principal */
		/*	emailjs.send('gmail', 'vander', templateParams)
				.then(function (response) {
					alert('Concluído!', response.status, response.text);
				}, function (error) {
					var texto = alert('Falhou o primeiro...', error);
					alert(texto);
				});
		}

		var send1 = SendMail1();

		alert(send1);

		function SendMail2() {
			if (send1 == undefined) {
				(function () {
					emailjs.init("user_ZSU6j56Fb2Nuyr0WkHCkq");
				})();

				var templateParams = {
					"user": usuario,
					"TotalErrada": errada,
					"TotalCertas": correta,
					"Pontos": pontos,
					"Certas": totalCertas,
					"Erradas": totalErradas,
					"Desconhecidas": desc
				};
				emailjs.send('gmail', 'vander', templateParams)
					.then(function (response) {
						alert('The End!', response.status, response.text);
					}, function (error) {
						alert('Falhou o segundo...', error);
					});
			}*//* if */

		/*	}
			SendMail2();
			alert(SendMail2());*/


	});// fim da função click
}); //end dom ready - fim do dom 




