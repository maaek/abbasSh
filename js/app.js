//when document ready
$(document).ready(function() {
	// links hover effects
	$('.navbar-nav .nav-item').hover(
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
		let navbarContainer = $('.navbar');
		//change navbar background on scroll
		if (this.pageYOffset >= navbarContainer.height()) {
			navbarContainer.css('backgroundColor', '#1b262c');
		} else if (this.pageYOffset < navbarContainer.height()) {
			navbarContainer.css('backgroundColor', '');
			navbarContainer.css(
				'backgroundImage',
				'linear-gradient(#1b262c, #1b262cb8, #1b262c70, #1b262c40, #1b262c21, #1b262c00)'
			);
		}

		//adding and remove active class from navbar links
		$('.section').each(function() {
			if ($(window).scrollTop() > $(this).offset().top - $('.navbar').height() - 1) {
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
				scrollTop: $('#' + $(this).data('scroll')).offset().top - $('.navbar').height()
			},
			1000
		);
		$('.navbar').css('backgroundColor', '#1b262c');
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
	let randomBgOption = true;

	let randomBgInterval;
	function randomizeBg() {
		if (randomBgOption == true) {
			randomBgInterval = setInterval(function() {
				//randomNumber from 0-9
				let randomNum = Math.floor(Math.random() * 10);

				$('.landing-page').css('backgroundImage', `url(css/imgs/header-${randomNum}.jpg)`);
			}, 10000);
		}
	}
	randomizeBg();

	//animate skills on scroll
	$(window).scroll(function() {
		$('.section').each(function() {
			if ($(window).scrollTop() > $(this).offset().top - $('.navbar').height() - 1) {
				let sectionId = $(this).attr('id');
				if (sectionId == 'skills') {
					$('.skill').each(function(index, element) {
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

	let delay = 5000;
	switching();
	setInterval(function() {
		switching();
	}, 23000);

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

	//animate.css on scroll
	$(window).scroll(function() {
		$('.section').each(function() {
			let scrollBottom = $(window).scrollTop() + $(window).height();
			if (scrollBottom > $(this).offset().top) {
				let sectionId = $(this).attr('id');
				if (sectionId == 'about') {
					$(this).find('h1').addClass('animate__animated animate__bounceInLeft animate__delay-2s');
					$(this).find('p').addClass('animate__animated animate__fadeInRight animate__delay-2s');
				} else if (sectionId == 'skills') {
					$(this).find('h1').addClass('animate__animated animate__bounceInLeft animate__delay-2s');
				} else if (sectionId == 'projects') {
					$(this).find('h1').addClass('animate__animated animate__bounceInLeft animate__delay-2s');
				} else if (sectionId == 'projects-anmate-left') {
					$(this).addClass('animate__animated animate__fadeInLeft animate__delay-2s');
				} else if (sectionId == 'projects-anmate-right') {
					$(this).addClass('animate__animated animate__fadeInRight animate__delay-2s');
				} else if (sectionId == 'contactˇ') {
					$(this).find('h1').addClass('animate__animated animate__bounceInLeft animate__delay-2s');
					$(this).find('.container').addClass('animate__animated animate__fadeInRight animate__delay-2s');
				}
			}
		});
	});

	// Settings box
	$('.settings-box .toggle-settings').on('click', function() {
		$(this).find('.fa-gear').toggleClass('fa-spin');

		if (!$(this).hasClass('open')) {
			$('.settings-box').animate(
				{
					left: '0px'
				},
				10
			);
		} else {
			$('.settings-box').animate(
				{
					left: '-226px'
				},
				10
			);
		}

		$(this).toggleClass('open');
	});

	$('.settings-box .toggle-settings').blur(function() {
		$('.settings-box').animate(
			{
				left: '-226px'
			},
			10
		);
	});

	//Seting local storage for main color storage
	let storageColor = localStorage.getItem('main-color');

	$(':root').css('--main-color', storageColor);

	$('.colors-list li').each(function() {
		if ($(this).data('color') == storageColor) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	//Seting local storage for main color storage

	//Change main color on click
	$('.colors-list li').each(function() {
		$(this).click(function() {
			$(this).addClass('active').siblings().removeClass('active');
			$(':root').css('--main-color', $(this).data('color'));

			localStorage.setItem('main-color', $(this).data('color'));
		});
	});
	//Change main color on click

	//Seting local storage for random Bg
	let randomBg = localStorage.getItem('randomBg');

	$('.option-box .random-background span').each(function() {
		if (randomBg == 'true') {
			randomizeBg();
			$(this).parent().find('.yes').addClass('active').siblings().removeClass('active');
		} else if (randomBg == 'false') {
			clearInterval(randomBgInterval);
			$(this).parent().find('.no').addClass('active').siblings().removeClass('active');
		}
	});
	//Seting local storage for random Bg

	//Change random bg option on click
	$('.option-box .random-background span').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');

		if ($(this).data('background') == 'yes') {
			localStorage.setItem('randomBg', true);
			randomBgOption == true;
			randomizeBg();
		} else if ($(this).data('background') == 'no') {
			localStorage.setItem('randomBg', false);
			randomBgOption == false;
			clearInterval(randomBgInterval);
		}
	});
	//Change random bg option on click

	//Seting local storage for navbar option Bg
	let navOption = localStorage.getItem('navOption');
	$('.option-box .navbar-option span').each(function() {
		if (navOption == 'true') {
			$('.navbar').addClass('fixed-top');
			$(this).parent().find('.yes').addClass('active').siblings().removeClass('active');
		} else if (navOption == 'false') {
			$('.navbar').removeClass('fixed-top');
			$(this).parent().find('.no').addClass('active').siblings().removeClass('active');
		}
	});
	//Seting local storage for navbar option

	//Change navbar option on click
	$('.option-box .navbar-option span').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');

		if ($(this).data('fixed') == 'yes') {
			localStorage.setItem('navOption', true);
			$('.navbar').addClass('fixed-top');
		} else if ($(this).data('fixed') == 'no') {
			localStorage.setItem('navOption', false);
			$('.navbar').removeClass('fixed-top');
		}
	});
	//Change navbar option on click

	//reset all settings box options

	$('.settings-container .reset-option').on('click', function() {
		$('.colors-list li').eq(0).click();
		$('.option-box .random-background .yes').click();
		$('.option-box .navbar-option .yes').click();
	});
});

//adding and remove active class from navbar
$('.navbar-toggler').click(function() {
	$('.navbar-toggler').toggleClass('active-navbar');
});

$(window).on('load', function() {
	$('.loading-screen').fadeOut();
});
