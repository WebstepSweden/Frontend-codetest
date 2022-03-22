import styles from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = ({ children, ...props }: Props) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);
