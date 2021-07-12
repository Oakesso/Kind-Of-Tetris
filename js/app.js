document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const height = 20;
    const grid = document.querySelector('.grid'); 
    // get all div(s) in an array with "Array.from".
    let squares = Array.from(document.querySelectorAll('.grid div'));

    console.log(squares);
})

