const maxPrice = 10;
const maxTime = 10000;
const employeeTime = 7000;

const getRandNum = max => (
    1 + Math.floor(Math.random() * max)
);

const loseGame = msg => {
    alert(msg);
    alert("Your pencil business has failed.");
    location.reload();
}

// business
let fundsNum = 100;
let pencilsNum = 0;
let pencilInventoryNum = 0;
let pricePerPencilNum = 1;
let consumerDemandRate = getRandNum(100);
let consumerDemandDelay = 100 - consumerDemandRate;

const updateDemandRate = maxTime => {
    setTimeout(() => {
        consumerDemandRate = getRandNum(100);
        consumerDemandDelay = 100 - consumerDemandRate;
        consumerDemand.innerHTML = consumerDemandRate;
        updateDemandRate(maxTime);
    }, getRandNum(maxTime));
}

const pencils = document.querySelector('#pencils');
const funds = document.querySelector('#funds');
const pencilInventory = document.querySelector('#inventory');
const pricePerPencil = document.querySelector('#price-per-pencil');
const consumerDemand = document.querySelector('#consumer-demand');

pencils.innerHTML = pencilsNum;
funds.innerHTML = fundsNum;
inventory.innerHTML = pencilInventoryNum;
pricePerPencil.innerHTML = pricePerPencilNum;
consumerDemand.innerHTML = consumerDemandRate;

// buttons
const makePencilBtn = document.querySelector('#make-pencil');
const lowerPrice = document.querySelector('#lower-price');
const raisePrice = document.querySelector('#raise-price');

// button controls

const makePencil = () => {
    if (leadInventoryNum > 0 && woodInventoryNum > 0 && eraserInventoryNum > 0) {
        pencilsNum++;
        pencilInventoryNum++;
        leadInventoryNum--;
        woodInventoryNum--;
        eraserInventoryNum--;
        pencils.innerHTML = pencilsNum;
        pencilInventory.innerHTML = pencilInventoryNum;
        leadInventory.innerHTML = leadInventoryNum;
        woodInventory.innerHTML = woodInventoryNum;
        eraserInventory.innerHTML = eraserInventoryNum;
    }
}

makePencilBtn.addEventListener('click', makePencil);

lowerPrice.addEventListener('click', () => {
    pricePerPencilNum--;
    pricePerPencil.innerHTML = pricePerPencilNum;
});

raisePrice.addEventListener('click', () => {
    pricePerPencilNum++;
    pricePerPencil.innerHTML = pricePerPencilNum;
});

//manufacturing

let leadPriceNum = getRandNum(maxPrice);
let woodPriceNum = getRandNum(maxPrice);
let eraserPriceNum = getRandNum(maxPrice);
let leadInventoryNum = 0;
let woodInventoryNum = 0;
let eraserInventoryNum = 0;
let employeeNum = 0;
let wageNum = 1;

const leadInventory = document.querySelector('#lead');
const woodInventory = document.querySelector('#wood');
const eraserInventory = document.querySelector('#eraser');

const leadPrice = document.querySelector('#lead-price');
const woodPrice = document.querySelector('#wood-price');
const eraserPrice = document.querySelector('#eraser-price');
const employees = document.querySelector('#employee-count');
const wage = document.querySelector('#wage');

//buttons
const buyLead = document.querySelector('#buy-lead');
const buyWood = document.querySelector('#buy-wood');
const buyEraser = document.querySelector('#buy-eraser');
const hire = document.querySelector('#hire');
const fire = document.querySelector('#fire');

// button controls
buyLead.addEventListener('click', () => {
    if (fundsNum >= leadPriceNum) {
        leadInventoryNum++;
        fundsNum -= leadPriceNum;
        funds.innerHTML = fundsNum;
        leadInventory.innerHTML = leadInventoryNum;
    } else loseGame('Insufficient Funds!');
});

