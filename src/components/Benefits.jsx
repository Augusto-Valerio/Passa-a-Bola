export default function Benefits({ imgClass, title, subtitle,}) {
  return (
    <div className="flex flex-col gap-[2.1875rem] items-center">
      <img src={imgClass} className="w-[2.8125rem]"/>

      <div className="flex flex-col gap-[1.25rem] items-center">
        <h3 className="heading-card text-midnight whitespace-nowrap">{title}</h3>
        <p className="card-text text-midnight text-center">{subtitle}</p>
      </div>
    </div>
  );
}
