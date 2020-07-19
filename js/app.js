//local storge for the color
let mainColor = localStorage.getItem('color_option');

//if color in local storge not = to null
if (mainColor !== null) {
	//seting the saved color to the main color
	document.documentElement.style.setProperty('--main-color', mainColor);

	//chnging the color border
	const colorLi = document.querySelectorAll('.colors-list li');
	//looping the list
	colorLi.forEach((li) => {
		//removing the border from other colors not selected
		li.classList.remove('active');
		//if the color is the selected one
		if (li.dataset.color == mainColor) {
			//adding the border to the color that selected
			li.classList.add('active');
		}
	});
}

//varibale for checking if random background is needed
let randomBgOption = true;
//for setting the interval to be cleared
let randomBgInterval;

//local storge for random bg option
let bgItem = localStorage.getItem('background_option');

//if bgItem in local storge not = to null
if (bgItem !== null) {
	if (bgItem === 'true') {
		randomBgOption = true;
	} else {
		randomBgOption = false;
	}

	//removing the active class from the option
	document.querySelectorAll('.random-background span').forEach((span) => {
		span.classList.remove('active');
	});

	if (bgItem === 'true') {
		document.querySelector('.random-background .yes').classList.add('active');
	} else {
		document.querySelector('.random-background .no').classList.add('active');
	}
}

//toggle spin class on icon
document.querySelector('.toggle-settings .fa-gear').onclick = function() {
	//spaing the gear when clicked
	this.classList.toggle('fa-spin');

	//displying the setting box
	document.querySelector('.settings-box').classList.toggle('open');
};

//chnging the color
const colorLi = document.querySelectorAll('.colors-list li');
//looping the list
colorLi.forEach((li) => {
	//add propparity when clicked
	li.addEventListener('click', (e) => {
		handelActive(e);

		//chaging the main color when clicked
		document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

		//saving the color to the localstorge
		localStorage.setItem('color_option', e.target.dataset.color);
	});
});

//chnging the background settings
const backgroundOption = document.querySelectorAll('.random-background span');
//looping the background option
backgroundOption.forEach((span) => {
	//add propparity when clicked
	span.addEventListener('click', (e) => {
		handelActive(e);

		//if yes is clicked turn on the rabdom bg else (clicked no) stop rabdom bg
		if (e.target.dataset.background === 'yes') {
			localStorage.setItem('background_option', true);

			randomBgOption = true;

			randomizeBg();
		} else {
			localStorage.setItem('background_option', false);

			randomBgOption = false;

			clearInterval(randomBgInterval);
		}
	});
});

//select landing-page element from the page
let landingPage = document.querySelector('.landing-page');

//creating array for changing the background
let imgsArray = [ '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg' ];

//func for changing the background
function randomizeBg() {
	if (randomBgOption === true) {
		//seting interval for changing the background
		randomBgInterval = setInterval(() => {
			//Generating random number
			let randomNum = Math.floor(Math.random() * imgsArray.length);

			//Changing the background
			landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNum]})`;
		}, 10000);
	}
}
randomizeBg();

//selctior for our skills box
let ourSkills = document.querySelector('.skills');
//animation on scrol
window.onscroll = function() {
	//our skills offset top
	let skillsOffsetTop = ourSkills.offsetTop;

	//outer skills height
	let skillsOuterHight = ourSkills.offsetHeight;

	//window height
	let windowHeight = this.innerHeight;

	//window  scrool top
	let windowScrollTop = this.pageYOffset;

	let allSkills = document.querySelectorAll('.skill-box .skill-progress span');

	if (windowScrollTop + 100 >= skillsOffsetTop + skillsOuterHight - windowHeight) {
		allSkills.forEach((span) => {
			span.style.width = span.dataset.progress;
		});
	} else {
		allSkills.forEach((span) => {
			span.style.width = 0;
		});
	}
};

//creating img popup
let imgsGallery = document.querySelectorAll('.gallery img');

imgsGallery.forEach((img) => {
	img.addEventListener('click', (e) => {
		//creating div for the popup
		let popupOverlay = document.createElement('div');

		//creating class for the popup
		popupOverlay.className = 'popup-overlay';

		//appending the popupp to the body
		document.body.appendChild(popupOverlay);

		//creating img box
		let popupBox = document.createElement('div');

		//creating class for the img box
		popupBox.className = 'popup-box';

		if (img.alt != null) {
			//creating img header
			let imageHeader = document.createElement('h3');

			//adding text to the header
			imageHeader.innerText = img.alt;

			//appending the header to the popup box
			popupBox.appendChild(imageHeader);
		}

		//creating the img tag
		let imgTag = document.createElement('img');

		//adding the src to the img
		imgTag.src = img.src;

		//appending the img to the popup box
		popupBox.appendChild(imgTag);

		//appending the popupp box to the body
		document.body.appendChild(popupBox);

		//creating the span for exiting the popup
		let closeButton = document.createElement('span');

		//adding the claa to the span from font awosome
		closeButton.className = 'close-button';

		closeButton.innerText = 'X';

		//appending the span to the popup box
		popupBox.appendChild(closeButton);
	});
});

//close popup
document.addEventListener('click', function(e) {
	if (e.target.className === 'close-button') {
		//removing popup box
		e.target.parentNode.remove();
		//removing popup overlay
		document.querySelector('.popup-overlay').remove();
	}
});

const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links a');

function goToSections(element) {
	element.forEach((ele) => {
		ele.addEventListener('click', (e) => {
			e.preventDefault();
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
}

goToSections(allBullets);
goToSections(allLinks);

function handelActive(ev) {
	//removing the class active(adding opacity) the buttom
	ev.target.parentElement.querySelectorAll('.active').forEach((element) => {
		element.classList.remove('active');
	});
	//adding the class active(adding opacity) the buttom
	ev.target.classList.add('active');
}

let allBulletsOpttions = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletsShowStorge = localStorage.getItem('bullets_option');

if (bulletsShowStorge !== null) {
	allBulletsOpttions.forEach((span) => {
		span.classList.remove('active');
	});

	if (bulletsShowStorge == 'block') {
		bulletsContainer.style.display = 'block';

		document.querySelector('.bullets-option .yes').classList.add('active');
	} else {
		bulletsContainer.style.display = 'none';

		document.querySelector('.bullets-option .no').classList.add('active');
	}
}

allBulletsOpttions.forEach((span) => {
	span.addEventListener('click', (e) => {
		if (span.dataset.display == 'yes') {
			bulletsContainer.style.display = 'block';

			localStorage.setItem('bullets_option', 'block');
		} else {
			bulletsContainer.style.display = 'none';
			localStorage.setItem('bullets_option', 'none');
		}
		handelActive(e);
	});
});

//reset all setings box option
document.querySelector('.reset-option').onclick = function() {
	localStorage.removeItem('color_option');
	localStorage.removeItem('background_option');
	localStorage.removeItem('bullets_option');

	window.location.reload();
};

let toggleBtn = document.querySelector('.toggle-menu');
let menulinks = document.querySelector('.links');

//showing the menu when clicking on the humergare btn
toggleBtn.addEventListener('click', (e) => {
	e.stopPropagation();

	menulinks.classList.toggle('open');

	toggleBtn.classList.toggle('menu-active');
});

//removing the menu when clicking anywhere on the menu
document.addEventListener('click', (e) => {
	if (e.target != toggleBtn && e.target != menulinks) {
		if (menulinks.classList.contains('open')) {
			menulinks.classList.toggle('open');

			toggleBtn.classList.toggle('menu-active');
		}
	}
});

menulinks.onclick = function(e) {
	e.stopPropagation();
};
