import { ChangeEvent } from 'react'
import classes from './Slider.module.css'

type Props = {
	labels: string[]
	value: number
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Slider = ({ labels, value, onChange }: Props) => {
	const leftParagraphCss = value < 50 ? classes.leftParagraph : ''
	const rightParagraphCss = value > 70 ? classes.activeOption : ''

	return (
		<div className={classes.root}>
			<p className={leftParagraphCss}>{labels[0]}</p>
			<input type='range' value={value} onChange={onChange} min='0' max='100' />
			<p className={rightParagraphCss}>{labels[1]}</p>
		</div>
	)
}
