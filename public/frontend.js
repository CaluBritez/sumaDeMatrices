function crearMatriz() {
    //TOMAR DATOS FILAS-COLUMNAS
    let filas = parseInt(document.getElementById("cantFilas").value);
    let columnas = parseInt(document.getElementById("cantColumnas").value);

    // Obtener el contenedor en el HTML
    let cajaMatriz1 = document.getElementById("cajaMatriz1")
    cajaMatriz1.innerHTML = '';
    let titulo1 = document.createElement('h3');
    titulo1.innerHTML = 'Matriz 1';
    cajaMatriz1.appendChild(titulo1);

    let cajaMatriz2 = document.getElementById("cajaMatriz2")
    cajaMatriz2.innerHTML = '';
    let titulo2 = document.createElement('h3');
    titulo2.innerHTML = 'Matriz 2';
    cajaMatriz2.appendChild(titulo2);

    let matriz1 = [];
    let matriz2 = [];

    for (let i = 0; i < filas; i++) {
        let fila1 = []; let fila2 = [];

        for (let j = 0; j < columnas; j++) {
            let input1 = document.createElement('input');
            input1.setAttribute('type', 'number');
            input1.setAttribute('id', 'inputNumber');
            cajaMatriz1.appendChild(input1); // Agregar input al contenedor
            fila1.push(input1);

            let input2 = document.createElement('input');
            input2.setAttribute('type', 'number');
            input2.setAttribute('id', 'inputNumber');
            cajaMatriz2.appendChild(input2);
            fila2.push(input2);
            
        }

        matriz1.push(fila1);
        matriz2.push(fila2);
        cajaMatriz1.appendChild(document.createElement('br')); // Salto de línea
        cajaMatriz2.appendChild(document.createElement('br'));
    }

    let botonSumar = document.getElementById("botonSumar");
    botonSumar.innerHTML = '';
    botonSumar.innerHTML = '<button type="submit">Sumar Matrices</button>';
}
function mostrarMatrizEnHTML(matriz, idContenedor) {
    let contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = '';

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            let input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.value = matriz[i][j];
            input.disabled = true; // Desactivar input para que el usuario no pueda modificar el resultado
            contenedor.appendChild(input);
        }
        contenedor.appendChild(document.createElement('br')); // Salto de línea
    }
}
function obtenerMatrizDesdeHTML(idContenedor) {
    let contenedor = document.getElementById(idContenedor);
    let matriz = [];
    let inputs = contenedor.getElementsByTagName("input");

    let rowCount = parseInt(document.getElementById("cantFilas").value); // Obtener el número de filas
    let colCount = parseInt(document.getElementById("cantColumnas").value); // Obtener el número de columnas

    let inputIndex = 0;
    for (let i = 0; i < rowCount; i++) {
        let fila = [];
        for (let j = 0; j < colCount; j++) {
            fila.push(inputs[inputIndex].value);
            inputIndex++;
        }
        matriz.push(fila);
    }
    return matriz;
}



document.getElementById('matricesForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let matriz1 = obtenerMatrizDesdeHTML("cajaMatriz1");
    let matriz2 = obtenerMatrizDesdeHTML("cajaMatriz2");
    console.log(matriz1, matriz2);
    
    fetch('/sumar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(resultado => {
        mostrarMatrizEnHTML(resultado, 'cajaResultado');
    });
});