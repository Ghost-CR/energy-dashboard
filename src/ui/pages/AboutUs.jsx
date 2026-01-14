import React from 'react';
import { Target, Users, Lightbulb, Award, TrendingUp, Globe, Zap } from 'lucide-react';

const AboutUs = () => {
  const mission = {
    title: "Nuestra Misión",
    description: "Democratizar el acceso a tecnología de monitoreo energético de clase mundial, permitiendo que empresas de todos los tamaños optimicen su consumo, reduzcan costos y contribuyan a un futuro más sostenible.",
    icon: Target
  };

  const vision = {
    title: "Nuestra Visión",
    description: "Ser la plataforma líder en Latinoamérica de monitoreo y optimización energética inteligente, transformando la manera en que las empresas gestionan su energía.",
    icon: Lightbulb
  };

  const values = [
    {
      icon: Zap,
      title: "Innovación Constante",
      description: "Utilizamos tecnología de punta para resolver problemas reales del sector energético."
    },
    {
      icon: Users,
      title: "Enfoque en el Cliente",
      description: "Cada solución está diseñada pensando en las necesidades específicas de nuestros clientes."
    },
    {
      icon: TrendingUp,
      title: "Resultados Medibles",
      description: "Nos comprometemos con ahorros reales y cuantificables desde el primer mes."
    },
    {
      icon: Globe,
      title: "Sostenibilidad",
      description: "Contribuimos activamente a la reducción de huella de carbono y eficiencia energética."
    }
  ];

  const milestones = [
    { year: "2019", event: "Fundación de iotomato", detail: "Inicio del desarrollo de nuestra plataforma IoT" },
    { year: "2019", event: "Incubación CIDE PUCP", detail: "Respaldados por la incubadora de la Pontificia Universidad Católica del Perú" },
    { year: "2020", event: "Reconocimiento MIT", detail: "Innovadores menores de 35 Latinoamérica - MIT Technology Review" },
    { year: "2023", event: "Ganadores Innóvate Perú", detail: "Fondo Startup-7G del gobierno peruano" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nosotros
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Somos una empresa peruana de tecnología IoT especializada en monitoreo energético inteligente, 
            ayudando a empresas a reducir costos y optimizar su consumo con datos en tiempo real.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {[mission, vision].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}
                >
                  <Icon className="w-8 h-8" style={{ color: '#DC0F1A' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 text-center"
                >
                  <div 
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestro Camino
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
              style={{ backgroundColor: 'rgba(220, 15, 26, 0.2)' }}
            ></div>

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`flex items-center ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-3"
                        style={{ backgroundColor: '#DC0F1A' }}
                      >
                        {milestone.year}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.event}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {milestone.detail}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div 
                    className="w-4 h-4 rounded-full border-4 border-white hidden md:block z-10"
                    style={{ backgroundColor: '#DC0F1A', boxShadow: '0 0 0 4px rgba(220, 15, 26, 0.2)' }}
                  ></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Un equipo multidisciplinario
            </h3>
            <p className="text-xl text-gray-600">
              y altamente calificado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Jesús Mueras */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-gray-200">
                  <img 
                    src="https://iotomato.com/static/jesus-4e2170f5440ea277d4eb15774d613346.png" 
                    alt="Jesús Mueras"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Jesús Mueras
                </h4>
                <p className="text-gray-600 mb-6">
                  CEO de Iotomato
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:jesus@iotomato.com"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Luis Ruiz */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-gray-200">
                  <img 
                    src="https://iotomato.com/static/luis-8433f78f36352f2da4ee4ebe4ea012ad.png" 
                    alt="Luis Ruiz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Luis Ruiz
                </h4>
                <p className="text-gray-600 mb-6">
                  CTO de Software en Iotomato
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/lerc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:luis@iotomato.com"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Edwin Hilario */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-gray-200">
                  <img 
                    src="https://iotomato.com/static/edwin-a3d6eeb72bd8ccd891a90490d6f5d6f0.png" 
                    alt="Edwin Hilario"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Edwin Hilario
                </h4>
                <p className="text-gray-600 mb-6">
                  CTO de Hardware en Iotomato
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:edwin@iotomato.com"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team CTA */}
        <div 
          className="rounded-2xl p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #DC0F1A 0%, #B00D16 100%)' }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Quieres ser parte del equipo?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Estamos siempre en búsqueda de talento apasionado por la tecnología y la sostenibilidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Ver Oportunidades
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                Contáctanos
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;