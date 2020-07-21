//when document ready

$(document).ready(function() {
	// links hover effects
	$('.navbar .nav-item').hover(
		function() {
			$(this).find('span').animate(
				{
					width: '100%'
				},
				300
			);
		},
		function() {
			$(this).find('span').animate(
				{
					width: '0'
				},
				300
			);
		}
	);

	//header text typing
	$('.header-text').each(function() {
		let headerH1 = $(this).find('h1'),
			h1Text = headerH1.data('text'),
			h1Text2 = headerH1.data('text2'),
			h1TextLength = h1Text.length,
			h1TextLength2 = h1Text2.length;

		let headerPara = $(this).find('p'),
			paraText = headerPara.data('text'),
			paraText2 = headerPara.data('text2'),
			paraTextLength = paraText.length,
			paraTextLength2 = paraText2.length;

		//start typing
		startTyping();
		//start typing with the interval
		setInterval(function() {
			startTyping();
		}, 8000);

		function startTyping() {
			headerH1
				.queue(function() {
					typingText(headerH1, h1Text, h1TextLength);
					typingText(headerPara, paraText, paraTextLength);
					$(this).dequeue();
				})
				.delay(3000)
				.queue(function() {
					headerH1.html('');
					headerPara.html('');
					$(this).dequeue();
				})
				.queue(function() {
					typingText(headerH1, h1Text2, h1TextLength2);
					typingText(headerPara, paraText2, paraTextLength2);
					$(this).dequeue();
				});
		}
	});

	//initalizing type by intarvel
	function typingText(selector, text, textLength) {
		selector.html('');
		let n = 0,
			intervalName = setInterval(function() {
				selector.each(function() {
					$(this).find('.cursor').remove();
					$(this).html($(this).html() + text[n]);
					let cursor = '<span class="cursor">|</span>';
					$(this).append(cursor);
				});

				n++;

				if (n === textLength) {
					selector.each(function() {
						$(this).find('.cursor').remove();
					});
					clearInterval(intervalName);
				}
			}, 70);
	}

	//random background

	setInterval(function() {
		//randomNumber from 0-9
		let randomNum = Math.floor(Math.random() * 10);

		$('.header').css('backgroundImage', `url(css/imgs/header-${randomNum}.jpg)`);
	}, 10000);
});
