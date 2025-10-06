export default function Maps() {
  return (
    <section
      id="maps"
      className="bg-off-white pb-[6.25rem] lg:py-[6.25rem] overflow-hidden"
    >
      <div className="max-w-[62.625rem] px-[2.375rem] mx-auto lg:items-center flex flex-col justify-between lg:flex-row lg:px-0 gap-[4.75rem]">
        <div className="order-2 lg:order-1  lg:mx-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14628.176622734893!2d-46.660878953631574!3d-23.566857571466947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sescolinha%20de%20futebol!5e0!3m2!1spt-BR!2sbr!4v1759279157279!5m2!1spt-BR!2sbr"
            className="max-w-[30rem] w-full mx-auto lg:w-[34.1875rem] h-[24.375rem] drop-shadow-[4px_4px_9.7px_rgba(0,0,0,0.25)]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* textos*/}
        <div className="max-w-[25rem] order-1 lg:order-2 mx-auto">
          {/* label */}
          <div className="flex items-center gap-2">
            <div className="w-[2.5rem] h-px bg-purple"></div>
            <span className="text-purple section-label">AQUECIMENTO</span>
          </div>

          <h2 className="heading-section text-midnight mt-[0.5rem]">
            ENQUANTO O CAMPEONATO NÃO COMEÇA
          </h2>

          <div className="max-w-[24.5625rem] mt-[1.875rem] flex flex-col gap-4 body-text text-midnight">
            <p>
              Enquanto o campeonato não começa, o futebol continua acontecendo
              em cada treino, em cada nova amizade e em cada chute dado com
              vontade. Explore as escolas próximas, encontre seu espaço no campo
              e mantenha viva a energia que faz o esporte acontecer todos os
              dias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
