import styles from "./footer.module.scss"

export default function Footer() {
    return (
        <div className={styles.container}>
            <p>Made with ❤️ by <a href="https://github.com/fabianbandini">Fabian</a> and <a href="https://github.com/nolu04">Noel</a></p>
        </div>
    );
}