import Style from "./footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={Style.footer}>
      <p>
        &copy; {year} Finance Blog | Built by{" "}
        <strong>
          <a
            href="https://github.com/Sammytee98?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={Style.footerLink}
          >
            Big Sam
          </a>{" "}
        </strong>
        using React & CSS.
      </p>
    </footer>
  );
};

export default Footer;
