

async function cargarXML() {
 // funcion que recoge el XML y lo muestra en la tabla
    let listaDeRecetas =
    for (i = 0; i < listaDeRecetas; i++) {
        try {
            let receta = listaDeRecetas[i]

        }catch(e) {
            console.error("Error al cargar XML");
        }
    }
}

async function leerXML(){
//funcion que lee el XML y lo convierte a JSON tras validacion

    let api = await fetch("./data/recetas.xml")
    let respuesta = await api.text()

    let parser = new DOMParser();
    let documentoXML = parser.parseFromString(respuesta, "application/xml")


    let arrayJson = []

    for (let i = 0; documentoXML.length > i; i++) {
        let elemento = documentoXML[i]

        let objeto = {
            codigo : elemento.getAttribute("codigo"),
            nombre : elemento.querySelector("nombre"),
            categoria: elemento.querySelector("categoria"),
            tiempo : Number(elemento.querySelector("tiempo")),
            dificultad: Number(elemento.querySelector("dificultad")),
        }

        arrayJson.push(objeto)
    }
    return arrayJson
}