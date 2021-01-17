// window.onload = function () {

//     cuando haces el llamdo de la table debes mandar una configuracion  como el ejemplejo de abajo
//     lo mas importante es enviar el arrayElementos y el id del div
//     printTable(null, arrayElementos, null, 'divTabla'); // si se envia null en la configuracion, se ocupa la por defecto
//     printTable(configuracionTabla, arrayElementos, languague, 'divTabla');
// };


const configuracionTablaDefault = {
    table: {
        configuracionTable: "width '100%' cellpadding: '6' cellspacing='0' id='tblListado' class= 'row-border'",
        thead: {
            class: 'text-center text-table-head border-bottom',
            tr: // un solo TR
            {
                class: '',
                scope: 'col',
                dataSortable: 'true',
            }

        },
        tbody: {
            class: 'text-center text-table border-bottom',
            tr: {
                class: 'border-bottom',
            }
        }
    }
};

const arrayColumnasDefault = [ // aqui puedes poner que quieras de columnas  -- procura que se vea correcto en la pantalla, no sobrecargues los datos
    // la cantidad de columnas debe ser igual al contenido enviado
    {
        titulo: 'ID',
        dataField: 'id',
    },
    {
        titulo: 'Nombre',
        dataField: 'nombre',
    },
    {
        titulo: 'Segundo Nombre',
        dataField: 'segundoNombre',
    },
    {
        titulo: 'Apellido',
        dataField: 'apellido',
    },
    {
        titulo: 'Segundo Apellido',
        dataField: 'segundoApellido',

    },
    // copi y reemplaza las veces que sea necesario
    // {
    //     titulo: 'ID',
    //     dataField: 'Edificio',
    // },
];

const arrayElementosDefault = [ // aqui puedes poner que quieras de filas  este sera divido por paginas segun es requerido.
    // el orden de este array y la cantidad de elementos debe ser el mismo que de la configuracion
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', '<button>Hola</button>'],
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', '<select>Hola</select>'],
    [01, 'Nombre 01', 'Nombre 01', '<input placeholder="ingrese algo"></input>', 'Nombre 01'],
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', 'Nombre 01'],
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', 'Nombre 01'],
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', 'Nombre 01'],
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', 'Nombre 01'],
    [01, 'Nombre 01', 'Nombre 01', 'Nombre 01', 'Nombre 01'],



];

const languagueDefault = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};

const createTh = (arrayColumnas, scopeTh, dataSortableTh, theadClass, theadTrClass) => {
    let thead = `<thead class='${theadClass}'>
        <tr class='${theadTrClass}'>`;
    arrayColumnas.forEach(th => {
        thead +=
            `<th scope= '${scopeTh}' data-field='${th.dataField}' data-sortable='${dataSortableTh}'>${th.titulo}</th>`;
    });
    return (thead + '</tr></thead>');
};

const createTbody = (elementos, tbodyTrClass) => {
    let tbody = '';
    elementos.forEach(contenido => {
        let tr = `<tr class="${tbodyTrClass}">`;
        for (const cont in contenido) {
            tr += `<td id="">${contenido[cont]}</td>`;
        }
        tr + '</tr>';
        tbody += tr;
    });

    return tbody;
};

const printTable = async (configTable, arrayElementos, arrayColumnas, languague, divTabla) => {

    // se identifica si viene null o no se envian datos, se ocupa por defecto
    const estructuraTablet = (configTable != null) ? configTable : configuracionTablaDefault;
    const elementos = (arrayElementos != null) ? arrayElementos : arrayElementosDefault;
    const columnas = (arrayColumnas != null) ? arrayColumnas : arrayColumnasDefault;
    const configLanguage = (languague != null) ? languague : languagueDefault;
    const idTabla = (divTabla != null) ? divTabla : 'divTabla';

    // divTabla es el id de la tabla
    // ejemplo de tabla dinamica en html
    // < !--tabla dinamica-- >
    //         <div class="form-reservar-hora px-2 py-3">
    //           <div class="table-responsive table-hover border-bottom">
    //               °°°°° aqui va el id que se ocupara °°°°°
    //             <div id="divTabla"></div>
    //           </div>
    //         </div>
    // <!--fin tabla dinamica-- >

    // se utiliza esta configuracion de tabla, usar como referencia el ejemplo de arriba: solo es necesario cambiar textos 

    // parametrizar los valores de condiguracion para una mejor lectura de la creacion de la tabla
    const configuracionTable = estructuraTablet.table.configuracionTable;
    const theadClass = estructuraTablet.table.thead.class;
    const theadTrClass = estructuraTablet.table.thead.tr.class;
    const scopeTh = estructuraTablet.table.thead.tr.scope;
    const dataSortableTh = estructuraTablet.table.thead.tr.dataSortable;
    const tbodyClass = estructuraTablet.table.tbody.class;
    const tbodyTrClass = estructuraTablet.table.tbody.tr.class;

    let tabla = `<table ${configuracionTable}>
        ${createTh(columnas, scopeTh, dataSortableTh, theadClass, theadTrClass)}
        <tbody class='${tbodyClass}'>
        ${createTbody(elementos, tbodyTrClass)}
        </tbody>
        </table>`;

    // console.log(tabla);
    $(`#${idTabla}`).empty();
    $(`#${idTabla}`).append(tabla);
    $('#tblListado').DataTable({
        "language": configLanguage,
        "scrollX": false,
        "searching": true,
    });
};

// printTablaColFil(null, null)

printTable(null, null, null, null, null);