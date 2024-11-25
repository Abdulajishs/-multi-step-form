let inputs = document.querySelectorAll('#auth-form input');

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
        console.log('Auth Form submitted successfully')
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


let plans = document.querySelectorAll(".plan");

let selectedPlan = null;

plans.forEach((plan) => {
    plan.addEventListener('click', (event) => {
        let activeSection = plan.parentElement.id;

        document.querySelectorAll(`#${activeSection} .plan`).forEach((resetPlan) => {
            resetPlan.classList.remove('border-blue-700', 'bg-blue-100');
            resetPlan.classList.add('border-gray-300')
        })

        plan.classList.remove('border-gray-300');
        plan.classList.add('border-blue-700', 'bg-blue-100');

        selectedPlan = event.target.closest('.plan');
        console.log(selectedPlan.dataset);
        console.log(selectedPlan.querySelector('p').textContent)
    })
})
// Selected plans to Add-ons

let step3 = document.getElementById('step-3')

let step3Content = document.getElementById("step3Content");

step2Content.addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log(selectedPlan.querySelector('p').textContent)

    if(selectedPlan){
        step2.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
        step2.classList.add('bg-transparent', 'text-white')

        step3.classList.remove('bg-transparent', 'text-white')
        step3.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

        step2Content.classList.add('hidden');
        step3Content.classList.remove('hidden')
        console.log('plan selected successfully.');
        
    }else{
        alert('Select any one plan')
    }
})


let addOnPlans = document.querySelectorAll('.addon-plan');
let selectedAddons = null;

addOnPlans.forEach((plan) => {
    plan.addEventListener('click', (event) => {

        let checkbox = plan.querySelector('input[type="checkbox"]');
        let isChecked = checkbox.checked;

        // Toggle the checkbox state
        checkbox.checked = !isChecked;

        if (checkbox.checked) {
            plan.classList.remove('border-gray-300');
            plan.classList.add('border-blue-700', 'bg-blue-100');
        } else {
            plan.classList.remove('border-blue-700', 'bg-blue-100');
        }

        selectedPlan = event.target.closest('.addon-plan');

        // console.log(selectedPlan.querySelector('.price').textContent)
    });
});


// backt to select plan

let backToSelectPlan = document.getElementById("backToSelectPlan");

backToSelectPlan.addEventListener('click',(event)=>{
    event.preventDefault();
    step2Content.classList.remove('hidden');
    step3Content.classList.add('hidden');

    step2.classList.remove('bg-transparent', 'text-white')
    step2.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

    step3.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
    step3.classList.add('bg-transparent', 'text-white')
})
