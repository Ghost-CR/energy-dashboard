import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Users, Zap, Mail, Building2, Phone } from 'lucide-react';

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.company) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const guarantees = [
    { icon: CheckCircle, text: 'Sin tarjeta de crédito' },
    { icon: Clock, text: 'Implementación en 48 horas' },
    { icon: Users, text: 'Soporte 24/7 incluido' }
  ];

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -top-48 -right-48"></div>
        <div className="absolute w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -bottom-48 -left-48"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-2xl w-full max-w-md">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Solicita tu demo gratuita
                  </h3>
                  <p className="text-sm text-gray-600">
                    Un experto te contactará en menos de 24 horas
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan Pérez"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        style={{ borderColor: formData.name ? '#DC0F1A' : '' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email corporativo *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="juan@empresa.com"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        style={{ borderColor: formData.email ? '#DC0F1A' : '' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Mi Empresa S.A."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        style={{ borderColor: formData.company ? '#DC0F1A' : '' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+51 999 999 999"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                    style={{ 
                      backgroundColor: '#DC0F1A',
                      boxShadow: '0 10px 40px rgba(220, 15, 26, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B00D16'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC0F1A'}
                  >
                    <span>Solicitar Demo Gratuita</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-center text-gray-500">
                    Al enviar, aceptas nuestra política de privacidad. No compartimos tu información.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}
                >
                  <CheckCircle className="w-10 h-10" style={{ color: '#DC0F1A' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  ¡Solicitud recibida!
                </h3>
                <p className="text-gray-600 mb-6">
                  Nos pondremos en contacto contigo en menos de 24 horas para coordinar tu demo personalizada.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-semibold"
                  style={{ color: '#DC0F1A' }}
                >
                  Enviar otra solicitud
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">
            ¿Prefieres hablar directamente con nosotros?
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:contacto@iotomato.com"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">contacto@iotomato.com</span>
            </a>
            <a 
              href="tel:+51999999999"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">+51 999 999 999</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;