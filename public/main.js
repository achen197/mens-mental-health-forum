//chat stuff
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

$('.message-box').on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I\'m Jake, what\'s your name?',
  'Nice to meet you. How are you feeling today?',
  'Oh that\'s no good',
  'It was nice talking to you! Cya',
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
