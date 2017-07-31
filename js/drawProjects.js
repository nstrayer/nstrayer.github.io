import * as d3 from 'd3';

// function to draw projects section.
function drawProjects(projData) {
  d3
    .select('#projectsDiv')
    .selectAll('.project')
    .data(projData)
    .enter()
    .append('div')
    .attr('class', function(d, i) {
      return i == 0 ? 'row' : 'row project';
    })
    .each(function(proj) {
      // draw picture
      let pic = d3
        .select(this)
        .append('div')
        .attr('class', 'col-xs-12 col-sm-6 text-center');

      pic
        .append('a')
        .attr('href', proj.link)
        .append('img')
        .attr('class', 'projectPic')
        .attr('src', proj.photo);

      // generate the title and descriptions
      let projDescrip = d3
        .select(this) // make the holder.
        .append('div')
        .attr('class', 'col-xs-12 col-sm-6');

      projDescrip
        .append('strong') // append the title.
        .attr('class', 'projectTitle')
        .append('a')
        .attr('href', proj.link)
        .attr('target', '_blank')
        .text(proj.title);

      projDescrip
        .append('ul') // append the description bullet point list
        .selectAll('li')
        .data(proj.descriptions)
        .enter()
        .append('li')
        .html(function(d) {
          return d;
        });

      if (proj.github != null) {
        projDescrip
          .select('ul') // append github repo to end of list
          .append('li')
          .append('a')
          .attr('href', proj.github)
          .text('Github repo.');
      }
    });
}

module.exports = drawProjects;
