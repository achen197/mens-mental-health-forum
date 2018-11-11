//smooth scrolling
$(document).ready(function(){
  $(".cta-btn-outline").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    }
  });
});

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
