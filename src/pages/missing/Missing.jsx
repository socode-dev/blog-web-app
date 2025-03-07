import { Link } from "react-router-dom";
import Style from "./missing.module.css";

const Missing = () => {
  return (
    <section className={Style.missingContainer}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className={Style.homeLink}>
        Go Back Home
      </Link>
    </section>
  );
};

export default Missing;
