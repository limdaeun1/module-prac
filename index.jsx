import { createContext, useReducer } from 'react'

export const AppContext = createContext(null)

const reducer = (state, action) => {
	switch (action.type) {
		case 'SEQUENCING':
			return {
				...state,
				sequence: state.sequence + 1,
			}
		case 'LOADING_ON':
			return {
				...state,
				loading: true,
			}
		case 'LOADING_OFF':
			return {
				...state,
				loading: false,
			}
		default:
			throw new Error('invalid action type')
	}
}

const Context = ({ children }) => {
	const [state, setState] = useReducer(reducer, {
		sequence: 0,
		loading: false,
	})

	const sequencing = () => {
		setState({ type: 'SEQUENCING' })
	}

	const loadingOn = () => {
		setState({ type: 'LOADING_ON' })
	}

	const loadingOff = () => {
		setState({ type: 'LOADING_OFF' })
	}

	return (
		<AppContext.Provider
			value={{
				state,
				setState,
				sequencing,
				loadingOn,
				loadingOff,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default Context
