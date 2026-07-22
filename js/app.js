document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll("#mainMenu .nav-link");
    const sections = document.querySelectorAll("main .section");

    const fileInput = document.getElementById("fileInput");
    const dropArea = document.getElementById("dropArea");
    const fileList = document.getElementById("fileList");
    const btnUpload = document.getElementById("btnUpload");
    const btnVerCuadrosArchivos = document.getElementById("btnVerCuadrosArchivos");
    const cuadrosArchivosBody = document.getElementById("cuadrosArchivosBody");
    const textoExaminarCuadroArchivos = document.getElementById("textoExaminarCuadroArchivos");
    const uploadSummary = document.getElementById("uploadSummary");
    const uploadSummaryText = document.getElementById("uploadSummaryText");
    const uploadToast = document.getElementById("uploadToast");
    const uploadToastBody = document.getElementById("uploadToastBody");
    const badgeEstadoCarga = document.getElementById("badgeEstadoCarga");
    const txtPeriodoActual = document.getElementById("txtPeriodoActual");
    const txtUltimaCarga = document.getElementById("txtUltimaCarga");
    const barraProgresoCarga = document.getElementById("barraProgresoCarga");
    const badgeFinanzasPrevio = document.getElementById("badgeFinanzasPrevio");
    const badgeOperacionesPrevio = document.getElementById("badgeOperacionesPrevio");
    const barraFinanzasPrevio = document.getElementById("barraFinanzasPrevio");
    const barraOperacionesPrevio = document.getElementById("barraOperacionesPrevio");
    const txtFinanzasPrevio = document.getElementById("txtFinanzasPrevio");
    const txtOperacionesPrevio = document.getElementById("txtOperacionesPrevio");

    const listaConsultasDashboard = document.getElementById("listaConsultasDashboard");
    const btnEjecutarConsultas = document.getElementById("btnEjecutarConsultas");
    const btnGuardarConsulta = document.getElementById("btnGuardarConsulta");
    const btnActualizarConsulta = document.getElementById("btnActualizarConsulta");
    const nombreConsulta = document.getElementById("nombreConsulta");
    const descripcionConsulta = document.getElementById("descripcionConsulta");
    const textoConsultaSQL = document.getElementById("textoConsultaSQL");
    const cuadrosDashboardBody = document.getElementById("cuadrosDashboardBody");
    const tituloErrorCuadro = document.getElementById("tituloErrorCuadro");
    const tablaErroresBody = document.getElementById("tablaErroresBody");
    const dashboardResumen = document.getElementById("dashboardResumen");
    const resumenConsultas = document.getElementById("resumenConsultas");
    const resumenOk = document.getElementById("resumenOk");
    const resumenError = document.getElementById("resumenError");
    const resumenTodos = document.getElementById("resumenTodos");
    const seccionCuadrosDashboard = document.getElementById("seccionCuadrosDashboard");
    const btnSeleccionarTodos = document.getElementById("btnSeleccionarTodos");
    const btnGuardarCuadrosBD = document.getElementById("btnGuardarCuadrosBD");

    const btnConectarSQL = document.getElementById("btnConectarSQL");
    const btnProbarConexion = document.getElementById("btnProbarConexion");
    const btnLimpiarConexion = document.getElementById("btnLimpiarConexion");
    const sqlServidor = document.getElementById("sqlServidor");
    const sqlBaseDatos = document.getElementById("sqlBaseDatos");
    const sqlUsuario = document.getElementById("sqlUsuario");
    const sqlContrasena = document.getElementById("sqlContrasena");
    const sqlPuerto = document.getElementById("sqlPuerto");
    const mensajeConexion = document.getElementById("mensajeConexion");
    const selectorTabla = document.getElementById("selectorTabla");
    const listaCampos = document.getElementById("listaCampos");
    const btnAgregarCamposSeleccion = document.getElementById("btnAgregarCamposSeleccion");
    const btnLimpiarCamposSeleccion = document.getElementById("btnLimpiarCamposSeleccion");
    const camposSeleccionados = document.getElementById("camposSeleccionados");

    const mesesInicialesConsulta = document.getElementById("mesesInicialesConsulta");
    const mesesFinalesConsulta = document.getElementById("mesesFinalesConsulta");

    const ultimoDiaHabil = document.getElementById("ultimoDiaHabil");
    const penultimoDiaHabil = document.getElementById("penultimoDiaHabil");

    const tablasEjemplo = [
        { nombre: "saldos", campos: ["id", "cuenta", "subcuenta", "fecha", "saldo_inicial", "saldo_final"] },
        { nombre: "movimientos", campos: ["id", "cuenta", "fecha", "concepto", "debe", "haber"] },
        { nombre: "fondos", campos: ["id", "fondo", "descripcion", "saldo"] },
        { nombre: "entidades", campos: ["id", "entidad", "tipo", "estatus"] },
        { nombre: "cierre_mensual", campos: ["id", "mes", "anio", "cuenta", "saldo"] },
        { nombre: "cierre_anual", campos: ["id", "anio", "cuenta", "saldo"] },
        { nombre: "errores", campos: ["id", "tabla", "campo", "descripcion", "fecha"] },
        { nombre: "auditoria", campos: ["id", "usuario", "accion", "fecha", "detalle"] },
        { nombre: "conciliacion", campos: ["id", "banco", "fecha", "concepto", "importe"] },
        { nombre: "reportes", campos: ["id", "reporte", "fecha_generacion", "usuario"] }
    ];

    let consultas = [
        { id: 1, nombre: "Consulta de Operaciones 1", descripcion: "Saldos iniciales y finales", sql: "SELECT * FROM saldos", servidor: "localhost", baseDatos: "contabilidad", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "saldos", campos: ["id", "cuenta", "subcuenta", "fecha", "saldo_inicial", "saldo_final"], habilitada: true },
        { id: 2, nombre: "Consulta de Operaciones 2", descripcion: "Movimientos por cuenta y subcuenta", sql: "SELECT * FROM movimientos", servidor: "servidor2", baseDatos: "contabilidad", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "movimientos", campos: ["id", "cuenta", "fecha", "concepto", "debe", "haber"], habilitada: true },
        { id: 3, nombre: "Consulta de Finanzas 1", descripcion: "Resumen por fondo", sql: "SELECT * FROM fondos", servidor: "localhost", baseDatos: "fondos_db", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "fondos", campos: ["id", "fondo", "descripcion", "saldo"], habilitada: true },
        { id: 4, nombre: "Consulta de Finanzas 2", descripcion: "Resumen por entidad", sql: "SELECT * FROM entidades", servidor: "servidor3", baseDatos: "entidades_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "entidades", campos: ["id", "entidad", "tipo", "estatus"], habilitada: true },
        { id: 5, nombre: "Consulta de Operaciones 3", descripcion: "Cierre de cuentas", sql: "SELECT * FROM cierre_mensual", servidor: "localhost", baseDatos: "contabilidad", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "cierre_mensual", campos: ["id", "mes", "anio", "cuenta", "saldo"], habilitada: true },
        { id: 6, nombre: "Consulta de Finanzas 3", descripcion: "Resumen de operaciones", sql: "SELECT * FROM cierre_anual", servidor: "servidor4", baseDatos: "cierre_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "cierre_anual", campos: ["id", "anio", "cuenta", "saldo"], habilitada: true },
        { id: 7, nombre: "Consulta de Operaciones 4", descripcion: "Registros con inconsistencias", sql: "SELECT * FROM errores", servidor: "localhost", baseDatos: "auditoria_db", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "errores", campos: ["id", "tabla", "campo", "descripcion", "fecha"], habilitada: true },
        { id: 8, nombre: "Consulta de Finanzas 4", descripcion: "Auditoría de cuentas clave", sql: "SELECT * FROM auditoria", servidor: "servidor5", baseDatos: "auditoria_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "auditoria", campos: ["id", "usuario", "accion", "fecha", "detalle"], habilitada: true },
        { id: 9, nombre: "Consulta de Operaciones 5", descripcion: "Conciliación bancaria", sql: "SELECT * FROM conciliacion", servidor: "localhost", baseDatos: "bancos_db", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "conciliacion", campos: ["id", "banco", "fecha", "concepto", "importe"], habilitada: true },
        { id: 10, nombre: "Consulta de Finanzas 5", descripcion: "Reportes ejecutivos", sql: "SELECT * FROM reportes", servidor: "servidor6", baseDatos: "reportes_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "reportes", campos: ["id", "reporte", "fecha_generacion", "usuario"], habilitada: true }
    ];

    let estadoCuadros = [];
    let campoSeleccionadoLista = [];
    let consultaAEditarId = null;
    let selectedFiles = [];
    let filtroCuadrosActual = "todos";

    function obtenerDiaHabilDesdeMes(mesNombre, tipoDia = "ultimo") {
        const meses = {
            "Enero": 0, "Febrero": 1, "Marzo": 2, "Abril": 3,
            "Mayo": 4, "Junio": 5, "Julio": 6, "Agosto": 7,
            "Septiembre": 8, "Octubre": 9, "Noviembre": 10, "Diciembre": 11
        };

        const ahora = new Date();
        const anio = ahora.getFullYear();
        const mes = meses[mesNombre];
        if (mes === undefined) return "";

        let fecha = new Date(anio, mes + 1, 0);

        if (tipoDia === "penultimo") {
            fecha.setDate(fecha.getDate() - 1);
        }

        while (fecha.getDay() === 0 || fecha.getDay() === 6) {
            fecha.setDate(fecha.getDate() - 1);
        }

        return fecha.toLocaleDateString("es-ES");
    }

    function actualizarConsultaSQLConMes() {
        const mesInicialSeleccionado = Array.from(
            document.querySelectorAll("#mesesInicialesConsulta input:checked")
        )[0]?.value;

        const tipoDia = document.querySelector('input[name="diaHabilConsulta"]:checked')?.value || "ultimo";

        if (!mesInicialSeleccionado || !textoConsultaSQL) return;

        const fechaCalculada = obtenerDiaHabilDesdeMes(mesInicialSeleccionado, tipoDia);

        textoConsultaSQL.value = `SELECT *\nFROM tu_tabla\nWHERE fecha = '${fechaCalculada}'`;
    }

    function renderMesesConsulta() {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        const mesActual = new Date().getMonth();
        const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;

        const crearCheckMes = (mes, prefijo, idx, checked = false) => `
        <div class="col">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${mes}" id="${prefijo}${idx}" ${checked ? "checked" : ""}>
                <label class="form-check-label" for="${prefijo}${idx}">${mes}</label>
            </div>
        </div>
    `;

        if (mesesInicialesConsulta) {
            mesesInicialesConsulta.innerHTML = meses
                .map((mes, idx) => crearCheckMes(mes, "mesIni", idx, idx === mesAnterior))
                .join("");
        }

        if (mesesFinalesConsulta) {
            mesesFinalesConsulta.innerHTML = meses
                .map((mes, idx) => crearCheckMes(mes, "mesFin", idx, idx === mesAnterior))
                .join("");
        }
    }

    function getMesAnteriorActual() {
        const fecha = new Date();
        fecha.setMonth(fecha.getMonth() - 1);
        const texto = fecha.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    function calcularResumenPorArea(consultasArr, estadoCuadrosArr) {
        const consultasFinanzas = consultasArr.filter((c) => (c.nombre || "").toLowerCase().includes("finanzas")).length;
        const consultasOperaciones = consultasArr.filter((c) => (c.nombre || "").toLowerCase().includes("operaciones")).length;
        const cuadrosFinanzas = estadoCuadrosArr.filter((c) => (c.nombre || "").toLowerCase().includes("finanzas")).length;
        const cuadrosOperaciones = estadoCuadrosArr.filter((c) => (c.nombre || "").toLowerCase().includes("operaciones")).length;
        const finanzasBase = consultasFinanzas + cuadrosFinanzas;
        const operacionesBase = consultasOperaciones + cuadrosOperaciones;
        const totalBase = finanzasBase + operacionesBase || 1;
        return {
            finanzasPct: Math.round((finanzasBase / totalBase) * 100),
            operacionesPct: Math.round((operacionesBase / totalBase) * 100),
            finanzasConsultas: consultasFinanzas,
            finanzasCuadros: cuadrosFinanzas,
            operacionesConsultas: consultasOperaciones,
            operacionesCuadros: cuadrosOperaciones
        };
    }

    function actualizarResumenProcesamiento(data) {
        if (txtPeriodoActual) txtPeriodoActual.textContent = data.periodoActual || "--";
        if (txtUltimaCarga) txtUltimaCarga.textContent = data.ultimaCarga || "Sin registros previos";
        if (badgeEstadoCarga) badgeEstadoCarga.textContent = data.estadoCarga || "Pendiente";
        if (barraProgresoCarga) barraProgresoCarga.style.width = `${data.progreso || 0}%`;
        if (badgeFinanzasPrevio) badgeFinanzasPrevio.textContent = `${data.finanzasPct || 0}%`;
        if (badgeOperacionesPrevio) badgeOperacionesPrevio.textContent = `${data.operacionesPct || 0}%`;
        if (barraFinanzasPrevio) barraFinanzasPrevio.style.width = `${data.finanzasPct || 0}%`;
        if (barraOperacionesPrevio) barraOperacionesPrevio.style.width = `${data.operacionesPct || 0}%`;
        if (txtFinanzasPrevio) txtFinanzasPrevio.textContent = `${data.finanzasConsultas || 0} consultas · ${data.finanzasCuadros || 0} cuadros`;
        if (txtOperacionesPrevio) txtOperacionesPrevio.textContent = `${data.operacionesConsultas || 0} consultas · ${data.operacionesCuadros || 0} cuadros`;
    }

    function renderConsultas() {
        if (!listaConsultasDashboard) return;
        listaConsultasDashboard.innerHTML = "";

        const consultasVisibles = consultas.filter((q) => q.habilitada !== false);

        consultasVisibles.forEach((q) => {
            const div = document.createElement("div");
            div.className = "list-group-item d-flex align-items-center gap-2";
            div.innerHTML = `
            <input class="form-check-input me-2" type="checkbox" value="${q.id}" id="chkConsulta${q.id}" />
            <label class="form-check-label flex-grow-1" for="chkConsulta${q.id}">
                <div class="fw-semibold">${q.nombre}</div>
                <small class="text-muted">${q.descripcion}</small>
            </label>
            <button type="button" class="btn btn-sm btn-outline-danger btn-deshabilitar-consulta" data-id="${q.id}">
                Deshabilitar
            </button>
            <button type="button" class="btn btn-sm btn-outline-primary btn-editar-consulta" data-id="${q.id}">
                Editar
            </button>
        `;
            listaConsultasDashboard.appendChild(div);
        });

        document.querySelectorAll(".btn-editar-consulta").forEach((btn) => {
            btn.addEventListener("click", () => abrirModalEditarConsulta(parseInt(btn.getAttribute("data-id"), 10)));
        });

        document.querySelectorAll(".btn-deshabilitar-consulta").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"), 10);
                const consulta = consultas.find((c) => c.id === id);
                if (!consulta) return;

                consulta.habilitada = false;
                renderConsultas();
                actualizarResumen();
            });
        });
    }

    function renderCamposSeleccionados() {
        if (!camposSeleccionados) return;
        camposSeleccionados.innerHTML = "";
        if (campoSeleccionadoLista.length === 0) {
            camposSeleccionados.innerHTML = `<div class="text-muted small p-2">No hay campos seleccionados.</div>`;
            return;
        }
        campoSeleccionadoLista.forEach((campo, idx) => {
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between align-items-center";
            div.innerHTML = `<span>${campo}</span><button type="button" class="btn btn-sm btn-outline-danger" data-idx="${idx}">Quitar</button>`;
            camposSeleccionados.appendChild(div);
        });
        camposSeleccionados.querySelectorAll("button[data-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                campoSeleccionadoLista.splice(parseInt(btn.getAttribute("data-idx"), 10), 1);
                renderCamposSeleccionados();
            });
        });
    }

    function cargarTablasEnSelector(tablaPreseleccionada = null) {
        if (!selectorTabla) return;
        selectorTabla.innerHTML = "";
        tablasEjemplo.forEach((t, idx) => {
            const opt = document.createElement("option");
            opt.value = String(idx);
            opt.textContent = t.nombre;
            selectorTabla.appendChild(opt);
        });
        let idxSeleccionado = 0;
        if (tablaPreseleccionada) {
            const idx = tablasEjemplo.findIndex((t) => t.nombre === tablaPreseleccionada);
            if (idx !== -1) idxSeleccionado = idx;
        }
        selectorTabla.value = String(idxSeleccionado);
        selectorTabla.onchange = () => {
            const tabla = tablasEjemplo[parseInt(selectorTabla.value, 10)];
            listaCampos.innerHTML = "";
            if (!tabla) return;
            tabla.campos.forEach((campo) => {
                const div = document.createElement("div");
                div.className = "form-check";
                div.innerHTML = `<input class="form-check-input campo-check" type="checkbox" value="${campo}" id="chkCampo${campo}" /><label class="form-check-label" for="chkCampo${campo}">${campo}</label>`;
                listaCampos.appendChild(div);
            });
        };
        selectorTabla.dispatchEvent(new Event("change"));
    }

    function abrirModalEditarConsulta(id) {
        const consulta = consultas.find((c) => c.id === id);
        if (!consulta) return;
        consultaAEditarId = id;
        nombreConsulta.value = consulta.nombre;
        descripcionConsulta.value = consulta.descripcion;
        textoConsultaSQL.value = consulta.sql || "";
        sqlServidor.value = consulta.servidor || "";
        sqlBaseDatos.value = consulta.baseDatos || "";
        sqlUsuario.value = consulta.usuario || "";
        sqlContrasena.value = consulta.contrasena || "";
        sqlPuerto.value = consulta.puerto || "";
        cargarTablasEnSelector(consulta.tabla);
        campoSeleccionadoLista = [...(consulta.campos || [])];
        renderCamposSeleccionados();
        new bootstrap.Modal(document.getElementById("modalNuevaConsulta")).show();
    }

    function generarEstadoCuadros() {
        const nombresCuadros = Array.from({ length: 35 }, (_, i) => `Cuadro estadístico ${String(i + 1).padStart(2, "0")}`);
        estadoCuadros = nombresCuadros.map((nombre, index) => {
            const estado = Math.random() < 0.2 ? "error" : "ok";
            return {
                nombre,
                estado,
                errores: estado === "error" ? [
                    { registro: index + 101, campo: "Fecha", valor: "", problema: "Campo vacío" },
                    { registro: index + 101, campo: "Saldo inicial", valor: "null", problema: "Dato incorrecto" }
                ] : []
            };
        });
    }

    function renderCuadrosDashboard(filtro = "todos") {
        if (!cuadrosDashboardBody) return;
        filtroCuadrosActual = filtro;
        cuadrosDashboardBody.innerHTML = "";
        const filtrados = filtro === "todos" ? estadoCuadros : estadoCuadros.filter((c) => c.estado === filtro);
        if (filtrados.length === 0) {
            cuadrosDashboardBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-3">No hay cuadros para mostrar con este filtro.</td></tr>`;
            return;
        }
        filtrados.forEach((item) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><span class="badge ${item.estado === "error" ? "bg-danger" : "bg-success"}">${item.estado === "error" ? "Error" : "OK"}</span></td>
                <td>${item.nombre}</td>
                <td>
                    ${item.estado === "error"
                    ? `<button type="button" class="btn btn-sm btn-outline-danger btn-ver-tabla" data-cuadro="${item.nombre}">Ver tabla</button>`
                    : `<span class="text-muted small">Sin errores</span>`
                }
                </td>
            `;
            cuadrosDashboardBody.appendChild(tr);
        });
        document.querySelectorAll(".btn-ver-tabla").forEach((btn) => {
            btn.addEventListener("click", () => {
                const cuadro = estadoCuadros.find((c) => c.nombre === btn.getAttribute("data-cuadro"));
                if (!cuadro) return;
                if (tituloErrorCuadro) {
                    tituloErrorCuadro.textContent = `El cuadro "${cuadro.nombre}" presenta los siguientes errores:`;
                }
                if (tablaErroresBody) {
                    tablaErroresBody.innerHTML = cuadro.errores.map((err) => `<tr><td>${err.registro}</td><td>${err.campo}</td><td>${err.valor}</td><td>${err.problema}</td></tr>`).join("");
                }
                new bootstrap.Modal(document.getElementById("modalVerTablaErrores")).show();
            });
        });
    }

    function actualizarResumen() {
        const seleccionados = Array.from(document.querySelectorAll('#listaConsultasDashboard input[type="checkbox"]:checked'));
        if (resumenConsultas) resumenConsultas.textContent = String(seleccionados.length);
        if (resumenOk) resumenOk.textContent = String(estadoCuadros.filter((c) => c.estado === "ok").length);
        if (resumenError) resumenError.textContent = String(estadoCuadros.filter((c) => c.estado === "error").length);
        if (resumenTodos) resumenTodos.textContent = String(estadoCuadros.length);
        actualizarResumenProcesamiento({
            periodoActual: getMesAnteriorActual(),
            ultimaCarga: "19/07/2026 18:40",
            estadoCarga: "En validación",
            progreso: 45,
            ...calcularResumenPorArea(consultas, estadoCuadros)
        });
        renderCuadrosDashboard(filtroCuadrosActual);
    }

    function guardarCuadrosEnBD() {
        const filtrados = filtroCuadrosActual === "todos"
            ? estadoCuadros
            : estadoCuadros.filter((c) => c.estado === filtroCuadrosActual);

        if (filtrados.length === 0) {
            alert("No hay cuadros para guardar con el filtro actual.");
            return;
        }

        const total = filtrados.length;
        const errores = filtrados.filter((c) => c.estado === "error").length;
        const ok = filtrados.filter((c) => c.estado === "ok").length;

        alert(`Guardando en BD ${total} cuadro(s): ${ok} OK y ${errores} con error.`);
    }

    menuLinks.forEach((link) => link.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute("data-section");
        menuLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        sections.forEach((sec) => sec.classList.toggle("d-none", sec.id !== sectionId));
    }));

    function renderFileList() {
        if (!fileList) return;
        fileList.innerHTML = "";
        if (selectedFiles.length === 0) {
            fileList.classList.add("d-none");
            return;
        }
        fileList.classList.remove("d-none");
        selectedFiles.forEach((file, index) => {
            const div = document.createElement("div");
            div.className = "file-list-item";
            div.innerHTML = `<span>${file.name} (${Math.round(file.size / 1024)} KB)</span><button class="btn btn-sm btn-outline-danger" data-index="${index}">Quitar</button>`;
            fileList.appendChild(div);
        });
        fileList.querySelectorAll("button[data-index]").forEach((btn) => {
            btn.addEventListener("click", () => {
                selectedFiles.splice(parseInt(btn.getAttribute("data-index"), 10), 1);
                renderFileList();
            });
        });
    }

    function getFileType(fileName) {
        const ext = (fileName.split(".").pop() || "").toLowerCase();
        if (["pdf"].includes(ext)) return "PDF";
        if (["xls", "xlsx", "csv"].includes(ext)) return "Excel";
        if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) return "Imagen";
        return "Otro";
    }

    if (fileInput) fileInput.addEventListener("change", (e) => {
        selectedFiles.push(...Array.from(e.target.files));
        renderFileList();
    });

    if (dropArea) {
        ["dragenter", "dragover", "dragleave", "drop"].forEach((ev) => dropArea.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); }));
        ["dragenter", "dragover"].forEach((ev) => dropArea.addEventListener(ev, () => dropArea.classList.add("highlight")));
        ["dragleave", "drop"].forEach((ev) => dropArea.addEventListener(ev, () => dropArea.classList.remove("highlight")));
        dropArea.addEventListener("drop", (e) => {
            selectedFiles.push(...Array.from(e.dataTransfer.files));
            renderFileList();
        });
    }

    if (btnUpload) btnUpload.addEventListener("click", () => {
        if (selectedFiles.length === 0) return;
        const total = selectedFiles.length;
        const typeCounts = selectedFiles.reduce((acc, file) => {
            acc[getFileType(file.name)]++;
            return acc;
        }, { PDF: 0, Excel: 0, Imagen: 0, Otro: 0 });
        if (uploadSummary) {
            uploadSummary.className = "alert alert-info";
            uploadSummary.classList.remove("d-none");
            uploadSummaryText.innerHTML = `<div>Total de archivos: <strong>${total}</strong></div><div class="mt-1">PDF: <strong>${typeCounts.PDF}</strong> · Excel: <strong>${typeCounts.Excel}</strong> · Imágenes: <strong>${typeCounts.Imagen}</strong> · Otros: <strong>${typeCounts.Otro}</strong></div><div class="mt-1 text-success">Carga simulada completada con éxito.</div>`;
        }
        if (uploadToast && uploadToastBody) {
            uploadToast.className = "toast text-bg-success";
            uploadToastBody.textContent = `Se cargaron ${total} archivo(s) correctamente.`;
            bootstrap.Toast.getOrCreateInstance(uploadToast).show();
        }
        selectedFiles = [];
        renderFileList();
        if (btnVerCuadrosArchivos) btnVerCuadrosArchivos.classList.remove("d-none");
    });

    if (btnVerCuadrosArchivos) btnVerCuadrosArchivos.addEventListener("click", () => {
        const modalEl = document.getElementById("modalCuadrosArchivos");
        const nombresCuadros = Array.from({ length: 35 }, (_, i) => `Cuadro estadístico ${String(i + 1).padStart(2, "0")}`);
        cuadrosArchivosBody.innerHTML = nombresCuadros.map((nombre, index) => {
            const ok = index % 4 !== 0;
            return `<tr><td><input class="estado-checkbox" type="checkbox" ${ok ? "checked" : ""} disabled /></td><td>${nombre}</td><td>${ok ? "" : `<button type="button" class="btn btn-sm btn-outline-warning btn-examinar-archivo" data-cuadro="${nombre}">Examinar</button>`}</td></tr>`;
        }).join("");
        document.querySelectorAll(".btn-examinar-archivo").forEach((btn) => {
            btn.addEventListener("click", () => {
                textoExaminarCuadroArchivos.textContent = `El cuadro "${btn.getAttribute("data-cuadro")}" tiene información incorrecta o incompleta.`;
                new bootstrap.Modal(document.getElementById("modalExaminarCuadroArchivos")).show();
            });
        });
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });

    btnConectarSQL?.addEventListener("click", () => {
        if (mensajeConexion) {
            mensajeConexion.className = "alert alert-success";
            mensajeConexion.classList.remove("d-none");
            mensajeConexion.textContent = "Conexión establecida correctamente.";
        }
        const tab = document.querySelector('[data-bs-target="#tab-tablas"]');
        if (tab) bootstrap.Tab.getOrCreateInstance(tab).show();
    });

    btnProbarConexion?.addEventListener("click", () => {
        if (mensajeConexion) {
            mensajeConexion.className = "alert alert-info";
            mensajeConexion.classList.remove("d-none");
            mensajeConexion.textContent = "Prueba de conexión exitosa.";
        }
    });

    btnLimpiarConexion?.addEventListener("click", () => {
        [sqlServidor, sqlBaseDatos, sqlUsuario, sqlContrasena, sqlPuerto].forEach((el) => el && (el.value = ""));
        if (mensajeConexion) mensajeConexion.classList.add("d-none");
    });

    btnAgregarCamposSeleccion?.addEventListener("click", () => {
        const checks = Array.from(document.querySelectorAll(".campo-check:checked")).map((el) => el.value);
        checks.forEach((c) => {
            if (!campoSeleccionadoLista.includes(c)) campoSeleccionadoLista.push(c);
        });
        renderCamposSeleccionados();
    });

    btnLimpiarCamposSeleccion?.addEventListener("click", () => {
        campoSeleccionadoLista = [];
        renderCamposSeleccionados();
    });

    btnGuardarConsulta?.addEventListener("click", () => {
        const nombre = nombreConsulta.value.trim();
        if (!nombre) return;
        const tabla = tablasEjemplo[parseInt(selectorTabla.value, 10)];
        const payload = {
            nombre,
            descripcion: descripcionConsulta.value.trim(),
            sql: textoConsultaSQL.value.trim(),
            servidor: sqlServidor.value.trim(),
            baseDatos: sqlBaseDatos.value.trim(),
            usuario: sqlUsuario.value.trim(),
            contrasena: sqlContrasena.value.trim(),
            puerto: sqlPuerto.value.trim(),
            tabla: tabla ? tabla.nombre : "",
            campos: [...campoSeleccionadoLista],
            fechaInicial: Array.from(mesesInicialesConsulta.querySelectorAll("input:checked")).map((el) => el.value),
            fechaFinal: Array.from(mesesFinalesConsulta.querySelectorAll("input:checked")).map((el) => el.value),
            diaHabil: document.querySelector('input[name="diaHabilConsulta"]:checked')?.value || "ultimo"
        };
        if (consultaAEditarId !== null) {
            const idx = consultas.findIndex((c) => c.id === consultaAEditarId);
            if (idx !== -1) consultas[idx] = { ...consultas[idx], ...payload };
        } else {
            consultas.push({ id: Math.max(...consultas.map((c) => c.id)) + 1, ...payload });
        }
        consultaAEditarId = null;
        renderConsultas();
        actualizarResumen();
        bootstrap.Modal.getOrCreateInstance(document.getElementById("modalNuevaConsulta")).hide();
    });

    btnActualizarConsulta?.addEventListener("click", () => {
        const seleccionados = Array.from(document.querySelectorAll('#listaConsultasDashboard input[type="checkbox"]:checked'));
        if (seleccionados.length === 0) return alert("Selecciona una consulta para actualizarla.");
        const nombre = nombreConsulta.value.trim();
        const tabla = tablasEjemplo[parseInt(selectorTabla.value, 10)];
        seleccionados.forEach((chk) => {
            const idx = consultas.findIndex((c) => c.id === parseInt(chk.value, 10));
            if (idx !== -1) {
                consultas[idx] = {
                    ...consultas[idx],
                    nombre: nombre || consultas[idx].nombre,
                    descripcion: descripcionConsulta.value.trim() || consultas[idx].descripcion,
                    sql: textoConsultaSQL.value.trim() || consultas[idx].sql,
                    servidor: sqlServidor.value.trim() || consultas[idx].servidor,
                    baseDatos: sqlBaseDatos.value.trim() || consultas[idx].baseDatos,
                    usuario: sqlUsuario.value.trim() || consultas[idx].usuario,
                    contrasena: sqlContrasena.value.trim() || consultas[idx].contrasena,
                    puerto: sqlPuerto.value.trim() || consultas[idx].puerto,
                    tabla: tabla ? tabla.nombre : consultas[idx].tabla,
                    campos: campoSeleccionadoLista.length ? [...campoSeleccionadoLista] : consultas[idx].campos
                };
            }
        });
        renderConsultas();
        actualizarResumen();
    });

    btnSeleccionarTodos?.addEventListener("click", () => {
        const checkboxes = Array.from(document.querySelectorAll('#listaConsultasDashboard input[type="checkbox"]'));
        const allChecked = checkboxes.length && checkboxes.every((c) => c.checked);
        checkboxes.forEach((c) => c.checked = !allChecked);
        btnSeleccionarTodos.textContent = allChecked ? "Seleccionar todos" : "Deseleccionar todos";
        actualizarResumen();
    });

    btnEjecutarConsultas?.addEventListener("click", () => {
        const seleccionados = Array.from(document.querySelectorAll('#listaConsultasDashboard input[type="checkbox"]:checked'));
        if (seleccionados.length === 0) return alert("Selecciona al menos una consulta para ejecutar.");
        generarEstadoCuadros();
        dashboardResumen.style.display = "flex";
        seccionCuadrosDashboard.style.display = "block";
        actualizarResumen();
        renderCuadrosDashboard("todos");
        if (btnSeleccionarTodos) btnSeleccionarTodos.textContent = "Seleccionar todos";
    });

    btnGuardarCuadrosBD?.addEventListener("click", guardarCuadrosEnBD);

    document.querySelectorAll(".resumen-card").forEach((card) => {
        card.addEventListener("click", () => {
            const filtro = card.getAttribute("data-filtro") || "todos";
            renderCuadrosDashboard(filtro);
        });
    });

    document.addEventListener("change", (e) => {
        if (
            e.target.closest("#mesesInicialesConsulta") ||
            e.target.name === "diaHabilConsulta"
        ) {
            actualizarConsultaSQLConMes();
        }
    });

    renderConsultas();
    generarEstadoCuadros();
    actualizarResumen();
    renderCuadrosDashboard("todos");
    cargarTablasEnSelector();
    renderCamposSeleccionados();
    renderMesesConsulta();
});

