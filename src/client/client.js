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
	return await http.post('api/createUser', token, data)
}

export async function assignTeacher(data) {
	const res = await http.post('api/assignTeacher', token, data)
}

export async function assignStudents(data) {
	const res = await http.post('api/assignStudents', token, data)
}