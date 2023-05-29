let name;
let lastName;
let option = 0;
let taxes = 0;
let summary = 0;
const order = [];
const orderObj = {};
const uniquekeys = [];

const option1 = {
    id: 1,
    nombre: "Sandwich de pavo",
    precio: 10,
    tax: {
        taxId: "IVA",
        amount: 1.6
    }
}

const option2 = {
    id: 2,
    nombre: "Sandwich de atun",
    precio: 15,
    tax: {
        taxId: "IVA",
        amount: 2.4
    }
}

const option3 = {
    id: 3,
    nombre: "Hamburguesa",
    precio: 20,
    tax: {
        taxId: "IVA",
        amount: 3.2
    }
}

const option4 = {
    id: 4,
    nombre: "Pizza",
    precio: 25,
    tax: {
        taxId: "IVA",
        amount: 4
    }
}

const option5 = {
    id: 5,
    nombre: "Pollo Adobado",
    precio: 30,
    tax: {
        taxId: "IVA",
        amount: 4.8
    }
}

const option6 = {
    id: 6,
    nombre: "Filete Rib Eye",
    precio: 40,
    tax: {
        taxId: "IVA",
        amount: 6.4
    }
}

function saludo(){
    name = prompt(`Restaurante Tres Guerras:
Por favor ingrese su nombre(s):`);
    lastName = prompt(`Restaurante Tres Guerras:
Por favor ingrese su apellido:`);
    if(name != '' && lastName != ''){
        alert(`Bienvenido ${name} ${lastName} a continuacion le mostramos el menú de la casa.`);
    }else{
        alert("Nombre y/o Apellido Invalido, capture nuevamente");
        saludo();
        
    }
}

function createOrder (){
    option = Number(prompt (`Menú
    1.Sandwich de pavo........$15.00
    2.Sandwich de atun........$10.00
    3.Hamburguesa ............$30.00
    4.Pizza...................$50.00
    5.Pollo Adobado...........$45.00
    6.Filete Rib Eye..........$70.00
    Seleccione un option o presione 8 para cancelar orden
    El precio de los options NO incluye IVA`));
    switch (option) {
        case 1:
            alert(`El platillo seleccionado fue ${option1.nombre}`);
            order.push(option1);
            console.log(order)
        break;
        case 2:
            alert(`El platillo seleccionado fue ${option2.nombre}`);
            order.push(option2);
            console.log(order)    
        break;
        case 3:
            alert(`El platillo seleccionado fue ${option3.nombre}`);
            order.push(option3);
            console.log(order)
        break;
        case 4:
            alert(`El platillo seleccionado fue ${option4.nombre}`);
            order.push(option4);
            console.log(order)
        break;
        case 5:
            alert(`El platillo seleccionado fue ${option5.nombre}`);
            order.push(option5);
            console.log(order)
        break;
        case 6:
            alert(`El platillo seleccionado fue ${option6.nombre}`);
            order.push(option6);
            console.log(order)
        break;
    }
    
}

function getTaxes(){
    orderTaxes = order
    .map((item) => {
        return item.tax.amount;
    })
    .reduce((sum, item) => {
        return sum = sum + item;
    })
    taxes = orderTaxes;
}

function getOrderTotal(){
    total = order
    .map((item) => {
        return item.precio;
    })
    .reduce((tot, item) => {
        return tot = tot + item; 
    })
    summary = total;
}


saludo();

while (option <= 1){
    createOrder();
    if(option === 8) {
        alert(`Lo sentimos, vuelva pronto`)
        break;
    }else if(isNaN(option) || option < 1 || option > 7){
        alert("Ningun option valido, intente de nuevo")
    }else{
        option = Number(prompt(`¿Desea añadir un nuevo option?
    1.Si
    2.No`))
    };
}
    getTaxes();
    getOrderTotal();
    orderObj.nombre = name;
    orderObj.apellido = lastName;
    orderObj.platillos = order
    .map(item => item.nombre)
    .reduce((acc, nombre) => {
        if(acc[nombre]){
            acc[nombre] = acc[nombre] + 1;
        }else{
            acc[nombre] = 1;
        }
        return acc;
    }, {});
    orderObj.taxes = taxes;
    orderObj.summaryItem = summary; 
    orderObj.total = summary + taxes; 
    
console.log(`La orden del cliente es`);
console.log(orderObj)

alert(`Ticket de la Orden:
Nombre del cliente: ${orderObj.nombre} ${orderObj.apellido}
Precio: ${orderObj.summaryItem}
IVA: ${orderObj.taxes}
TOTAL: ${orderObj.total}`)



