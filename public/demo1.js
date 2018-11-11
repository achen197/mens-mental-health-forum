Letters = function() {
  this.lettersDOM = null;
  this.active = null;
  this.letters = [];
  this.alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","i","u","v","w","x","y","z","~","&","|","^","ç","@","]","[","{","}","ù","*","µ","¤","$","£","€","°",")","(","+","-","/","<",">","²","`","é","è","1","2","3","4","5","6","7","8","9","0"
  ];

  return this;
};

Letters.prototype.init = function( word ) {

  this.lettersDOM = document.querySelectorAll('.letter');
  this.active = true;
  var i;
  var nextChar;
  var lettersMax = this.lettersDOM.length;

  for ( i = 0; i < this.lettersDOM.length; i++ ) {

    if ( word.charAt( i ) != "" )
      nextChar = word.charAt( i );
    else
      nextChar = false;

    this.letters.push( new Letter( this.lettersDOM[ i ],  nextChar ) );

  }

  if ( word.length > lettersMax ) {

    var wordContainer = document.getElementById("word");

    for ( i = lettersMax; i < word.length; i++ ) {
      var letterSpan = document.createElement('span');
      letterSpan.innerHTML = "";
      letterSpan.classList.add('letter');
      wordContainer.appendChild( letterSpan );
      this.letters.push( new Letter( letterSpan,  word.charAt( i ) ) );
    }
  }

  this.animate();

  return this;

};

Letters.prototype.animate = function() {
  var i;
  var random;
  var char;

  if ( this.active ) {

    window.requestAnimationFrame( this.animate.bind(this) );

    var indexes = [];

    for ( i = 0; i < this.letters.length; i++ ) {

      var current = this.letters[ i ];

      if ( !current.isDead ) {
        random = Math.floor(Math.random() * (this.alphabet.length - 0));
        char = this.alphabet[ random ];
        current.render( char );
      } else {
        indexes.push( i );
      }
    }

    for ( i = 0; i < indexes.length; i++ ) {
      this.letters.splice( indexes[ i ], 1 );
    }

    if ( this.letters.length == 0 ) {
      this.stop();
    }
  }
};

Letters.prototype.start = function( word ) {
  this.init( word );
};

Letters.prototype.stop = function() {
  this.active = false;
};

Letter = function( DOMElement, nextChar ) {

  var scope = this;

  this.DOMEl = DOMElement;
  this.char = DOMElement.innerHTML;
  this.next = nextChar;
  this.speed = Math.floor(Math.random() * (500 - 10) );
  this.total = 0;
  this.duration = 1000;
  this.animating = true;
  this.isDead = false;

  this.timer = setInterval(function() {
    if ( scope.animating === true ) {
      scope.total += scope.speed;
    }
    scope.animating = !scope.animating;
  }, this.speed);

  this.animate();

  return this;

};

Letter.prototype.animate = function() {
  var i;
  var random;

  if ( !this.isDead ) {
    window.requestAnimationFrame( this.animate.bind(this) );
  }


  if ( this.total < this.duration ) {

    if ( this.animating ) {
      this.DOMEl.innerHTML = this.char;
    }

  } else {
    this.isDead = true;

    if ( !this.next ) {
      var parent = document.getElementById('word');
      console.log("Parent:", this.DOMEl.firstChild)
      parent.removeChild( this.DOMEl );
      return;
    }

    this.DOMEl.innerHTML = this.next;
  }
};

Letter.prototype.render = function( char ) {

  if ( !this.animating ) {
    this.char = char;
  }

};

var word = [ "ANXIETY", "DEPRESSION", "SUICIDE", "LET'S TALK" ];
var nextWord = 1;

var letters = new Letters();

setTimeout( function() {

  letters.start( word[ nextWord ] );

  setInterval(function() {
    nextWord++;
    if ( nextWord >= word.length )
      nextWord = 0;

    letters.start( word[ nextWord ] );
  }, 8000);

}, 2000);

//counter
var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});

//sad cloud

const happy = document.getElementById('happy')
const sad = document.getElementById('sad')
const cloud = document.querySelector('.cloud')
const mouth = document.querySelector('.mouth')
const radio = document.querySelector('.fake-radio')

window.onscroll = function() {makeSad()};

function makeSad() {
    if (document.body.scrollTop > 1300 || document.documentElement.scrollTop > 1400) {
      cloud.classList.remove('is-happy')
      cloud.classList.add('is-sad')
      mouth.setAttribute('d', 'M95 72 C 95 72, 105 72, 105 72')
    } else {
      cloud.classList.remove('is-sad')
      cloud.classList.add('is-happy')
      mouth.setAttribute('d', 'M92 70 C 95 75, 105 75, 107 70')
    }
}
