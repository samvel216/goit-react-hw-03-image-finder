import { BallTriangle } from 'react-loader-spinner';
import styles from './Loader.module.css';
export default function Loader() {
  return (
    <div className={styles.svgContainer}>
      <BallTriangle
        color="#00BFFF"
        height={200}
        width={200}
      />
    </div>
  );
}
