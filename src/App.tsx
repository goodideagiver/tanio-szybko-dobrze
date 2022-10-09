import { ChangeEvent, useState } from 'react'
import './App.css'
import { Slider } from './Slider'

const inputs = [
	['Drogo', 'Tanio'],
	['Wolno', 'Szybko'],
	['Niedobrze', 'Dobrze'],
]

const MAX_SUM = 200

const INITIAL_SLIDERS_STATE = inputs.map((input) => ({
	name: input[0],
	value: 0,
}))

type InputsType = {
	name: string
	value: number
}

function App() {
	const [sliderValues, setSliderValues] = useState<InputsType[]>(
		INITIAL_SLIDERS_STATE
	)

	return (
		<div className='App'>
			{inputs.map((input, index) => {
				const inputValue =
					sliderValues &&
					sliderValues.find((el) => el.name === input.at(0))?.value

				const sliderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
					const newValue = event.target.value

					setSliderValues((prev) => {
						const copiedState: InputsType[] = structuredClone(prev)
						const foundEl = copiedState.find((el) => el.name === input.at(0))
						foundEl!.value = parseInt(newValue)

						const newSum: number = copiedState.reduce(
							(previus, current) => previus + current.value,
							0
						)

						if (newSum > MAX_SUM) {
							const elementsToSubtract = copiedState.filter(
								(el) => el.name !== foundEl?.name
							)
							elementsToSubtract.forEach((el) => {
								const amountToSubtract =
									(newSum - MAX_SUM) / elementsToSubtract.length
								el.value -= amountToSubtract
							})
						}

						return copiedState
					})
				}

				return (
					<Slider
						key={input[0] + index}
						value={inputValue || 0}
						onChange={sliderChangeHandler}
						labels={input}
					/>
				)
			})}
		</div>
	)
}

export default App
