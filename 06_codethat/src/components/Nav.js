import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.svg";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <div className={styles.nav}>
            <Container className={styles.container}>
                <Link to="/">
                    <img src={logoImg} alt="Codethat Logo" />
                </Link>
                <ul className={styles.menu}>
                    <li>
                        <Link to="/courses">카탈로그</Link>
                    </li>
                    <li>
                        <Link to="/questions">커뮤니티</Link>
                    </li>
                    <li>
                        <UserMenu />
                    </li>
                </ul>
            </Container>
        </div>
    );
}

// function Nav() {
//   return (
//     <div className={styles.nav}>
//       <Container className={styles.container}>
//         <img src={logoImg} alt="Codethat Logo" />
//         <ul className={styles.menu}>
//           <li>카탈로그</li>
//           <li>커뮤니티</li>
//           <li>
//             <UserMenu />
//           </li>
//         </ul>
//       </Container>
//     </div>
//   );
// }

export default Nav;
