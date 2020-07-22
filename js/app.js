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

	//change navbar background color when clicking on navbar-toggler
	$('.navbar-container').hover(
		function() {
			$(this).css('backgroundColor', '#1b262c');
		},
		function() {
			$(this).css('backgroundColor', '');
		}
	);

	//change navbar background on scroll
	$(window).on('scroll', function() {
		let navbarContainer = $('.navbar-container');

		if (this.pageYOffset >= navbarContainer.height()) {
			navbarContainer.css('backgroundColor', '#1b262c');
		} else if (this.pageYOffset < navbarContainer.height()) {
			navbarContainer.css('backgroundColor', '');
			navbarContainer.css(
				'backgroundImage',
				'linear-gradient(#1b262c, #1b262cb8, #1b262c70, #1b262c40, #1b262c21, #1b262c00)'
			);
		}
	});

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

		function startTyping() {
			headerH1
				.queue(function() {
					typingText(headerH1, h1Text, h1TextLength);
					typingText(headerPara, paraText, paraTextLength);
					$(this).dequeue();
				})
				.delay(4000)
				.queue(function() {
					deleteTyping(headerH1);
					deleteTyping(headerPara);
					$(this).dequeue();
				})
				.delay(1000)
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
					//blinking curser after each statment
					blinkingCursor();
					function blinkingCursor() {
						$('.cursor').fadeOut(300, function() {
							$(this).fadeIn(300);
							blinkingCursor();
						});
					}
					clearInterval(intervalName);
				}
			}, 50);
	}

	function deleteTyping(selector) {
		let afterTypeTextLength = $(selector).text().length;
		let afterTypeText = $(selector).text();
		let deletingInterval = setInterval(function() {
			$(selector).html(afterTypeText.substr(0, afterTypeTextLength) + '<span class="cursor">|</span>');

			afterTypeTextLength--;

			if (afterTypeTextLength < 0) {
				clearInterval(deletingInterval);
				$('.cursor').remove();
			}
		}, 50);
	}

	//random background
	setInterval(function() {
		//randomNumber from 0-9
		let randomNum = Math.floor(Math.random() * 10);

		$('.header').css('backgroundImage', `url(css/imgs/header-${randomNum}.jpg)`);
	}, 10000);
});
