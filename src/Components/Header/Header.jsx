import styles from './header.module.css'

/*Header contém a estrutura da barra de navegação:
    Altura;
    Cor de fundo;
    Logo.

    A props.children vai permitir ter barras de navegação diferentes conforme a necessidade de cada página.
*/

function Header(props){
    return(
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <img src="/logo.png" alt="Logo do sistema" width={'40px'} />
                <h2>BuscaFit</h2>
            </div>
            <nav className={styles.navbar}>
                {props.children}
            </nav>
        </header>
    )
}

export default Header

