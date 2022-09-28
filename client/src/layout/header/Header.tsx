import { Link, useLocation } from "react-router-dom";
import st from "./Header.module.scss";

const headerItemsL = [
    {
        item: "Notes",
        pathname: "/notes",
    },
    {
        item: "Archive",
        pathname: "/archive",
    },
    {
        item: "Summary",
        pathname: "/stats",
    },
];

const headerItemsR = [
    {
        item: (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 45.402 45.402"
            >
                <path
                    d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                />
            </svg>
        ),
        pathname: "/new",
    },
];

const Header = () => {
    const { pathname } = useLocation();

    return (
        <header className={st.root}>
            <div className={st.items}>
                {headerItemsL.map((i) => (
                    <Link
                        className={pathname === i.pathname ? st.active : ""}
                        key={i.pathname}
                        to={i.pathname}
                    >
                        {i.item}
                    </Link>
                ))}
            </div>

            <div className={st.items}>
                {headerItemsR.map((i) => (
                    <Link
                        className={pathname === i.pathname ? st.active : ""}
                        key={i.pathname}
                        to={i.pathname}
                    >
                        {i.item}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Header;
