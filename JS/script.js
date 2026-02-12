
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data))
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data =>displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContinar = document.getElementById('word-continar');
    wordContinar.innerHTML = "";

    words.forEach(word => {
        console.log(word);

        const card = document.createElement("div");
        card.innerHTML= `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${word.word}</h2>
                <p class="font-semibold">Meaning/ pronounciation</p>
                <div class="text-2xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContinar.append(card);
    });
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