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

	//scroll effects
	$(window).scroll(function() {
		let navbarContainer = $('.navbar-container');
		//change navbar background on scroll
		if (this.pageYOffset >= navbarContainer.height()) {
			navbarContainer.css('backgroundColor', '#1b262c');

			//change navbar background color when clicking on navbar-toggler
			$('.navbar-container').hover(function() {
				$(this).css('backgroundColor', '#1b262c');
			});
		} else if (this.pageYOffset < navbarContainer.height()) {
			navbarContainer.css('backgroundColor', '');
			navbarContainer.css(
				'backgroundImage',
				'linear-gradient(#1b262c, #1b262cb8, #1b262c70, #1b262c40, #1b262c21, #1b262c00)'
			);
		}

		//adding and remove activ class from navbar links

		$('.section').each(function() {
			if ($(window).scrollTop() > $(this).offset().top - $('.navbar-container').height() - 1) {
				let sectionId = $(this).attr('id');
				$(`.nav-link[data-scroll="${sectionId}"]`)
					.addClass('active')
					.parent()
					.siblings()
					.find('.nav-link')
					.removeClass('active');
			}
		});
	});

	//scroll to section on clicking navbar link

	$('.nav-link').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').parent().siblings().find('.nav-link').removeClass('active');

		$('html, body').animate(
			{
				scrollTop: $('#' + $(this).data('scroll')).offset().top - $('.navbar-container').height()
			},
			1000
		);
		$('.navbar-container').css('backgroundColor', '#1b262c');
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

	//animate skills on scroll
	$(window).scroll(function() {
		$('.section').each(function() {
			if ($(window).scrollTop() > $(this).offset().top - $('.navbar-container').height() - 1) {
				let sectionId = $(this).attr('id');
				if (sectionId == 'skills') {
					$('.skill').each(function(index, element) {
						console.log(element);

						$(element).find('.fill-in').animate(
							{
								width: $(element).find('.persentege').text()
							},
							1000
						);
					});
				}
			}
		});
	});

	//Shuffle skills
	let zIndexValue = 0;

	let delay = 3000;
	switching();
	setInterval(function() {
		switching();
	}, 21000);

	function switching() {
		$('.shafel-skills img').each(function() {
			$(this)
				.delay(delay)
				.animate(
					{
						left: '20%',
						marginTop: 30
					},
					400,
					function() {
						zIndexValue--;
						$(this).css('z-index', zIndexValue);
					}
				)
				.animate(
					{
						left: '6%',
						marginTop: 0
					},
					400
				);
			delay += 3000;
		});
		delay = 0;
	}
});
