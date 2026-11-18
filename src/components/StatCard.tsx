type Props = { label: string; value: string | number };

export default function StatCard({ label, value }: Props) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
