fetch('/v2/movie/in_theaters')
.then(response => response.json())
.then(data => console.log(data));

new Promise(function(yes, no) {
    yes()
})
.then(function() {
    console.log('成了')
})

console.log([1,2,3,4].includes(1))