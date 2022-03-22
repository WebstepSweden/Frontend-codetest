import styles from "./Input.module.css";
interface Props {
  label: string;
  onInputChange: (value: number) => void;
}
export const Input = (props: Props) => {
  return (
    <label className="form-label">
      {props.label}
      <input
        type="number"
        className={styles.input}
        onChange={(e) => props.onInputChange(Number(e.target.value))}
      />
    </label>
  );
};
