const API_KEY = "NvDNsWrpTXoC91vPL6EvKi6MN0JE7RId";

function consultarPrecioDivisa() {
    if (document.getElementById('txtCantidad').value == "") {
        Swal.fire('', 'ingrese una cantidad a convertir', 'warning');
    } else {
        let iniciales = document.getElementById('cmbOrigen').value;

        let datos = {
            apikey: API_KEY,
            base: iniciales
        };

        let parametros = new URLSearchParams(datos);

        let url = 'https://api.apilayer.com/exchangerates_data/latest?' + parametros;

        fetch(url)
                .then(rawData => {
                    return rawData.json();
                })
                .then(datos => {
                    let precioDivisa = datos.rates[document.getElementById("cmbDestino").value];
                    document.getElementById("txtDivisa").value = precioDivisa;
                    convertirMoneda(precioDivisa);
                });
    }
}

function convertirMoneda(precioDivisa) {
    // guardar los datos que se recibirán desde la api de terceros
    let cantidad = document.getElementById("txtCantidad").value;

    let datosConversion = {
        cantidad: cantidad,
        precioDivisa: precioDivisa
    };

    // Se guardan los parametros de conversión en una variable nueva
    let parametrosConversion = new URLSearchParams(datosConversion);

    // Secrea la URL del servicio
    const baseURL = "/conversorMonetario/conversor_web/web/api/convertir/convertirMoneda";
    const fullURL = `${window.location.origin}${baseURL}?${parametrosConversion}`;


    fetch(fullURL)
            .then(rawData => {
                return rawData.json();
            })
            .then(datos => {
                document.getElementById("txtResultado").value = datos.total;
            });
}

