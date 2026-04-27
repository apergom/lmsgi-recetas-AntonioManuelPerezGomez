let datosXMLGuardados=[]
const botonCargarRecetas = document.getElementById("botonCargarRecetas")
let cajaXML = document.getElementById("table")

botonCargarRecetas.addEventListener("click",cargarXML)


async function cargarXML(){
    try {
        datosXMLGuardados=await leerXML()
        for(let i=0;i<datosXMLGuardados.length;i++){
            let receta = datosXMLGuardados[i]
            let filaTabla = cajaXML.createElement("tbody")
            filaTabla.innerHTML =
                `<tr>
                <td>
                    <p>${receta.nombre}</p>
                </td>
                <td>
                    <p>${receta.categoria.add("badge")}</p>
                </td>
                <td>
                    <p>${receta.tiempo}</p>
                </td>
                <td>
                    <p>${receta.dificultad}</p>
                </td>
            </tr>
            `
            cajaXML.appendChild(filaTabla)
        }

    }
    catch(err){

        console.error(err)
    }
}

async function leerXML(){
//funcion que lee el XML y lo convierte a JSON tras validacion

    let api = await fetch("./data/recetas.xml")
    let respuesta = await api.text()

    let parser = new DOMParser();
    let documentoXML = parser.parseFromString(respuesta, "application/xml")


    let arrayJson = []

    for (let i = 0; documentoXML.length > i; i++){
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