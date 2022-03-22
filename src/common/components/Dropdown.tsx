import { SelectHTMLAttributes } from "react";
import styles from "./Dropdown.module.css";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const Dropdown = (props: Props) => {
  return (
    <label className="form-label">
      {props.label}
      <select className={styles.select} onChange={props.onChange}>
        {props.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
};
