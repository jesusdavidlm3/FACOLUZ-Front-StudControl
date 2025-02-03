import { httpMethods } from './httpMethods'

const http = new httpMethods()
let token

export async function login(data){
	const res = await http.post('api/login', null, data)
	if(res.status == 200){
		token = res.data.jwt
	}
	return res
}

export async function createUser(data) {
	const res = await http.post('api/createUser', token, data)
	return res
}

export async function deleteUser(userId) {
	const res = await http.delete(`api/deleteUser/${userId}`)
	return res
}

export async function reactivateUser(data) {
	const res = await http.patch('api/reactivateUser')
}

export async function assignTeacher(data) {
	const res = await http.post('api/assignTeacher', token, data)
	return res
}

export async function assignStudents(data) {
	const res = await http.post('api/assignStudents', token, data)
	return res
}

export async function getSectionInfo(data) {
	const res = await http.get('api/getSectioninfo',token, data)
	return res
}

export async function getAsignatureInfo(section, asignature) {
	const res = await http.get(`api/getAsignatureinfo/${section}/${asignature}`)
	return res
}

export async function clearAllAsignatures() {
	const res = await http.delete('api/clearAllAsignatures')
	return res
}

export async function clearAsignature(asignature) {
	const res = await http.delete(`api/clearAsignature/${asignature}`)
	return res
}

export async function getInfoByIdentification(identification){
	const res = await http.get(`api/getInfoByIdentification/${identification}`)
}

