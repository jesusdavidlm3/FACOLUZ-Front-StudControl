import { httpMethods } from './httpMethods'

const http = new httpMethods()
let token

export async function login(data){		//inicio de sesion
	const res = await http.post('api/login', null, data)
	if(res.status == 200){
		token = res.data.jwt
	}
	return res
}

export async function createUser(data) {		//Crear un usuario (solo de tipo alumno)
	const res = await http.post('api/createUser', token, data)
	return res
}

export async function deleteUser(userId) {		//Desactiva un usuario (Alumno)
	const res = await http.delete(`api/deleteUser/${userId}`, token)
	return res
}

export async function reactivateUser(userId) {	//Vuelve a activar usuarios que hayan sido desactivados
	const res = await http.patch(`api/reactivateUser/${userId}`, token)
	return res
}

export async function assignTeacher(data) {		//Asigna un profesor a una seccion de manera unica
	const res = await http.post('api/assignTeacher', token, data)
	return res
}

export async function asignIntoAsignature(data) {	//Asigna un alumno a una seccion
	const res = await http.post('api/asignIntoAsignature', token, data)
	return res
}

// export async function getSectionInfo(section) {
// 	const res = await http.get(`api/getSectioninfo/${section}`,token)
// 	return res
// }

export async function getAsignatureList(section, asignature) {
	const res = await http.get(`api/getAsignatureList/${section}/${asignature}`, token)
	return res
}

// export async function clearAllAsignatures() {
// 	const res = await http.delete('api/clearAllAsignatures', token, null)
// 	return res
// }

// export async function clearAsignature(asignature) {
// 	const res = await http.delete(`api/clearAsignature/${asignature}`, token)
// 	return res
// }

export async function getInfoByIdentification(identification){	//Devuelve informacion del usuario (Alumno o profesor)
	const res = await http.get(`api/getInfoByIdentification/${identification}`, token)
	return res
}

export async function verifyStudentForAssign(identification){	//Verifica si un alumno existe y esta libre para asignar
	const res = await http.get(`api/verifyStudentForAssign/${identification}`, token)
	return res
}

export async function searchByNameOrId(searchParam) {			//Devuelve estudiantes segun criterio de busqueda
	const res = await http.get(`api/searchByNameOrId/${searchParam}`, token)
	return res
}

export async function aviableTeachersList() {		//Devuelve una lista de profesores
	const res = await http.get("api/aviableTeachersList", token)
	return res
}

export async function removeFromAsignature(identification){		//Elimina el registro de un alumno asignado a una seccion
	const res = await http.delete(`api/removeFromAsignature`, token, identification)
	return res
}

export async function asignTeacher(data){			//Asigna un profesor a una seccion
	const res = await http.put("api/asignTeacher", token, data)
	return res
}

export async function getSettingsStartedPeriod(){		//Devuelve si el periodo academico se encuentra en curso
	const res = await http.get("api/getSettingsStartedPeriod", token)
	return res
}

export async function endOrStartPeriod(){		//Inicia o finaliza el periodo academico actual
	const res = await http.post("api/endOrStartPeriod", token)
	return res
}

export async function verifyForReactivate(id) {		//Verifica si un usuario (alumno) existe y si es elegible para verificacion
	const res = await http.get(`api/verifyForReactivate/${id}`, token)
	return res
}