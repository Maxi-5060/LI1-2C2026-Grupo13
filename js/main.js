document.addEventListener("DOMContentLoaded", function() {

    // ===========
    // Modo oscuro
    // ===========

    const botonTema = document.getElementById("toggleTema");
    const body = document.body;

    // Recuperar tema guardado
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "oscuro") {
        body.classList.add("modo-oscuro");
    }

    // Cambiar entre modo claro y oscuro
    if (botonTema) {
        actualizarTextoBoton();

            botonTema.addEventListener("click", function() {
                body.classList.toggle("modo-oscuro");

                // Guardar la preferencia

                if(body.classList.contains("modo-oscuro")) {
                    localStorage.setItem("tema", "oscuro");
                } else {
                    localStorage.setItem("tema", "claro");
                }

            actualizarTextoBoton();
        });
    }

    function actualizarTextoBoton() {
        if (body.classList.contains("modo-oscuro")) {
            botonTema.textContent = "☀️ Modo Claro";
        } else {
            botonTema.textContent = "🌙 Modo Oscuro";
        }
    }


    // =====================================
    // Validación del formulario de contacto
    // =====================================

    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function(evento) {

            //Evita el envio si hay errores
            evento.preventDefault();

            const nombre = document.getElementById("nombre");
            const telefono = document.getElementById("telefono");
            const email = document.getElementById("email");
            const consulta = document.getElementById("consulta");

            let formularioValido = true;

            // Limpiar errores anteriores
            formulario.querySelectorAll(".error-validacion").forEach(
                function (mensaje) {
                    mensaje.remove();
                }
            );
            
            formulario.querySelectorAll(".campo-invalido").forEach(
            function (campo) {
                campo.classList.remove("campo-invalido");
            }
        );

        // Función para mostrar errores
        function mostrarError(campo, mensaje) {
            const error = document.createElement("small");

            error.className = "error-validacion";
            error.textContent = mensaje;

            campo.classList.add("campo-invalido");
            campo.insertAdjacentElement("afterend", error);

            formularioValido = false;
        }

        // Validar nombre
        if (nombre.value.trim().length < 2) {
            mostrarError(
                nombre,
                "El nombre debe tener al menos 2 caracteres."
            );
        }

        // validar teléfono
        const numeroLimpio = telefono.value.replace (/[\s()+,-]/g, "");

        if(!/^\d{7,15}$/.test(numeroLimpio)) {
            mostrarError(
                telefono,
                "Ingresá un teléfono válido de entre 7 a 15 dígitos."
            );
        }

        // Validar email 
        if (
            email.value.trim() === "" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
        ) {
            mostrarError(
                email,
                "Ingresá una dirección de email válida."
            );
        }

        // Validar consulta
        if (consulta.value.trim().length < 10) {
            mostrarError(
                consulta,
                "La consulta debe tener al menos 10 caracteres."
            );
        }

        // Resultado de la validación
        let resultado= document.getElementById("resultadoFormulario");

        if (!resultado) {
            resultado = document.createElement("p");
            resultado.id = "resultadoFormulario";
            resultado.setAttribute("role", "status");
            resultado.setAttribute("aria-live", "polite");
            formulario.appendChild(resultado);
        }

        if (formularioValido) {
            resultado.textContent =
                "¡Formulario validado correctamente!";

            resultado.className = "mensaje-exito";

            // No se envia el formulario a ningun servidor debido a que no existe aún :p

        } else {
            resultado.textContent =
                "Revisá los campos marcados antes de continuar.";

            resultado.className = "mensaje-error";

            formulario.querySelector(".campo-invalido")?.focus();
            }
        });
    }

});