import $ from "jquery";
import 'jquery.localscroll';
import 'jquery.scrollto';
import drawProjects from './drawProjects';
import particleViz from './particleViz';

// add jquery to the window for bootstrap.
window.$ = $;

const introViz = particleViz('#randomWalkCanvas');
introViz.startScene();
drawProjects(proj_data);

$('#resume').scrollTo();
$('#resumeButton').click(function() {
  // var link = $(this);
  let link = $('#buttonText');
  $('#resumeDiv').slideToggle('slow', function() {
    if ($(this).is(':visible')) {
      link.text('Close');
    } else {
      link.text('Expand C.V.');
    }
  });
});

$(document).ready(function() {
  $('.navbar').localScroll({
    duration: 800,
    offset: -60,
    axis: 'y',
  });
});

let isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(
  navigator.userAgent.toLowerCase()
);

if (isMobile) {
  $(document).on('click', '.navbar-brand', function() {
    $('.navbar-collapse').collapse('hide');
  });

  $(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a')) {
      $('.navbar-collapse').collapse('hide');
    }
  });
}
