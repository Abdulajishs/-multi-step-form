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
    else if (input.type === 'number' && !(/^\d{10}$/).test(input.value.trim())) {
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

// step-1 to step-2
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

//  step-2 to step-1
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

// Toggling form monthly to yearly and vice-versa
let monthlyPlan = document.getElementById('monthlyPlan');
let yearlyPlan = document.getElementById('yearlyPlan');
let monthlyAddon = document.getElementById('add-ons-plans-monthly');
let yearlyAddon = document.getElementById('add-ons-plans-yearly');

let toggleSlide = document.getElementById('toggle-slide');
let toggle = document.getElementById('toggleBtn');

yearlyPlan.classList.add("hidden")
yearlyAddon.classList.add("hidden")

toggle.addEventListener('click', (event) => {
    event.preventDefault();

    monthlyPlan.classList.toggle('hidden')
    yearlyPlan.classList.toggle('hidden')

    monthlyAddon.classList.toggle('hidden')
    yearlyAddon.classList.toggle('hidden')

    toggleSlide.classList.toggle('translate-x-5');

    resetSummary()
    resetData()
    
})



// Selecting plans
let plans = document.querySelectorAll(".plan");

let selectedPlan = null;
let summarySlectedPlan = document.getElementById('slectedPlans');

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
        console.log(selectedPlan.querySelector('p').textContent);

        selectedPlan = selectedPlan.dataset
    })
})


// step2 to step3

let step3 = document.getElementById('step-3')

let step3Content = document.getElementById("step3Content");
let addOnForm = document.getElementById("addons-form");


step2Content.addEventListener('submit', (event) => {
    event.preventDefault();

    if (selectedPlan) {
        step2.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
        step2.classList.add('bg-transparent', 'text-white')

        step3.classList.remove('bg-transparent', 'text-white')
        step3.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

        step2Content.classList.add('hidden');
        step3Content.classList.remove('hidden')
        console.log('plan selected successfully.');

    } else {
        alert('Select any one plan')
    }

})

// Selecting  Add-ons

let addOnPlans = document.querySelectorAll('.addon-plan');
let selectedAddons = null;
let selectedAddonsData = []

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

        selectedAddons = event.target.closest('.addon-plan');

        console.log(selectedAddons.dataset)
        if (checkbox.checked && !selectedAddonsData.includes(selectedAddons.dataset)) {
            selectedAddonsData.push(selectedAddons.dataset)
            console.log(selectedAddonsData)
        } else if (!checkbox.checked && selectedAddonsData.includes(selectedAddons.dataset)) {
            let index = selectedAddonsData.indexOf(selectedAddons.dataset);
            selectedAddonsData.splice(index, 1)
        }
    });
});


// back to select plan
let backToSelectPlan = document.getElementById("backToSelectPlan");

backToSelectPlan.addEventListener('click', (event) => {
    event.preventDefault();
    step2Content.classList.remove('hidden');
    step3Content.classList.add('hidden');

    step2.classList.remove('bg-transparent', 'text-white')
    step2.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

    step3.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
    step3.classList.add('bg-transparent', 'text-white')
})


// step 3 to step4
let step4 = document.getElementById('step-4')

let step4Content = document.getElementById("step4Content");

let planSummaryName = document.getElementById("planSummaryName");
let planSummaryPrice = document.getElementById("planSummaryPrice");

let addOnName = document.getElementById("add-ons-name");
let addOnPrice = document.getElementById("add-ons-price");

let total = 0;
let totalPrice = document.getElementById("totalAmount");
let totalPeriod = document.getElementById("totalPeriod");

