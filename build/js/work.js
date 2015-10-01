$(document).ready(function () {
	$("#interactive-nav").click(function (e) {
		e.preventDefault();
		$(".visible").removeClass('visible');
		$("nav ul li a").removeClass('active');
		$("#interactive").addClass('visible');
		$("#interactive-nav").addClass('active');
	});
	$("#art-nav").click(function (e) {
		e.preventDefault();
		$(".visible").removeClass('visible');
		$("nav ul li a").removeClass('active');
		$("#art").addClass('visible');
		$("#art-nav").addClass('active');
	});
});