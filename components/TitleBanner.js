import styles from "./TitleBanner.module.css";
import Image from "next/image";

export default function TitleBanner({
  imgSrc,
  children,
  objectPosition = "center",
}) {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.backgroundImage}>
        <Image
          src={imgSrc}
          alt=""
          style={{ objectPosition: `center ${objectPosition}` }}
        />
      </div>
      <h1>{children}</h1>
    </div>
  );
}