step3Content.addEventListener('submit', (event) => {
    event.preventDefault();

    if (selectedAddons) {
        step3.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
        step3.classList.add('bg-transparent', 'text-white')

        step4.classList.remove('bg-transparent', 'text-white')
        step4.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

        step3Content.classList.add('hidden');
        step4Content.classList.remove('hidden')

        console.log('Add-ons selected successfully.');

    } else {
        alert('Select any one plan')
    }
    console.log(selectedPlan);

    totalPeriod.textContent = ""

    // ADD SUMMARY Details
    planSummaryName.innerHTML = `<p class="text-blue-900 font-medium">${selectedPlan.plan}(${selectedPlan.period})</p>`
    if (selectedPlan.period === 'Monthly') {
        planSummaryPrice.innerHTML = `<p class="text-blue-900 font-medium">$${selectedPlan.price}/mo</p>`
        total += Number(selectedPlan.price)
        totalPeriod.textContent += "Total(per month)"
    } else {
        planSummaryPrice.innerHTML = `<p class="text-blue-900 font-medium">$${selectedPlan.price}/yr</p>`
        total += Number(selectedPlan.price)
        totalPeriod.textContent += "Total(per year)"
    }

    selectedAddonsData.forEach((data) => {
        if(data.addonsperiod === "Monthly"){
            addOnName.innerHTML += `<p class="text-gray-400 font-normal mb-5">${data.addonsname}</p>`
            addOnPrice.innerHTML += `<p class="text-blue-800 font-normal mb-5">+$${data.addonsprice}/mo</p>`
            total += Number(data.addonsprice)
        }else{
            addOnName.innerHTML += `<p class="text-gray-400 font-normal mb-5">${data.addonsname}</p>`
            addOnPrice.innerHTML += `<p class="text-blue-800 font-normal mb-5">+$${data.addonsprice}/yr</p>`
            total += Number(data.addonsprice)
        }
    })

    totalAmount.textContent = `+$${total}/mo`
})

// Resetting Summary

function resetSummary() {
    // Resetting data
    // selectedPlan = null;
    total = 0;
    // Clear the summary section
    planSummaryName.textContent = '';
    planSummaryPrice.textContent = '';
    addOnName.innerHTML = '';
    addOnPrice.innerHTML = '';
    totalAmount.textContent = 0;
}

function resetData() {
    selectedAddonsData = [];
    selectedPlan = null;

    document.querySelectorAll('.addon-plan').forEach(addon => {
        addon.classList.remove('border-blue-700', 'bg-blue-100');
        addon.classList.add('border-gray-300');
        addon.querySelector('input[type="checkbox"]').checked = false;
    });

    document.querySelectorAll(`#monthlyPlan .plan, #yearlyPlan .plan`).forEach(plan => {
        plan.classList.remove('border-blue-700', 'bg-blue-100');
        plan.classList.add('border-gray-300');
    });
}

// Change Plan

let changePlan = document.getElementById("changePlan");

changePlan.addEventListener("click", () => {
    step4.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
    step4.classList.add('bg-transparent', 'text-white')

    step2.classList.remove('bg-transparent', 'text-white')
    step2.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

    step4Content.classList.add('hidden');
    step2Content.classList.remove('hidden');

    resetSummary();

    console.log('Try to change plans.');
})

// back to Addon plans step
let backToAddons = document.getElementById("backToAddons");

backToAddons.addEventListener('click', (event) => {
    event.preventDefault();
    step3Content.classList.remove('hidden');
    step4Content.classList.add('hidden');

    step3.classList.remove('bg-transparent', 'text-white')
    step3.classList.add('bg-[hsl(228,100%,84%)]', 'text-black')

    step4.classList.remove('bg-[hsl(228,100%,84%)]', 'text-black')
    step4.classList.add('bg-transparent', 'text-white')

    // Clear the summary section
    total = 0;
    planSummaryName.textContent = '';
    planSummaryPrice.textContent = '';
    addOnName.innerHTML = '';
    addOnPrice.innerHTML = '';
    totalAmount.textContent = 0;
})


// step4 to step5
let mainContainer = document.getElementById('main');
let step5Content = document.getElementById("step5Content")
step5Content.classList.add('hidden')
step4Content.addEventListener("submit",(event)=>{
    event.preventDefault();

    mainContainer.classList.add('md:w-[80%]', 'lg:w-[60%]')

    step4Content.classList.add('hidden');
    step5Content.classList.remove('hidden');
})
