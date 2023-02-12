import { ClockCounterClockwise, UserPlus } from "phosphor-react";
import { NavLink } from "react-router-dom";

import styles from './index.module.css'

export function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink to="/" title="Tabela" end>
                <ClockCounterClockwise size={35} weight="bold" />
                </NavLink>
                <NavLink to="/cadastro" title="Cadastro" end>
                    <UserPlus size={35} weight="bold" />
                </NavLink>
            </nav>
        </header>
    )
}