import React, { useContext } from 'react'
import { AppContext } from './context'
import { useGet, post, remove } from './http/http'

const App = () => {
	const context = useContext(AppContext)

	const structure = useGet('http://localhost:30000/api/conveyors')

	console.log(structure)

	const postFunc = () => {
		post(context, 'http://localhost:30000/api/conveyors', {})
	}

	const removeFunc = () => {
		remove(
			context,
			'http://localhost:30000/api/conveyors',
			Number(document.querySelector('.number').value)
		)
	}

	return (
		<div>
			{context.state.loading.toString()}
			<button onClick={() => context.sequencing()}>sequencing</button>
			<button onClick={() => postFunc()}>post</button>
			<input className='number' type='number' />
			<button onClick={() => removeFunc()}>remove</button>
			{context.state.loading ? <div className='test'></div> : null}
			{structure != null
				? structure.map((cv, i) => <p key={i}>{cv.id}</p>)
				: null}
		</div>
	)
}

export default App
