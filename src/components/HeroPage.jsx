export default function HeroPage({ title, subtitle, buttonText, bgClass, buttonHref }) {
  return (
    <section
      id="hero"
      className={`${bgClass} bg-no-repeat bg-cover h-screen relative overflow-hidden`}
    >
      <div className="max-w-[71.875rem] mx-auto">
        <div className="absolute bottom-[4rem] text-white flex flex-col gap-[1rem] lg:max-w-[30.875rem] ">
          <h1 className="heading-hero">{title}</h1>
          <p className="subtext-hero">{subtitle}</p>

          <a href={buttonHref} className="button-text bg-pink rounded-[1.25rem] py-[0.6875rem] px-[0.9375rem] w-fit self-center lg:self-start">
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
