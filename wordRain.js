$(function () {
	var canvas = document.getElementById('canvas'),
		   ctx = canvas.getContext('2d');
		
	var correct = 0,
		   wrong = 0,
	       missed = 0;
	var h = 550,
		  w = 700;
	var characters = [];
	var s = 1;

	ctx.font="40px Century Gothic";
	ctx.fillStyle="#333";

	setTimeout (function () {
		$('.modal').fadeOut(1000);

		init();

		$(document).on('keypress', function (key) {     //keypress当按钮被按下时，会发生该事件。
			var c = String.fromCharCode(key.charCode);
			var err = 1;

			_.each(characters, function (obj, i) {
				if (c == obj.letter) {
					correct += 1;
					updateStat('correct', correct);
					characters[i] = new Character();
					err = 0;
				} 			
			});

			if (err == 1) {
				wrong += 1;
				updateStat('wrong', wrong);
			}

			if (correct % 10 == 0) {
				s += 1;
				for (var i = 0; i < 5; i++) {
					characters.push(new Character());
				}
			}
		});

	}, 2500);
	
	//定義遊戲失敗的顯示狀況
	function failModal () {
		var decimal = (correct / (correct + wrong + missed)*100);
		var percent = Math.round((decimal)*Math.pow(10,2))/Math.pow(10,2)    //round()方法傳回四捨五入， pow() 方法可返回 x 的 y 次幂的值。
		$('.modal h1').text('Game Over');
		$('.modal h2').text('');
		if (wrong == 1) {
			$('#second').text('You got ' + correct + ' right with ' + wrong + ' error.');
		} else { 
			$('#second').text('You got ' + correct + ' right with ' + wrong + ' errors.');
		}
		$('#first').text(percent + '%').addClass('score');
		$('.modal').append('<a href="https://lance90.github.io/wordRain/wordRain.html">Try Again?</a>');

		$('.modal').show();
	}
	
	//定義遊戲開始
	function init() {
		for (var i = 0; i < 10; i++) {
			characters.push(new Character());    //在characters的矩陣中添加新的Character()元素
		}
		drawChars();
	};
	
	//定義造字的屬性
	function Character() {
		this.x = Math.random() * 600 + 50;   //設定字體落下的橫軸位置
		this.y = 40;
		this.letter = String.fromCharCode(randomInt(33, 126));   //fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。
		this.speed = Math.random() * s;
	};
	//定義把字放上canvas
	function drawChars() {
		ctx.clearRect(0,0,w,h);    //clearRect() 方法删除一个画布的矩形区域。
		_.each(characters, function (c, i) {    //運行特定each內指定的元素
			ctx.fillText(c.letter, c.x, c.y);    //使用 fillText()，在画布上写文本
			
			if (c.y + c.speed > h + 40) {
				missed += 1;
				updateStat('missed', missed);
				characters[i] = new Character();
			}
			c.y += c.speed;
		});
		//設定遊戲失敗
		if (missed >= 1) {
			ctx.clearRect(0,0,w,h);
			failModal();
		} else {
			setTimeout(drawChars, 20);
		}
	};
	//更新遊戲狀況
	function updateStat(id, stat) {
		$('#' + id).text(id + ': ' + stat);
	};

});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};