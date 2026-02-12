const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
   return htmlElements.join(" ");
};


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data))
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");

    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn)
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
};

const displayWordDetails = (word) => {
    const deteilsBox = document.getElementById('deteils-continar');
    deteilsBox.innerHTML = `
     <div>
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
                <p>${word.meaning}</p>
                </div>
                <div>
                <h2 class="font-bold">Example</h2>
                <div>
                <p>${word.sentence}</p>
                <h2 class="font-bold">Synonym</h2>
                <div class="">${createElements(word.synonyms)}</div>
                </div>     
             </div>
    `
    document.getElementById("my_modal").showModal();
};

const displayLevelWord = (words) => {
    const wordContinar = document.getElementById('word-continar');
    wordContinar.innerHTML = "";

    if (words.length == 0) {
        wordContinar.innerHTML = `
            <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
            </div>
       `;
        return;
    }

    words.forEach(word => {
        // console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${word.word}</h2>
                <p class="font-semibold">Meaning/ pronounciation</p>
                <div class="text-2xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>
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
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"
   class="border-2 border-blue-600 text-blue-600 px-2 py-1 rounded-md font-semibold transition duration-300 hover:bg-blue-500 hover:text-white lesson-btn">
   <i class="fa-solid fa-book-open font-bold"></i><span class="font-bold">lesson - ${lesson.level_no}</span></button>
    `
        lavelContinar.append(btnDiv);
    }
}
loadLessons()