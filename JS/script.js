
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data))
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/(${id})`
    console.log(url)
}

const displayLessons = (lessons) => {
    const lavelContinar = document.getElementById('lavel-continar');
    lavelContinar.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})"
   class="border-2 border-blue-600 text-blue-600 px-2 py-1 rounded-md font-semibold transition duration-300 hover:bg-blue-500 hover:text-white">
   <i class="fa-solid fa-question font-bold"></i><span class="font-bold">lesson - ${lesson.level_no}</span></button>
    `
    lavelContinar.append(btnDiv);
    }
}
loadLessons()