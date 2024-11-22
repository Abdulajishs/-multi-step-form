let inputs = document.querySelectorAll('input');

function validateInput(input) {

    let errorSpan = document.getElementById(`${input.id}-error-span`);
    // console.log(errorSpan)

    errorSpan.classList.add('hidden');
    input.classList.remove('border-red-700');
    input.classList.add('border-gray-300');

    if (input.type === 'text' && input.value.trim() === '') {
        errorSpan.classList.remove('hidden')
        input.classList.remove('border-gray-300');
        input.classList.add('border-red-700');

        return false
    } else if (input.type === 'email' && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()))) {
        errorSpan.classList.remove('hidden')
        input.classList.remove('border-gray-300');
        input.classList.add('border-red-700');

        return false
    }
    else if (input.type === 'number' && input.value.trim().length < 10) {
        errorSpan.classList.remove('hidden')
        input.classList.remove('border-gray-300');
        input.classList.add('border-red-700');

        return false
    }

    return true
}

for (let input of inputs) {
    input.addEventListener('input', () => {
        validateInput(input)
    })
}

let step1Content = document.querySelector('#auth-form');
let step1 = document.getElementById('step-1')
let step2 = document.getElementById('step-2')

let step2Content = document.getElementById("step2Content")

step1Content.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true

    inputs.forEach((input) => {
        if (!validateInput(input)) {
            isValid = false
        }
    })

    // console.log(isValid);

    if (isValid) {
        step1.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
        step1.classList.add('bg-transparent', 'text-white')

        step2.classList.remove('bg-transparent', 'text-white')
        step2.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

        step1Content.classList.add('hidden')
        step2Content.classList.remove('hidden')
        console.log('Form submitted successfully')
    }
})


let backToInfo = document.getElementById('backToInfo');

backToInfo.addEventListener('click', (event) => {
    event.preventDefault();
    step1Content.classList.remove('hidden');
    step2Content.classList.add('hidden');

    step1.classList.remove('bg-transparent', 'text-white')
    step1.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

    step2.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
    step2.classList.add('bg-transparent', 'text-white')
})

let monthlyPlan = document.getElementById('monthlyPlan');
let yearlyPlan = document.getElementById('yearlyPlan');
let toggleSlide = document.getElementById('toggle-slide');
let toggle = document.getElementById('toggleBtn');

yearlyPlan.classList.add("hidden")

toggle.addEventListener('click', (event) => {
    event.preventDefault();

    monthlyPlan.classList.toggle('hidden')
    yearlyPlan.classList.toggle('hidden')

    toggleSlide.classList.toggle('translate-x-5');
})



