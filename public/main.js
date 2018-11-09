

///Chat stuff

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hey 👋 I\'m Jake. What\'s your name?',
  'Nice to meet you. How are you feeling today?',
  'Not too bad, thanks',
  'It was good talking to you! Have a good day!',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=29a17c0d14e2ef6c46b93628fa033371&auto=format&fit=crop&w=1000&q=80" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=29a17c0d14e2ef6c46b93628fa033371&auto=format&fit=crop&w=1000&q=80" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}


//world
var land = document.querySelectorAll('.land');
var cloudcounter = document.querySelectorAll('.cloud-counter');



for (var i = 0; i < land.length; i++) {
	land[i].style.transform = 'translate(' + Math.round(Math.random() * 150) + 'px, ' + Math.round(Math.random() * 150) + 'px)';
	land[i].style.width = Math.round(Math.random() * 50) + 50 + 'px';
}

for (var i = 0; i < cloudcounter.length; i++) {
	cloudcounter[i].style.transform = 'translate(' + Math.round(Math.random() * 150) + 'px, ' + Math.round(Math.random() * 150) + 'px)';
	cloudcounter[i].style.width = Math.round(Math.random() * 25) + 25 + 'px';
}


requestAnimationFrame(animate);

function animate() {
	for (var i = 0; i < land.length; i++) {
		move(land[i]);
		move(cloudcounter[i]);
	}

	requestAnimationFrame(animate);
}

function move(el) {
	var s = el.style.transform.split('(')[1].split(',');
	var x = s[0].split('px')[0];
	var y = s[1];
	var w = el.style.width.split('px')[0];

	var nx = parseInt(x) - 1;

	if (nx + parseInt(w) < -20) {
		nx = 170;
	}
	el.style.transform = 'translate(' + nx + 'px, ' + y;
}
