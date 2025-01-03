"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";
import { List, X } from "@phosphor-icons/react/dist/ssr";

export default function Navbar() {
  const pathname = usePathname();

  function isActiveFunction(paths, currentPath) {
    return paths.includes(currentPath);
  }

  // dà la classe active al mainLink anche se il path è in un sublink
  const adozioniPaths = [
    "/tradizionale/adozioni",
    "/tradizionale/adozioni/come-funziona",
    "/tradizionale/adozioni/i-nostri-ospiti",
    "/tradizionale/adozioni/adozioni-a-distanza",
  ];
  const isAdozioniActive = isActiveFunction(adozioniPaths, pathname);

  const comeAiutarciPaths = [
    "/tradizionale/come-aiutarci",
    "/tradizionale/come-aiutarci/chi-siamo",
    "/tradizionale/come-aiutarci/donazioni",
    "/tradizionale/come-aiutarci/volontariato",
  ];
  const isComeAiutarciActive = isActiveFunction(comeAiutarciPaths, pathname);

  const [menuOpen, setMenuOpen] = useState(false);

  function handleOpenMenu() {
    setMenuOpen(!menuOpen);
  }

  // Chiude il menu quando si clicca un link
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [pathname]); //  L'effect si attiva quando cambia pathname

  // blocca scrolling quando menu aperto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
  }, [menuOpen]);

  const [openSubLinks, setOpenSubLinks] = useState({
    adozioni: false,
    comeAiutarci: false,
  });

  function toggleSubLinks(section) {
    setOpenSubLinks((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  }

  useEffect(() => {
    setOpenSubLinks({
      adozioni: isAdozioniActive,
      comeAiutarci: isComeAiutarciActive,
    });
  }, [pathname, isAdozioniActive, isComeAiutarciActive]);

  //   move menuButtons in Header and lift the state (?)

  return (
    <>
      <div
        className={`${styles.overlay} ${menuOpen && "opacity1"}`}
        onClick={handleOpenMenu}
      ></div>

      <div className={styles.mobileMenuButtons}>
        <button
          className={`${styles.menuButton} ${menuOpen ? "hidden" : "showing"}`}
          onClick={handleOpenMenu}
        >
          <List size={24} weight="bold" />
        </button>
        <button
          className={`${styles.closeButton} ${menuOpen ? "showing" : "hidden"}`}
          onClick={handleOpenMenu}
        >
          <X size={24} weight="bold" />
        </button>
      </div>
      <nav
        className={`${styles.navbar} ${
          menuOpen ? styles.menuOpened : styles.menuClosed
        }`}
      >
        <ul>
          <li>
            <Link
              href="/tradizionale"
              className={`${
                pathname === "/tradizionale" ? styles.active : ""
              } ${styles.mainLink}`}
            >
              Homepage
            </Link>
          </li>
          <li className={styles.navItem}>
            <span
              onClick={() => toggleSubLinks("adozioni")}
              className={`${styles.parentLink} ${styles.mainLink} ${
                isAdozioniActive ? styles.active : ""
              } `}
            >
              Adozioni <CaretDown size={15} weight="bold" />
            </span>
            <ul
              className={`${styles.subLinks} ${
                openSubLinks.adozioni || isAdozioniActive
                  ? styles.subLinksOpened
                  : styles.subLinksClosed
              } `}
            >
              <li>
                <Link
                  href="/tradizionale/adozioni/come-funziona"
                  className={
                    pathname === "/tradizionale/adozioni/come-funziona"
                      ? `${styles.active}`
                      : ""
                  }
                >
                  Come funziona
                </Link>
              </li>
              <li>
                <Link
                  href="/tradizionale/adozioni/i-nostri-ospiti"
                  className={
                    pathname === "/tradizionale/adozioni/i-nostri-ospiti"
                      ? `${styles.active}`
                      : ""
                  }
                >
                  I nostri ospiti
                </Link>
              </li>
              <li>
                <Link
                  href="/tradizionale/adozioni/adozioni-a-distanza"
                  className={
                    pathname === "/tradizionale/adozioni/adozioni-a-distanza"
                      ? `${styles.active}`
                      : ""
                  }
                >
                  Adozioni a distanza
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.navItem}>
            <span
              onClick={() => toggleSubLinks("comeAiutarci")}
              className={`${styles.parentLink} ${styles.mainLink} ${
                isComeAiutarciActive ? styles.active : ""
              }`}
            >
              Come aiutarci <CaretDown size={15} weight="bold" />
            </span>
            <ul
              className={`${styles.subLinks} ${
                openSubLinks.comeAiutarci || isComeAiutarciActive
                  ? styles.subLinksOpened
                  : styles.subLinksClosed
              }`}
            >
              <li>
                <Link
                  href="/tradizionale/come-aiutarci/chi-siamo"
                  className={
                    pathname === "/tradizionale/come-aiutarci/chi-siamo"
                      ? `${styles.active}`
                      : ""
                  }
                >
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/tradizionale/come-aiutarci/donazioni"
                  className={
                    pathname === "/tradizionale/come-aiutarci/donazioni"
                      ? `${styles.active}`
                      : ""
                  }
                >
                  Donazioni
                </Link>
              </li>
              <li>
                <Link
                  href="/tradizionale/come-aiutarci/volontariato"
                  className={
                    pathname === "/tradizionale/come-aiutarci/volontariato"
                      ? `${styles.active}`
                      : ""
                  }
                >
                  Volontariato
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/tradizionale/contatti"
              className={`${
                pathname === "/tradizionale/contatti" ? styles.active : ""
              } ${styles.mainLink}`}
            >
              Contatti
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
