function homeLoadFadeIn() {
	$('.fadein').fadeIn(1000);
	console.log('should fade in')
}

function activeNav() {
	
	$('body').on('click', '.create-cta, .nav-create', () => {
		$('.nav-create').addClass('active')
		if($('.nav-community').hasClass('active')) {
			$('.nav-community').toggleClass('active')
		}
		if($('.nav-my-smoothies').hasClass('active')) {
			$('.nav-my-smoothies').toggleClass('active')
		}
	});

	$('body').on('click', '.view-all-cta, .nav-community', () => {
		$('.nav-community').addClass('active')
		if($('.nav-create').hasClass('active')) {
			$('.nav-create').toggleClass('active')
		}
		if($('.nav-my-smoothies').hasClass('active')) {
			$('.nav-my-smoothies').toggleClass('active')
		}
	});
	
	$('body').on('click', '.save-cta, .nav-my-smoothies', () => {
		$('.nav-my-smoothies').addClass('active')
		if($('.nav-community').hasClass('active')) {
			$('.nav-community').toggleClass('active')
		}
		if($('.nav-create').hasClass('active')) {
			$('.nav-create').toggleClass('active')
		}
	});
}

function mobileUserRegisterLogin() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').on('click', '.register, .login, .loginQuestion, .registerQuestion', (event) => {
			$('.wrapper').css('display', 'none');
		});
		$('body').on('click', '.closebutton > div', event => {
			$('.wrapper').show();
		});
	}
}

$(mobileUserRegisterLogin);
$(activeNav);
$(homeLoadFadeIn);