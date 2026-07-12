export default function Banner({ variant, eyebrow, title, subtitle }) {
  return (
    <div className={`banner banner-${variant}`}>
      <span className="banner-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
