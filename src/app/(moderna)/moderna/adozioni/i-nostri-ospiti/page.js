"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { db } from "@lib/db";
// import PreviewCardsSection from "../../components/PreviewCardsSection";
import PreviewCardsSection from "@shared-components/PreviewCardsSection";

export default function page() {
  const [filters, setFilters] = useState({
    taglia: "all",
    sesso: "all",
    // add more filters
  });

  const filteredData = db.filter((animal) => {
    if (filters.taglia !== "all" && animal.taglia !== filters.taglia)
      return false;
    if (filters.sesso !== "all" && animal.sesso !== filters.sesso) return false;
    return true;
  });
  return (
    <div className={styles.ospitiPage}>
      <title>I nostri ospiti | Canile di Macondo</title>
      <meta
        name="description"
        content="Scopri i nostri ospiti, i cani in attesa di adozione presso il Canile di Macondo."
      />
      <section className="first-section">
        <h1>I nostri ospiti</h1>
        <p>inserire warning card</p>
        <div className={styles.filters}>
          <select
            value={filters.sesso}
            onChange={(e) => setFilters({ ...filters, sesso: e.target.value })}
          >
            <option value="all">All sesso</option>
            <option value="Maschio">Maschio</option>
            <option value="Femmina">Femmina</option>
          </select>
          <select
            value={filters.taglia}
            onChange={(e) => setFilters({ ...filters, taglia: e.target.value })}
          >
            <option value="all">All taglia</option>
            <option value="piccola">piccola</option>
            <option value="media">media</option>
            <option value="grande">grande</option>
          </select>
          <select
            value={filters.taglia}
            onChange={(e) => setFilters({ ...filters, taglia: e.target.value })}
          >
            <option value="all">All età</option>
            <option value="piccola">piccola</option>
            <option value="media">media</option>
            <option value="grande">grande</option>
          </select>
        </div>
        <div>
          {filteredData.length > 0 ? (
            <PreviewCardsSection
              data={filteredData}
              backgroundColor="var(--accent-one)"
              color="var(--text-dark)"
              versione="moderna"
            />
          ) : (
            <p style={{ textAlign: "center", marginBottom: "25px" }}>
              Al momento non abbiamo ospiti con queste caratteristiche!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
