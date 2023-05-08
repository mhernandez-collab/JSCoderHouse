let nombre = prompt(`Restaurante Tres Guerras:
Por favor ingrese su nombre(s):`);
let apellido = prompt(`Restaurante Tres Guerras:
Por favor ingrese su apellido:`);
let orderTotal = 0;
let option = 0;
let platillo;
let precio;
const plato1 = 'Sandwich de pavo';
const plato2 = 'Sandwich de atun';
const plato3 = 'Hamburguesa';
const plato4 = 'Pizza';
const plato5 = 'Pollo Adobado';
const plato6 = 'Sushi de Salmón';
const plato7 = 'Filete Rib Eye'

saludo();

while (option <= 1){
    getOrderTotal();
    if(platillo === 8) {
        alert(`Lo sentimos, vuelva pronto`)
        break;
    }else if(isNaN(platillo) || platillo < 1 || platillo > 7){
        alert("Ningun platillo valido, intente de nuevo")
    }else{
        option = Number(prompt(`¿Desea añadir un nuevo platillo?
    1.Si
    2.No`))
    };
}

if (orderTotal > 0) {
    alert (`El total de la orden es $${orderTotal}`); 
}



function getOrderTotal() {

platillo = Number(prompt (`Menú
1.Sandwich de pavo........$15.00
2.Sandwich de atun........$10.00
3.Hamburguesa ............$30.00
4.Pizza...................$50.00
5.Pollo Adobado...........$45.00
6.Sushi de Salmón.........$35.00
7.Filete Rib Eye..........$70.00
Seleccione un platillo o presione 8 para cancelar orden
El precio de los platillos NO incluye IVA`));

    switch (platillo) {
        case 1:
            precio = 15 * 1.16;
            console.log(`El platillo seleccionado fue ${plato1} precio mas IVA: $${precio}`);
    break;
        case 2:
            precio = 10 * 1.16;
            console.log(`El platillo seleccionado fue ${plato2} precio mas IVA: $${precio}`);
    break;
        case 3:
            precio = 30 * 1.16;
            console.log(`El platillo seleccionado fue ${plato3} precio mas IVA: $${precio}`);
    break;
        case 4:
            precio = 50 * 1.16;
            console.log(`El platillo seleccionado fue ${plato4} precio mas IVA: $${precio}`);
    break;
        case 5:
            precio = 45 * 1.16;
            console.log(`El platillo seleccionado fue ${plato5} precio mas IVA: $${precio}`);
    break;
        case 6:
            precio = 35 * 1.16;
            console.log(`El platillo seleccionado fue ${plato6} precio mas IVA: $${precio}`);
    break;
        case 7:
            precio = 70 * 1.16;
            console.log(`El platillo seleccionado fue ${plato7} precio mas IVA: $${precio}`);
        break;
    }
orderTotal += precio;
return orderTotal;
}

function saludo(){
    alert(`Bienvenido ${nombre} ${apellido} a continuacion le mostramos el menú de la casa.`);
}




