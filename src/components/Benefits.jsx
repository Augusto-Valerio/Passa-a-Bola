export default function Benefits({ imgClass, title, subtitle,}) {
  return (
    <div className="flex flex-col gap-[35px] items-center">
      <img src={imgClass} className="w-[45px]"/>

      <div className="flex flex-col gap-[20px] items-center">
        <h3 className="heading-card text-midnight whitespace-nowrap">{title}</h3>
        <p className="card-text text-midnight text-center">{subtitle}</p>
      </div>
    </div>
  );
}