buyWood.addEventListener('click', () => {
    if (fundsNum >= woodPriceNum) {
        woodInventoryNum++;
        fundsNum -= woodPriceNum;
        funds.innerHTML = fundsNum;
        woodInventory.innerHTML = woodInventoryNum;
    } else loseGame('Insufficient Funds!');
});

buyEraser.addEventListener('click', () => {
    if (fundsNum >= eraserPriceNum) {
        eraserInventoryNum++;
        fundsNum -= eraserPriceNum;
        funds.innerHTML = fundsNum;
        eraserInventory.innerHTML = eraserInventoryNum;
    } else loseGame('Insufficient Funds!');
});

hire.addEventListener('click', () => {
    if (fundsNum >= wageNum) {
        employeeNum++;
        employees.innerHTML = employeeNum;
    } else loseGame('Insufficient Funds!');
});

fire.addEventListener('click', () => {
    if (employeeNum) {
        employeeNum--;
        employees.innerHTML = employeeNum;
    } else alert('No employees!');
});

leadInventory.innerHTML = leadInventoryNum;
woodInventory.innerHTML = woodInventoryNum;
eraserInventory.innerHTML = eraserInventoryNum;

leadPrice.innerHTML = leadPriceNum;
woodPrice.innerHTML = woodPriceNum;
eraserPrice.innerHTML = eraserPriceNum;
employees.innerHTML = employeeNum;
wage.innerHTML = wageNum;

const updateLeadPrice = (maxPrice, maxTime) => {
    setTimeout(() => {
        leadPriceNum = getRandNum(maxPrice);
        leadPrice.innerHTML = leadPriceNum;
        updateLeadPrice(maxPrice, maxTime);
    }, getRandNum(maxTime));
};

const updateWoodPrice = (maxPrice, maxTime) => {
    setTimeout(() => {
        woodPriceNum = getRandNum(maxPrice);
        woodPrice.innerHTML = woodPriceNum;
        updateWoodPrice(maxPrice, maxTime);
    }, getRandNum(maxTime));
};

const updateEraserPrice = (maxPrice, maxTime) => {
    setTimeout(() => {
        eraserPriceNum = getRandNum(maxPrice);
        eraserPrice.innerHTML = eraserPriceNum;
        updateEraserPrice(maxPrice, maxTime);
    }, getRandNum(maxTime));
};

const purchasePencil = () => {
    pencilInventoryNum--;
    fundsNum += pricePerPencilNum;
    funds.innerHTML = fundsNum;
};

const updatePencilMarket = () => {
    setTimeout(() => {
        if (pencilInventoryNum) {
            console.log('update pencil market');
            pencilInventoryNum--;
            fundsNum += pricePerPencilNum;
            funds.innerHTML = fundsNum;
            pencilInventory.innerHTML = pencilInventoryNum;
        }
        updatePencilMarket();
    }, 100 * consumerDemandDelay);
};

const updateEmployee = () => {
    setInterval(() => {
        if (leadInventoryNum && woodInventoryNum && eraserInventoryNum && employeeNum) {
            for (let i = 0; i < employeeNum; i++)
                makePencil();   
        }
        updateEmployee();
    }, 5 * getRandNum(employeeTime));
};

const updateEmployeePay = () => {
    setInterval(() => {
        if (employeeNum) {
            if (fundsNum > wageNum * employeeNum) {
                fundsNum -= wageNum * employeeNum;
                funds.innerHTML = fundsNum;
                wage.innerHTML = wageNum;
            } else loseGame('Insufficient Funds!');
        }
    }, employeeTime);
};

// function calls
const main = () => {
    updateDemandRate(maxTime);
    updateLeadPrice(maxPrice, maxTime);
    updateWoodPrice(maxPrice, maxTime);
    updateEraserPrice(maxPrice, maxTime);
    updatePencilMarket();
    updateEmployeePay();
    updateEmployee();
};

main();