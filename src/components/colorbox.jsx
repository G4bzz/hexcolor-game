import React from "react";
import { useEffect, useState } from "react";
import styles from './colorBox.module.css';

export default function ColorBox(){
	const [actualColor, setColor] = useState('');
	const [randomAnswers, setRandomAnswers] = useState([]);
	const [result, setResult] = useState(null);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

	function getRandomColor(){
		return `#${(Math.random()*0xffffff>>>32).toString(16)}`;
	};

	function generateColors(){
		const actualColor = getRandomColor()
		setColor(actualColor);
		setRandomAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => Math.random() - .5));
	};

	useEffect(() => {
		generateColors();
	}, []);

	function handleColorClicked(color){
		if(color === actualColor){
			setResult(true);
			setCorrectAnswersCount(correctAnswersCount + 1);
		}
		else {
			setResult(false);
			setCorrectAnswersCount(0);
		}
		generateColors();
	};

	return(
		<div className={styles.mainContainer}>
			<h1>Points: {correctAnswersCount}</h1>
			<i className={styles.colorContainer} style={{backgroundColor: actualColor, filter:`drop-shadow(0 0 .5vw ${actualColor})`}}></i>
			<div className={styles.buttonContainer}>
				{randomAnswers.map((color) => <button key={color} onClick={() => handleColorClicked(color)}>{color}</button>)}
			</div>
			{ result != null ? result? <h1 className={styles.correct}>Correct👍</h1>: <h1 className={styles.wrong}>Wrong answer 👎</h1> : <h1><br></br></h1>}
		</div>
	)
}