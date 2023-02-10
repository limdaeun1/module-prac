import axios from 'axios'

import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context'

const useGet = (url, id = '') => {
	const context = useContext(AppContext)

	const [res, setRes] = useState(null)

	useEffect(() => {
		context.loadingOn()

		axios
			.get(url + '/' + id)
			.then((res) => setRes(id === '' ? res.data.content : res.data))
			.catch((err) => console.log(err))
			.finally(() => {
				context.loadingOff()
			})
		// eslint-disable-next-line
	}, [url, context.state.sequence])

	return res
}

const post = (context, url, data) => {
	call('post', context, url, data)
}

const put = (context, url, data) => {
	call('put', context, url, data)
}

const patch = (context, url, data) => {
	call('patch', context, url, data)
}

const remove = (context, url, id) => {
	call('delete', context, url + '/' + id, null)
}

const call = (method, context, url, data) => {
	context.loadingOn()

	axios
		.request({
			method: method,
			baseURL: url,
			data: data,
		})
		.then((res) => console.log(res))
		.catch((err) => alert(err.message))
		.finally(() => {
			context.sequencing()
			context.loadingOff()
		})
}

export { useGet, post, put, patch, remove }
