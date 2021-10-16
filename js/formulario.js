const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	user: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "user":
			validarCampo(expresiones.user, e.target, 'user');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`team__${campo}`).classList.remove('formulario__team-incorrecto');
		document.getElementById(`team__${campo}`).classList.add('formulario__team-correcto');
		document.querySelector(`#team__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#team__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#team__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`team__${campo}`).classList.add('formulario__team-incorrecto');
		document.getElementById(`team__${campo}`).classList.remove('formulario__team-correcto');
		document.querySelector(`#team__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#team__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#team__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`team__password2`).classList.add('formulario__team-incorrecto');
		document.getElementById(`team__password2`).classList.remove('formulario__team-correcto');
		document.querySelector(`#team__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#team__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#team__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`team__password2`).classList.remove('formulario__team-incorrecto');
		document.getElementById(`team__password2`).classList.add('formulario__team-correcto');
		document.querySelector(`#team__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#team__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#team__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.user && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__team-correcto').forEach((icono) => {
			icono.classList.remove('formulario__team-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});