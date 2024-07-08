$OBJ = {
	'win' : $(window),
	'doc' : $(document),
	'html' : $('html')
}

function winW(){//창 너비
	return $OBJ.win.width();
}

function winH(){// 창 높이
	return $OBJ.win.height();
}

function winSh(){// 스크롤 값
	return $OBJ.win.scrollTop();
}

var head = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#header');
		var gnb = a.find('a');
		var mnu = a.find('.mnu');
		var close = a.find('.close');

		function headFix(){
			if(winSh() > 20){
				$OBJ.html.addClass('headFix');
			}else{
				$OBJ.html.removeClass('headFix');
			}
		}

		$OBJ.win.on('load scroll',function(){
			headFix();
		});

		gnb.on('click',function(){
			var go = $(this).attr('href');
			if(winW() > 1024){
				move = -100;
			}else{
				move = -52;
			}
			$.scrollTo($(go),500,{offset:{top:move}});
			$OBJ.html.removeClass('navOn');
			return false;
		});

		mnu.on('click',function(){
			$OBJ.html.addClass('navOn');
		});

		close.on('click',function(){
			$OBJ.html.removeClass('navOn');
		});
	}
};

var rev = {
	init : function(){
		this.action();
	},
	action : function(){
		var hanSwiper = new Swiper('#rev .swiper-container', {
			slidesPerView: 3,
			spaceBetween: 22,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '#rev .next',
				prevEl: '#rev .prev',
			},
			breakpoints: {
				1024: {
					slidesPerView: 1,
					spaceBetween: 20,
				}
			}
		});
	}
};

var pop = {
	init : function(){
		this.action();
	},
	action : function(){
		$('._pop').on('click',function(){
			var go = $(this).attr('href');
			$(go).fadeIn(300);
			return false;
		});
		$('._close').on('click',function(){
			$(this).closest('.__pop').fadeOut(300);
		});
	}
};

var scr = {
	init : function(){
		if($('._scr').length > 0){
			this.action();
		}
	},
	action : function(){
		var main = $('._scr');//스크롤 영역
		var win = $(window);
		var scrNum = 0;//스크롤 넘버
		var solh = [];//스크롤 높이 배열
		var aniNum = [];//애니메이션 한 번 하면 멈추게 배열 생성
		var sh = win.scrollTop();

		function motionArea(){//스크롤 영역 계산
			for (i=0;i<main.length;i++){
				if(sh >= solh[i]){
					scrNum = i;
					if(aniNum[i]==0){
						aniNum[i]=1;
					}
				}
			}
			motion(scrNum);//모션실행
		}

		function motion(i){//스크롤 영역 안의 모션
			$('.gnb li').eq(i).addClass('active').siblings().removeClass('active');
		}

		main.each(function(i){
			aniNum[i] = 0;//애니메이션 한 번 하면 멈추게 배열 생성
		});

		win.on('load',function(){
			main.each(function(i){
				solh[i] = parseInt(main.eq(i).offset().top - (win.height() - win.height()/3)); // 각 모션 영역 높이값 설정
			});
			sh = win.scrollTop();

			motionArea();

			win.on({
				'scroll' : function(){
					sh = $(this).scrollTop();
					motionArea();
				}
			});
		});

	}
}


$OBJ.doc.ready(function(){
	head.init();
	rev.init();
	pop.init();
	scr.init();
});

$OBJ.win.on('load',function(){
	AOS.init({
		duration:500
	});
});