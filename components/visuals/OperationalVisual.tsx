import { Glyph, visualSequences } from "./Glyph";
import styles from "./OperationalVisual.module.css";

type OperationalVisualProps = {
  label: string;
  variant: keyof typeof visualSequences;
};

export function OperationalVisual({ label, variant }: OperationalVisualProps) {
  const sequence = visualSequences[variant];

  return (
    <div className={styles.panel} aria-hidden="true">
      <div className={styles.header}>
        <span>Operational model</span>
        <i />
      </div>
      <div className={styles.canvas}>
        {sequence.map((glyph, index) => (
          <div className={styles.step} key={`${variant}-${glyph}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Glyph name={glyph} />
          </div>
        ))}
      </div>
      <div className={styles.caption}>{label}</div>
    </div>
  );
}
