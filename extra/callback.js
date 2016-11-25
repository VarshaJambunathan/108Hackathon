function trycall() {
	f1( function() {
		f2();
	});
	
	console.log("outside f1");
}

function f1(callback) {
	console.log("f1 is called");
	callback();
}

function f2() {
	console.log("f2 is called");
}