(function () {
    const menuLinks = document.querySelectorAll("#mainMenu .nav-link");
    const sections = document.querySelectorAll("main .section");

    menuLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("data-section");
            menuLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
            sections.forEach((sec) => {
                if (sec.id === sectionId) {
                    sec.classList.remove("d-none");
                    sec.classList.add("active");
                } else {
                    sec.classList.add("d-none");
                    sec.classList.remove("active");
                }
            });
        });
    });
})();

(function () {
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

    let selectedFiles = [];

    function getFileType(fileName) {
        const ext = (fileName.split(".").pop() || "").toLowerCase();
        if (["pdf"].includes(ext)) return "PDF";
        if (["xls", "xlsx", "csv"].includes(ext)) return "Excel";
        if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) return "Imagen";
        return "Otro";
    }

    function buildTypeCounts(files) {
        const counts = { PDF: 0, Excel: 0, Imagen: 0, Otro: 0 };
        files.forEach((file) => {
            counts[getFileType(file.name)] += 1;
        });
        return counts;
    }

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
            div.innerHTML = `
                <span>${file.name} (${Math.round(file.size / 1024)} KB)</span>
                <button class="btn btn-sm btn-outline-danger" data-index="${index}">Quitar</button>
            `;
            fileList.appendChild(div);
        });

        fileList.querySelectorAll("button[data-index]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.getAttribute("data-index"), 10);
                selectedFiles.splice(idx, 1);
                renderFileList();
            });
        });
    }

    function generarCuadrosArchivos() {
        if (!cuadrosArchivosBody) return;

        const nombresCuadros = [
            "Cuadro estadístico 01","Cuadro estadístico 02","Cuadro estadístico 03","Cuadro estadístico 04","Cuadro estadístico 05",
            "Cuadro estadístico 06","Cuadro estadístico 07","Cuadro estadístico 08","Cuadro estadístico 09","Cuadro estadístico 10",
            "Cuadro estadístico 11","Cuadro estadístico 12","Cuadro estadístico 13","Cuadro estadístico 14","Cuadro estadístico 15",
            "Cuadro estadístico 16","Cuadro estadístico 17","Cuadro estadístico 18","Cuadro estadístico 19","Cuadro estadístico 20",
            "Cuadro estadístico 21","Cuadro estadístico 22","Cuadro estadístico 23","Cuadro estadístico 24","Cuadro estadístico 25",
            "Cuadro estadístico 26","Cuadro estadístico 27","Cuadro estadístico 28","Cuadro estadístico 29","Cuadro estadístico 30",
            "Cuadro estadístico 31","Cuadro estadístico 32","Cuadro estadístico 33","Cuadro estadístico 34","Cuadro estadístico 35"
        ];

        const estados = nombresCuadros.map((nombre, index) => ({
            nombre,
            ok: index % 4 !== 0
        }));

        cuadrosArchivosBody.innerHTML = "";

        estados.forEach((item) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <input class="estado-checkbox" type="checkbox" ${item.ok ? "checked" : ""} disabled />
                </td>
                <td>${item.nombre}</td>
                <td>
                    ${
                        !item.ok
                            ? `<button type="button" class="btn btn-sm btn-outline-warning btn-examinar-archivo" data-cuadro="${item.nombre}">
                                   Examinar
                               </button>`
                            : ``
                    }
                </td>
            `;
            cuadrosArchivosBody.appendChild(tr);
        });

        document.querySelectorAll(".btn-examinar-archivo").forEach((btn) => {
            btn.addEventListener("click", () => {
                const nombreCuadro = btn.getAttribute("data-cuadro");
                if (textoExaminarCuadroArchivos) {
                    textoExaminarCuadroArchivos.textContent = `El cuadro "${nombreCuadro}" tiene información incorrecta o incompleta.`;
                }
                const modalEl = document.getElementById("modalExaminarCuadroArchivos");
                if (modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.show();
                }
            });
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            selectedFiles = selectedFiles.concat(Array.from(e.target.files));
            renderFileList();
        });
    }

    if (dropArea) {
        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ["dragenter", "dragover"].forEach((eventName) => {
            dropArea.addEventListener(eventName, () => dropArea.classList.add("highlight"));
        });

        ["dragleave", "drop"].forEach((eventName) => {
            dropArea.addEventListener(eventName, () => dropArea.classList.remove("highlight"));
        });

        dropArea.addEventListener("drop", (e) => {
            selectedFiles = selectedFiles.concat(Array.from(e.dataTransfer.files));
            renderFileList();
        });
    }

    if (btnUpload) {
        btnUpload.addEventListener("click", () => {
            if (!selectedFiles || selectedFiles.length === 0) {
                if (uploadSummary) {
                    uploadSummary.className = "alert alert-danger";
                    uploadSummary.classList.remove("d-none");
                    uploadSummaryText.textContent = "No se encontraron archivos para cargar.";
                }

                if (uploadToast && uploadToastBody) {
                    uploadToast.className = "toast text-bg-danger";
                    uploadToastBody.textContent = "Error: no hay archivos seleccionados.";
                    bootstrap.Toast.getOrCreateInstance(uploadToast).show();
                }
                return;
            }

            const total = selectedFiles.length;
            const typeCounts = buildTypeCounts(selectedFiles);

            if (uploadSummary) {
                uploadSummary.className = "alert alert-info";
                uploadSummary.classList.remove("d-none");
                uploadSummaryText.innerHTML = `
                    <div>Total de archivos: <strong>${total}</strong></div>
                    <div class="mt-1">PDF: <strong>${typeCounts.PDF}</strong> · Excel: <strong>${typeCounts.Excel}</strong> · Imágenes: <strong>${typeCounts.Imagen}</strong> · Otros: <strong>${typeCounts.Otro}</strong></div>
                    <div class="mt-1 text-success">Carga simulada completada con éxito.</div>
                `;
            }

            if (uploadToast && uploadToastBody) {
                uploadToast.className = "toast text-bg-success";
                uploadToastBody.textContent = `Se cargaron ${total} archivo(s) correctamente.`;
                bootstrap.Toast.getOrCreateInstance(uploadToast).show();
            }

            selectedFiles = [];
            renderFileList();

            if (btnVerCuadrosArchivos) {
                btnVerCuadrosArchivos.classList.remove("d-none");
            }
        });
    }

    if (btnVerCuadrosArchivos) {
        btnVerCuadrosArchivos.addEventListener("click", () => {
            generarCuadrosArchivos();
            const modalEl = document.getElementById("modalCuadrosArchivos");
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.show();
            }
        });
    }

    renderFileList();
})();

(function () {
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
    const resumenParcial = document.getElementById("resumenParcial");
    const resumenError = document.getElementById("resumenError");
    const seccionCuadrosDashboard = document.getElementById("seccionCuadrosDashboard");
    const btnSeleccionarTodos = document.getElementById("btnSeleccionarTodos");

    const cardResumenOk = document.querySelector("#resumenOk")?.closest(".card-resumen");
    const cardResumenParcial = document.querySelector("#resumenParcial")?.closest(".card-resumen");
    const cardResumenError = document.querySelector("#resumenError")?.closest(".card-resumen");
    const cardResumenTodos = document.querySelector("#resumenTodos")?.closest(".card-resumen");

    const btnConectarSQL = document.getElementById("btnConectarSQL");
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
        { id: 1, nombre: "Consulta de saldos julio", descripcion: "Saldos iniciales y finales de julio", sql: "SELECT * FROM saldos", servidor: "localhost", baseDatos: "contabilidad", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "saldos", campos: ["id", "cuenta", "subcuenta", "fecha", "saldo_inicial", "saldo_final"] },
        { id: 2, nombre: "Consulta detallada contable", descripcion: "Movimientos por cuenta y subcuenta", sql: "SELECT * FROM movimientos", servidor: "servidor2", baseDatos: "contabilidad", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "movimientos", campos: ["id", "cuenta", "fecha", "concepto", "debe", "haber"] },
        { id: 3, nombre: "Consulta de fondos", descripcion: "Resumen por fondo", sql: "SELECT * FROM fondos", servidor: "localhost", baseDatos: "fondos_db", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "fondos", campos: ["id", "fondo", "descripcion", "saldo"] },
        { id: 4, nombre: "Consulta de entidades", descripcion: "Resumen por entidad", sql: "SELECT * FROM entidades", servidor: "servidor3", baseDatos: "entidades_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "entidades", campos: ["id", "entidad", "tipo", "estatus"] },
        { id: 5, nombre: "Consulta mensual", descripcion: "Cierre mensual de cuentas", sql: "SELECT * FROM cierre_mensual", servidor: "localhost", baseDatos: "contabilidad", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "cierre_mensual", campos: ["id", "mes", "anio", "cuenta", "saldo"] },
        { id: 6, nombre: "Consulta anual", descripcion: "Resumen anual de operaciones", sql: "SELECT * FROM cierre_anual", servidor: "servidor4", baseDatos: "cierre_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "cierre_anual", campos: ["id", "anio", "cuenta", "saldo"] },
        { id: 7, nombre: "Consulta de errores", descripcion: "Registros con inconsistencias", sql: "SELECT * FROM errores", servidor: "localhost", baseDatos: "auditoria_db", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "errores", campos: ["id", "tabla", "campo", "descripcion", "fecha"] },
        { id: 8, nombre: "Consulta de auditoría", descripcion: "Auditoría de cuentas clave", sql: "SELECT * FROM auditoria", servidor: "servidor5", baseDatos: "auditoria_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "auditoria", campos: ["id", "usuario", "accion", "fecha", "detalle"] },
        { id: 9, nombre: "Consulta de conciliación", descripcion: "Conciliación bancaria", sql: "SELECT * FROM conciliacion", servidor: "localhost", baseDatos: "bancos_db", usuario: "sa", contrasena: "****", puerto: "1433", tabla: "conciliacion", campos: ["id", "banco", "fecha", "concepto", "importe"] },
        { id: 10, nombre: "Consulta de reportes", descripcion: "Reportes ejecutivos", sql: "SELECT * FROM reportes", servidor: "servidor6", baseDatos: "reportes_db", usuario: "admin", contrasena: "****", puerto: "1433", tabla: "reportes", campos: ["id", "reporte", "fecha_generacion", "usuario"] }
    ];

    let estadoCuadros = [];
    let filtroActual = null;
    let consultaAEditarId = null;
    let camposSeleccionadosLista = [];

    function renderConsultas() {
        if (!listaConsultasDashboard) return;
        listaConsultasDashboard.innerHTML = "";

        consultas.forEach((q) => {
            const div = document.createElement("div");
            div.className = "list-group-item d-flex align-items-center";
            div.innerHTML = `
                <input class="form-check-input me-2" type="checkbox" value="${q.id}" id="chkConsulta${q.id}" />
                <label class="form-check-label flex-grow-1" for="chkConsulta${q.id}">
                    <div class="fw-semibold">${q.nombre}</div>
                    <small class="text-muted">${q.descripcion}</small>
                </label>
                <button type="button" class="btn btn-sm btn-outline-primary btn-editar-consulta" data-id="${q.id}">Editar</button>
            `;
            listaConsultasDashboard.appendChild(div);
        });

        document.querySelectorAll(".btn-editar-consulta").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"), 10);
                abrirModalEditarConsulta(id);
            });
        });
    }

    function abrirModalEditarConsulta(id) {
        const consulta = consultas.find((c) => c.id === id);
        if (!consulta) return;

        consultaAEditarId = id;

        if (nombreConsulta) nombreConsulta.value = consulta.nombre;
        if (descripcionConsulta) descripcionConsulta.value = consulta.descripcion;
        if (textoConsultaSQL) textoConsultaSQL.value = consulta.sql || "";

        if (sqlServidor) sqlServidor.value = consulta.servidor || "";
        if (sqlBaseDatos) sqlBaseDatos.value = consulta.baseDatos || "";
        if (sqlUsuario) sqlUsuario.value = consulta.usuario || "";
        if (sqlContrasena) sqlContrasena.value = consulta.contrasena || "";
        if (sqlPuerto) sqlPuerto.value = consulta.puerto || "";

        if (mensajeConexion) {
            mensajeConexion.className = "alert alert-success";
            mensajeConexion.classList.remove("d-none");
            mensajeConexion.textContent = `Conexión simulada cargada para la consulta: ${consulta.servidor} (BD: ${consulta.baseDatos}).`;
        }

        cargarTablasEnSelector(consulta.tabla);

        camposSeleccionadosLista = consulta.campos ? [...consulta.campos] : [];
        renderCamposSeleccionados();
        generarConsultaSQL();

        const modalEl = document.getElementById("modalNuevaConsulta");
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.show();

            const tabConsulta = document.getElementById("tab-consulta-tab");
            if (tabConsulta) {
                const tab = new bootstrap.Tab(tabConsulta);
                tab.show();
            }
        }
    }

    function generarEstadoCuadros() {
        const nombresCuadros = Array.from({ length: 35 }, (_, i) => `Cuadro estadístico ${String(i + 1).padStart(2, "0")}`);
        estadoCuadros = nombresCuadros.map((nombre, index) => {
            const rand = Math.random();
            let estado = "ok";
            if (rand < 0.2) estado = "error";
            else if (rand < 0.35) estado = "parcial";

            return {
                nombre,
                estado,
                errores:
                    estado === "error" || estado === "parcial"
                        ? [
                              { campo: "Fecha", valor: estado === "error" ? "" : "2026-13-45", problema: estado === "error" ? "Campo vacío" : "Fecha inválida" },
                              { campo: "Saldo inicial", valor: estado === "error" ? "null" : "NaN", problema: "Dato incorrecto" },
                          ]
                        : [],
            };
        });
    }

    function renderCuadrosDashboard(filtro = null) {
        if (!cuadrosDashboardBody) return;
        cuadrosDashboardBody.innerHTML = "";

        const filtrados = filtro === "todos" || filtro === null
            ? estadoCuadros
            : estadoCuadros.filter((c) => c.estado === filtro);

        if (filtrados.length === 0) {
            cuadrosDashboardBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-3">No hay cuadros que coincidan con el filtro seleccionado.</td></tr>`;
            return;
        }

        filtrados.forEach((item) => {
            const tr = document.createElement("tr");
            let colorClass = "bg-success";
            let labelText = "OK";
            if (item.estado === "parcial") {
                colorClass = "bg-warning";
                labelText = "Parcial";
            } else if (item.estado === "error") {
                colorClass = "bg-danger";
                labelText = "Error";
            }

            tr.innerHTML = `
                <td>
                    <span class="badge ${colorClass}">${labelText}</span>
                </td>
                <td>${item.nombre}</td>
                <td>
                    ${
                        item.estado !== "ok"
                            ? `<button type="button" class="btn btn-sm btn-outline-danger btn-ver-tabla" data-cuadro="${item.nombre}">
                                   Ver tabla
                               </button>`
                            : `<span class="text-muted small">Sin errores</span>`
                    }
                </td>
            `;
            cuadrosDashboardBody.appendChild(tr);
        });

        document.querySelectorAll(".btn-ver-tabla").forEach((btn) => {
            btn.addEventListener("click", () => {
                const nombreCuadro = btn.getAttribute("data-cuadro");
                const cuadro = estadoCuadros.find((c) => c.nombre === nombreCuadro);
                if (!cuadro) return;

                if (tituloErrorCuadro) {
                    tituloErrorCuadro.textContent = `El cuadro "${nombreCuadro}" presenta los siguientes errores:`;
                }

                if (tablaErroresBody) {
                    tablaErroresBody.innerHTML = "";
                    cuadro.errores.forEach((err) => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${err.campo}</td>
                            <td>${err.valor}</td>
                            <td>${err.problema}</td>
                        `;
                        tablaErroresBody.appendChild(tr);
                    });
                }

                const modalEl = document.getElementById("modalVerTablaErrores");
                if (modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.show();
                }
            });
        });
    }

    function actualizarResumen() {
        const seleccionados = Array.from(document.querySelectorAll('#listaConsultasDashboard input[type="checkbox"]:checked'));
        const totalConsultas = seleccionados.length;

        const ok = estadoCuadros.filter((c) => c.estado === "ok").length;
        const parcial = estadoCuadros.filter((c) => c.estado === "parcial").length;
        const error = estadoCuadros.filter((c) => c.estado === "error").length;

        if (resumenConsultas) resumenConsultas.textContent = String(totalConsultas);
        if (resumenOk) resumenOk.textContent = String(ok);
        if (resumenParcial) resumenParcial.textContent = String(parcial);
        if (resumenError) resumenError.textContent = String(error);
    }

    function configurarClicksResumen() {
        if (cardResumenOk) {
            cardResumenOk.style.cursor = "pointer";
            cardResumenOk.addEventListener("click", () => {
                filtroActual = "ok";
                renderCuadrosDashboard(filtroActual);
                seccionCuadrosDashboard.style.display = "block";
            });
        }
        if (cardResumenParcial) {
            cardResumenParcial.style.cursor = "pointer";
            cardResumenParcial.addEventListener("click", () => {
                filtroActual = "parcial";
                renderCuadrosDashboard(filtroActual);
                seccionCuadrosDashboard.style.display = "block";
            });
        }
        if (cardResumenError) {
            cardResumenError.style.cursor = "pointer";
            cardResumenError.addEventListener("click", () => {
                filtroActual = "error";
                renderCuadrosDashboard(filtroActual);
                seccionCuadrosDashboard.style.display = "block";
            });
        }
        if (cardResumenTodos) {
            cardResumenTodos.style.cursor = "pointer";
            cardResumenTodos.addEventListener("click", () => {
                filtroActual = "todos";
                renderCuadrosDashboard(filtroActual);
                seccionCuadrosDashboard.style.display = "block";
            });
        }
    }

    if (btnSeleccionarTodos) {
        btnSeleccionarTodos.addEventListener("click", () => {
            const checkboxes = listaConsultasDashboard?.querySelectorAll('input[type="checkbox"]') || [];
            const todosSeleccionados = Array.from(checkboxes).every((chk) => chk.checked);

            checkboxes.forEach((chk) => {
                chk.checked = !todosSeleccionados;
            });

            btnSeleccionarTodos.textContent = todosSeleccionados ? "Seleccionar todos" : "Deseleccionar todos";
        });
    }

    if (btnConectarSQL) {
        btnConectarSQL.addEventListener("click", () => {
            const servidor = (sqlServidor?.value || "").trim();
            const baseDatos = (sqlBaseDatos?.value || "").trim();
            const usuario = (sqlUsuario?.value || "").trim();
            const contrasena = (sqlContrasena?.value || "").trim();
            const puerto = (sqlPuerto?.value || "").trim();

            if (!servidor || !baseDatos || !usuario || !contrasena) {
                if (mensajeConexion) {
                    mensajeConexion.className = "alert alert-danger";
                    mensajeConexion.classList.remove("d-none");
                    mensajeConexion.textContent = "Completa todos los campos de conexión (servidor, base de datos, usuario y contraseña).";
                }
                return;
            }

            if (mensajeConexion) {
                mensajeConexion.className = "alert alert-success";
                mensajeConexion.classList.remove("d-none");
                mensajeConexion.textContent = `Conexión establecida con el servidor ${servidor} (BD: ${baseDatos}).`;
            }

            cargarTablasEnSelector();

            const tabTablas = document.getElementById("tab-tablas-tab");
            if (tabTablas) {
                const tab = new bootstrap.Tab(tabTablas);
                tab.show();
            }
        });
    }

    if (btnLimpiarConexion) {
        btnLimpiarConexion.addEventListener("click", () => {
            if (sqlServidor) sqlServidor.value = "";
            if (sqlBaseDatos) sqlBaseDatos.value = "";
            if (sqlUsuario) sqlUsuario.value = "";
            if (sqlContrasena) sqlContrasena.value = "";
            if (sqlPuerto) sqlPuerto.value = "";

            if (mensajeConexion) {
                mensajeConexion.classList.add("d-none");
                mensajeConexion.textContent = "";
            }

            if (selectorTabla) selectorTabla.innerHTML = "";
            if (listaCampos) listaCampos.innerHTML = "";
            if (camposSeleccionados) camposSeleccionados.innerHTML = "";
            camposSeleccionadosLista = [];
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
        selectorTabla.dispatchEvent(new Event("change"));

        selectorTabla.onchange = () => {
            const idx = parseInt(selectorTabla.value, 10);
            const tabla = tablasEjemplo[idx];
            if (!tabla) {
                if (listaCampos) listaCampos.innerHTML = "";
                return;
            }

            if (listaCampos) {
                listaCampos.innerHTML = "";
                tabla.campos.forEach((campo) => {
                    const div = document.createElement("div");
                    div.className = "form-check";
                    div.innerHTML = `
                        <input class="form-check-input campo-check" type="checkbox" value="${campo}" id="chkCampo${campo}" />
                        <label class="form-check-label" for="chkCampo${campo}">${campo}</label>
                    `;
                    listaCampos.appendChild(div);
                });
            }
        };
    }

    if (btnAgregarCamposSeleccion) {
        btnAgregarCamposSeleccion.addEventListener("click", () => {
            const checks = listaCampos?.querySelectorAll(".campo-check:checked") || [];
            const nuevosCampos = Array.from(checks).map((c) => c.value);

            nuevosCampos.forEach((campo) => {
                if (!camposSeleccionadosLista.includes(campo)) {
                    camposSeleccionadosLista.push(campo);
                }
            });

            renderCamposSeleccionados();
            generarConsultaSQL();
        });
    }

    if (btnLimpiarCamposSeleccion) {
        btnLimpiarCamposSeleccion.addEventListener("click", () => {
            camposSeleccionadosLista = [];
            renderCamposSeleccionados();
            generarConsultaSQL();
        });
    }

    function renderCamposSeleccionados() {
        if (!camposSeleccionados) return;
        camposSeleccionados.innerHTML = "";

        if (camposSeleccionadosLista.length === 0) {
            camposSeleccionados.innerHTML = `<div class="text-muted small p-2">No hay campos seleccionados.</div>`;
            return;
        }

        camposSeleccionadosLista.forEach((campo, idx) => {
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between align-items-center";
            div.innerHTML = `
                <span>${campo}</span>
                <button type="button" class="btn btn-sm btn-outline-danger" data-idx="${idx}">Quitar</button>
            `;
            camposSeleccionados.appendChild(div);
        });

        camposSeleccionados.querySelectorAll("button[data-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                camposSeleccionadosLista.splice(idx, 1);
                renderCamposSeleccionados();
                generarConsultaSQL();
            });
        });
    }

    function generarConsultaSQL() {
        if (!textoConsultaSQL) return;

        const tablaSeleccionadaIdx = selectorTabla?.value;
        const tabla = tablaSeleccionadaIdx !== undefined ? tablasEjemplo[parseInt(tablaSeleccionadaIdx, 10)] : null;
        const nombreTabla = tabla ? tabla.nombre : "tabla";

        let sql = "SELECT ";
        if (camposSeleccionadosLista.length === 0) {
            sql += "* ";
        } else {
            sql += camposSeleccionadosLista.join(", ") + " ";
        }
        sql += `FROM ${nombreTabla}`;

        textoConsultaSQL.value = sql;
    }

    if (btnGuardarConsulta) {
        btnGuardarConsulta.addEventListener("click", () => {
            const nombre = (nombreConsulta?.value || "").trim();
            const descripcion = (descripcionConsulta?.value || "").trim();
            const sql = (textoConsultaSQL?.value || "").trim();

            const servidor = (sqlServidor?.value || "").trim();
            const baseDatos = (sqlBaseDatos?.value || "").trim();
            const usuario = (sqlUsuario?.value || "").trim();
            const contrasena = (sqlContrasena?.value || "").trim();
            const puerto = (sqlPuerto?.value || "").trim();

            const tablaSeleccionadaIdx = selectorTabla?.value;
            const tabla = tablaSeleccionadaIdx !== undefined ? tablasEjemplo[parseInt(tablaSeleccionadaIdx, 10)] : null;
            const nombreTabla = tabla ? tabla.nombre : "";

            if (!nombre) {
                alert("Indica un nombre para la consulta.");
                return;
            }

            if (consultaAEditarId !== null) {
                const idx = consultas.findIndex((c) => c.id === consultaAEditarId);
                if (idx !== -1) {
                    consultas[idx].nombre = nombre;
                    consultas[idx].descripcion = descripcion;
                    consultas[idx].sql = sql;
                    consultas[idx].servidor = servidor;
                    consultas[idx].baseDatos = baseDatos;
                    consultas[idx].usuario = usuario;
                    consultas[idx].contrasena = contrasena;
                    consultas[idx].puerto = puerto;
                    consultas[idx].tabla = nombreTabla;
                    consultas[idx].campos = [...camposSeleccionadosLista];
                }
            } else {
                const nuevoId = consultas.length > 0 ? Math.max(...consultas.map((c) => c.id)) + 1 : 1;
                consultas.push({
                    id: nuevoId,
                    nombre,
                    descripcion,
                    sql,
                    servidor,
                    baseDatos,
                    usuario,
                    contrasena,
                    puerto,
                    tabla: nombreTabla,
                    campos: [...camposSeleccionadosLista]
                });
            }

            renderConsultas();

            const modalEl = document.getElementById("modalNuevaConsulta");
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            if (nombreConsulta) nombreConsulta.value = "";
            if (descripcionConsulta) descripcionConsulta.value = "";
            if (textoConsultaSQL) textoConsultaSQL.value = "";
            camposSeleccionadosLista = [];
            renderCamposSeleccionados();
            consultaAEditarId = null;
        });
    }

    if (btnActualizarConsulta) {
        btnActualizarConsulta.addEventListener("click", () => {
            const seleccionados = Array.from(listaConsultasDashboard?.querySelectorAll('input[type="checkbox"]:checked') || []);
            if (seleccionados.length === 0) {
                alert("Selecciona una consulta en la lista para actualizarla con la configuración actual.");
                return;
            }

            const nombre = (nombreConsulta?.value || "").trim();
            const descripcion = (descripcionConsulta?.value || "").trim();
            const sql = (textoConsultaSQL?.value || "").trim();

            const servidor = (sqlServidor?.value || "").trim();
            const baseDatos = (sqlBaseDatos?.value || "").trim();
            const usuario = (sqlUsuario?.value || "").trim();
            const contrasena = (sqlContrasena?.value || "").trim();
            const puerto = (sqlPuerto?.value || "").trim();

            const tablaSeleccionadaIdx = selectorTabla?.value;
            const tabla = tablaSeleccionadaIdx !== undefined ? tablasEjemplo[parseInt(tablaSeleccionadaIdx, 10)] : null;
            const nombreTabla = tabla ? tabla.nombre : "";

            seleccionados.forEach((chk) => {
                const id = parseInt(chk.value, 10);
                const idx = consultas.findIndex((c) => c.id === id);
                if (idx !== -1) {
                    consultas[idx].nombre = nombre || consultas[idx].nombre;
                    consultas[idx].descripcion = descripcion || consultas[idx].descripcion;
                    consultas[idx].sql = sql || consultas[idx].sql;
                    consultas[idx].servidor = servidor || consultas[idx].servidor;
                    consultas[idx].baseDatos = baseDatos || consultas[idx].baseDatos;
                    consultas[idx].usuario = usuario || consultas[idx].usuario;
                    consultas[idx].contrasena = contrasena || consultas[idx].contrasena;
                    consultas[idx].puerto = puerto || consultas[idx].puerto;
                    consultas[idx].tabla = nombreTabla || consultas[idx].tabla;
                    consultas[idx].campos = camposSeleccionadosLista.length > 0 ? [...camposSeleccionadosLista] : consultas[idx].campos;
                }
            });

            renderConsultas();
            alert("Consulta(s) actualizada(s) correctamente.");
        });
    }

    if (btnEjecutarConsultas) {
        btnEjecutarConsultas.addEventListener("click", () => {
            const seleccionados = Array.from(document.querySelectorAll('#listaConsultasDashboard input[type="checkbox"]:checked')).map(
                (chk) => chk.value
            );

            if (seleccionados.length === 0) {
                alert("Selecciona al menos una consulta para ejecutar.");
                return;
            }

            alert(`Ejecutando ${seleccionados.length} consulta(s)...`);
            generarEstadoCuadros();
            actualizarResumen();

            dashboardResumen.style.display = "flex";
            seccionCuadrosDashboard.style.display = "none";
            filtroActual = null;

            if (btnSeleccionarTodos) {
                btnSeleccionarTodos.textContent = "Seleccionar todos";
            }
        });
    }

    renderConsultas();
    generarEstadoCuadros();
    configurarClicksResumen();
})();