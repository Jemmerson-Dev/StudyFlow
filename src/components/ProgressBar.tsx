type Props = { label: string; percent: number };

export default function ProgressBar({ label, percent }: Props) {
  return (
    <div className="progress">
      <div className="progress-top"><span>{label}</span><span>{percent}%</span></div>
      <div className="track"><div className="fill" style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
