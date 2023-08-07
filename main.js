function createItem(nombre, precio, color, tamaño) {
  return {
    nombre: nombre,
    precio: precio,
    color: color,
    tamaño: tamaño,
  };
}

function mostrarCarrito(carrito) {
  let total = 0;
  alert("Carrito de compras:");
  carrito.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nombre} - $${item.precio}`);
    total += item.precio;
  });
  alert(`Total: $${total}`);
}

function pagar(total) {
  const pago = parseFloat(
    prompt(`Total a pagar: $${total}\nIngrese el monto con el que desea pagar:`)
  );
  if (isNaN(pago) || pago < total) {
    alert(
      "El monto ingresado no es válido. Debe ser igual o mayor al total de la compra."
    );
    return false;
  } else {
    const cambio = pago - total;
    alert(`¡Pago realizado con éxito!\nCambio: $${cambio}`);
    return true;
  }
}

const articulos = [
  createItem("Camisa", 25, "Azul", "M"),
  createItem("Pantalón", 40, "Negro", "L"),
  createItem("Championes", 35, "Blanco", "42"),
  createItem("Gorro", 15, "Rojo", "Único"),
];

function buscarArticulosPorColorOTamaño(articulos, propiedad, valor) {
  return articulos.filter(
    (item) => item[propiedad].toLowerCase() === valor.toLowerCase()
  );
}

function tienda() {
  const carrito = [];
  let seguirComprando = true;

  while (seguirComprando) {
    const opcion = parseInt(
      prompt(
        "Bienvenido a la tienda de ropa.\n" +
          "Seleccione una opción:\n" +
          "1. Ver artículos disponibles\n" +
          "2. Agregar artículo al carrito\n" +
          "3. Ver carrito de compras\n" +
          "4. Buscar artículos por color o tamaño\n" +
          "5. Pagar y salir\n"
      )
    );

    switch (opcion) {
      case 1:
        alert("Artículos disponibles:");
        articulos.forEach((item, index) => {
          alert(`${index + 1}. ${item.nombre} - $${item.precio}`);
        });
        break;

      case 2:
        const articuloSeleccionado = parseInt(
          prompt("Ingrese el número del artículo que desea agregar al carrito:")
        );
        if (
          isNaN(articuloSeleccionado) ||
          articuloSeleccionado < 1 ||
          articuloSeleccionado > articulos.length
        ) {
          alert("Opción inválida. Ingrese un número válido de artículo.");
        } else {
          carrito.push(articulos[articuloSeleccionado - 1]);
          alert(
            `${articulos[articuloSeleccionado - 1].nombre} agregado al carrito.`
          );
        }
        break;

      case 3:
        mostrarCarrito(carrito);
        break;

      case 4:
        const tipoBusqueda = prompt(
          "Ingrese 'color' o 'tamaño' para buscar artículos:"
        );
        const valorBusqueda = prompt("Ingrese el valor de búsqueda:");
        const resultados = buscarArticulosPorColorOTamaño(
          articulos,
          tipoBusqueda,
          valorBusqueda
        );
        if (resultados.length === 0) {
          alert(
            "No se encontraron artículos con el criterio de búsqueda especificado."
          );
        } else {
          alert("Artículos encontrados:");
          resultados.forEach((item, index) => {
            alert(
              `${index + 1}. ${item.nombre} - ${tipoBusqueda}: ${
                item[tipoBusqueda]
              }`
            );
          });
        }
        break;

      case 5:
        mostrarCarrito(carrito);
        const total = carrito.reduce((acc, item) => acc + item.precio, 0);
        seguirComprando = !pagar(total);
        break;

      default:
        alert("Opción inválida. Por favor, seleccione una opción válida.");
    }
  }

  alert("Gracias por su compra. ¡Vuelva pronto!");
}

tienda();
