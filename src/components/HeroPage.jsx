export default function HeroPage({ title, subtitle, buttonText, bgClass, buttonHref }) {
  return (
    <section
      id="hero"
      className={`${bgClass} bg-no-repeat bg-cover h-screen relative overflow-hidden`}
    >
      <div className="max-w-[1150px] mx-auto">
        <div className="absolute bottom-[64px] text-white flex flex-col gap-[16px] lg:max-w-[494px] ">
          <h1 className="heading-hero">{title}</h1>
          <p className="subtext-hero">{subtitle}</p>

          <a href={buttonHref} className="button-text bg-pink rounded-[20px] py-[11px] px-[15px] w-fit self-center lg:self-start">
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
