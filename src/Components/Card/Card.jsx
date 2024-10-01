import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import theme from '../../Components/Temas/temaBotao'

import styles from './card.module.css'

function Card(props){
    return(
        <div className={styles.cardContainer}>
            {props.children}
        </div>
    )
}

export default Card