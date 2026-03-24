import { useState, useEffect } from 'react';
import { User, Building2, Calculator, FileText, CheckCircle, ArrowRight, Printer, Globe, AlertCircle, Target, Workflow, TrendingUp, Laptop, RotateCcw } from 'lucide-react';

function App() {
  const logoSplashUrl = `${import.meta.env.BASE_URL}logo-inhgeomin.svg`;
  const [currentStep, setCurrentStep] = useState(0);
  const [tramiteType, setTramiteType] = useState<'municipal' | 'inhgeomin' | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashStep, setSplashStep] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleTramiteDecision = (type: 'municipal' | 'inhgeomin') => {
    setTramiteType(type);
    setCurrentStep(6);
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setTramiteType(null);
  };

  const resetToBeginning = () => {
    setCurrentStep(0);
    setTramiteType(null);
    setShowSplash(true);
    setSplashStep(0);
    setShowIntro(false);
    setIntroStep(0);
  };

  const steps = [
    { id: 1, label: 'Ciudadano llega a Municipalidad', icon: User },
    { id: 2, label: 'Personal consulta el proceso', icon: Building2 },
    { id: 3, label: 'Abre Calculadora de Trámites', icon: Calculator },
    { id: 4, label: 'Ingresa datos del ciudadano', icon: FileText },
    { id: 5, label: 'Calculadora determina el trámite', icon: Calculator },
  ];

  const handleContainerClick = () => {
    advanceStep();
  };

  const advanceStep = () => {
    if (currentStep < 5 && !tramiteType) {
      setCurrentStep(currentStep + 1);
    } else if (tramiteType && currentStep >= 6 && currentStep < 9) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBackStep = () => {
    if (currentStep > 0) {
      if (currentStep === 6 && tramiteType) {
        setTramiteType(null);
        setCurrentStep(5);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  useEffect(() => {
    if (!showSplash && !showIntro) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter' || event.key === 'PageDown') {
          event.preventDefault();
          advanceStep();
        } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
          event.preventDefault();
          goBackStep();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentStep, tramiteType, showSplash, showIntro]);

  const introSteps = [
    { id: 0, label: 'Jefe de UDEM', description: 'Define objetivos estratégicos, aprueba proyectos y supervisa resultados.', icon: Target },
    { id: 1, label: 'Procesos', description: 'Analiza los procedimientos municipales existentes, detecta ineficiencias y documenta flujos de trabajo.', icon: Workflow },
    { id: 2, label: 'Mejora Continua', description: 'Identifica oportunidades de optimización, estandariza buenas prácticas y propone mejoras iterativas.', icon: TrendingUp },
    { id: 3, label: 'TICs', description: 'Desarrolla, implementa y mantiene herramientas tecnológicas que automatizan y simplifican procesos.', icon: Laptop },
  ];

  const handleIntroClick = () => {
    if (introStep < 3) {
      setIntroStep(introStep + 1);
    }
  };

  const advanceIntroStep = () => {
    if (introStep < 3) {
      setIntroStep(introStep + 1);
    }
  };

  const goBackIntroStep = () => {
    if (introStep > 0) {
      setIntroStep(introStep - 1);
    } else {
      setShowIntro(false);
      setShowSplash(true);
      setSplashStep(2);
    }
  };

  const handleSplashClick = () => {
    if (splashStep < 2) {
      setSplashStep(splashStep + 1);
    } else {
      setShowSplash(false);
      setShowIntro(true);
    }
  };

  const goBackSplashStep = () => {
    if (splashStep > 0) {
      setSplashStep(splashStep - 1);
    }
  };

  useEffect(() => {
    if (showSplash) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter' || event.key === 'PageDown') {
          event.preventDefault();
          handleSplashClick();
        } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
          event.preventDefault();
          goBackSplashStep();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showSplash, splashStep]);

  useEffect(() => {
    if (showIntro) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter' || event.key === 'PageDown') {
          event.preventDefault();
          if (introStep >= 3) {
            setShowIntro(false);
          } else {
            advanceIntroStep();
          }
        } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
          event.preventDefault();
          goBackIntroStep();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showIntro, introStep]);

  if (showSplash) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundColor: '#050E19',
          backgroundImage: `linear-gradient(rgba(5,14,25,0.78), rgba(5,14,25,0.78)), url('${logoSplashUrl}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '70% auto',
        }}
        onClick={handleSplashClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetToBeginning();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 transition-colors"
          style={{ color: '#10B981' }}
        >
          <RotateCcw size={24} />
        </button>
        <div className="text-center space-y-8">
          <h1
            className="text-6xl font-bold transition-opacity duration-1000"
            style={{
              color: '#7EF516',
              opacity: splashStep >= 0 ? 1 : 0
            }}
          >
            INHGEOMIN
          </h1>
          <p
            className="text-lg transition-opacity duration-1000 delay-500"
            style={{
              color: '#7EF516',
              opacity: splashStep >= 1 ? 1 : 0
            }}
          >
            Ordenando y modernizando la gestión minera para generar desarrollo y empleo.
          </p>
          <p
            className="text-sm text-slate-400 animate-pulse transition-opacity duration-1000 delay-1000"
            style={{
              opacity: splashStep >= 2 ? 1 : 0
            }}
          >
            Haz clic en cualquier lugar para continuar
          </p>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div
        className="min-h-screen py-2 px-3 relative"
        style={{ backgroundColor: '#050E19' }}
        onClick={handleIntroClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetToBeginning();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 transition-colors z-50"
          style={{ color: '#10B981' }}
        >
          <RotateCcw size={24} />
        </button>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#7EF516' }}>
              Unidad de Modernización (UDEM)
            </h1>
            <div className="mt-1.5 inline-block bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 rounded-full text-xs font-semibold shadow-lg" style={{ color: '#102134' }}>
              Transformando procesos para un mejor servicio municipal
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4">
            <div className="space-y-2 mb-4">
              {introSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = introStep >= step.id;
                const isCurrent = introStep === step.id;

                return (
                  <div key={step.id}>
                    <div
                      className={`flex items-start gap-3 p-2.5 rounded-lg transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'shadow-md scale-[1.02]'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      } ${isCurrent ? 'ring-2 ring-offset-1' : ''}`}
                      style={isActive ? { backgroundColor: '#7EF516', color: '#102134' } : {}}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIntroStep(step.id);
                      }}
                    >
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${
                          isActive ? '' : 'bg-white'
                        }`}
                        style={isActive ? { backgroundColor: 'rgba(16, 33, 52, 0.2)' } : {}}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? '' : 'text-slate-400'}`} style={isActive ? { color: '#102134' } : {}} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold">ÁREA {step.id + 1}</div>
                        <div className="text-sm font-bold mb-1">{step.label}</div>
                        <div className={`text-xs leading-relaxed ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                          {step.description}
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-1 ${isActive ? 'opacity-100' : 'opacity-30'}`} style={isActive ? { color: '#102134' } : {}} />
                    </div>

                    {index < introSteps.length - 1 && (
                      <div className="flex justify-center my-1">
                        <div
                          className={`w-0.5 h-3 rounded-full transition-all duration-500 ${
                            introStep > step.id ? '' : 'bg-slate-200'
                          }`}
                          style={introStep > step.id ? { backgroundColor: '#7EF516' } : {}}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {introStep >= 3 && (
              <div className="border-t-2 border-orange-500 pt-3">
                <div className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowIntro(false);
                    }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Continuar al flujo de trámites
                  </button>
                </div>
              </div>
            )}

            {introStep < 3 && (
              <div className="mt-3 text-center">
                <p className="text-slate-500 text-xs animate-pulse">
                  Haz clic en cualquier lugar para continuar
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-3" style={{ color: '#7EF516' }}>
            <p className="text-xs">
              Unidad de Modernización | Municipalidades SIGEM
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-2 px-3 relative"
      style={{ backgroundColor: '#050E19' }}
      onClick={handleContainerClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          resetToBeginning();
        }}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 transition-colors z-50"
        style={{ color: '#10B981' }}
      >
        <RotateCcw size={24} />
      </button>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#7EF516' }}>Flujo del Trámite Minero</h1>
          <div className="mt-1.5 inline-block bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 rounded-full text-xs font-semibold shadow-lg" style={{ color: '#102134' }}>
            Sistema de Orientación al Ciudadano
          </div>
        </div>

        {/* Flow Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4">
          {!tramiteType ? (
            <>
          {/* Main Steps */}
          <div className="space-y-2 mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep > 0 && currentStep >= step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id}>
                  <div
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'shadow-md scale-[1.02]'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    } ${isCurrent ? 'ring-2 ring-offset-1' : ''}`}
                    style={isActive ? { backgroundColor: '#7EF516', color: '#102134' } : {}}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepClick(step.id);
                    }}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full ${
                        isActive ? '' : 'bg-white'
                      }`}
                      style={isActive ? { backgroundColor: 'rgba(16, 33, 52, 0.2)' } : {}}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? '' : 'text-slate-400'}`} style={isActive ? { color: '#102134' } : {}} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold">PASO {step.id}</div>
                      <div className="text-sm font-medium">{step.label}</div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-30'}`} style={isActive ? { color: '#102134' } : {}} />
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div
                        className={`w-0.5 h-3 rounded-full transition-all duration-500 ${
                          currentStep > step.id ? '' : 'bg-slate-200'
                        }`}
                        style={currentStep > step.id ? { backgroundColor: '#7EF516' } : {}}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Decision Point */}
          {currentStep >= 5 && (
            <div className="border-t-2 border-orange-500 pt-3">
              <div className="text-center mb-3">
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  ¿Dónde se realiza el trámite?
                </h3>
                <p className="text-slate-600 text-sm">La calculadora ha determinado la ubicación</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {/* Municipal Option */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTramiteDecision('municipal');
                  }}
                  className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                  <Building2 className="w-8 h-8 mb-1.5 relative z-10" />
                  <h4 className="text-base font-bold mb-1 relative z-10">Municipalidad</h4>
                  <p className="text-orange-100 text-sm relative z-10">El trámite se realiza localmente</p>
                </button>

                {/* INHGEOMIN Option */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTramiteDecision('inhgeomin');
                  }}
                  className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                  <Building2 className="w-8 h-8 mb-1.5 relative z-10" />
                  <h4 className="text-base font-bold mb-1 relative z-10">INHGEOMIN</h4>
                  <p className="text-indigo-100 text-sm relative z-10">Debe acudir a la capital</p>
                </button>
              </div>
            </div>
          )}

          {/* Click anywhere hint */}
          {currentStep < 5 && (
            <div className="mt-3 text-center">
              <p className="text-slate-500 text-xs animate-pulse">
                Haz clic en cualquier lugar para continuar
              </p>
            </div>
          )}
          </>
          ) : (
            <>
          {/* Municipal Flow */}
          {tramiteType === 'municipal' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  Trámite Municipal
                </div>
              </div>

              {/* Alerta importante */}
              <div className="mb-3 p-3 bg-cyan-50 border border-cyan-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse-yellow" />
                <p className="text-sm text-cyan-900 leading-relaxed">
                  La alcaldía podrá otorgar un permiso sobre un área solicitada únicamente si ya existen áreas previamente adjudicadas por el INHGEOMIN. En caso contrario, será responsabilidad de la municipalidad realizar el trámite correspondiente y gestionar la adjudicación de las áreas ante el INHGEOMIN.
                </p>
              </div>

              <div className="space-y-2">
                {currentStep >= 6 && (
                  <>
                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer ${
                        currentStep >= 7 ? 'bg-orange-50 border-orange-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(6);
                      }}
                    >
                      <div className={`w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= 7 ? 'bg-orange-500' : 'bg-slate-400'
                      }`}>
                        6
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 7 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Calculadora muestra trámites municipales
                        </div>
                        <div className="text-xs text-slate-600">Personal selecciona el trámite correspondiente</div>
                      </div>
                      <FileText className={`w-5 h-5 ${currentStep >= 7 ? 'text-orange-600' : 'text-slate-400'}`} />
                    </div>
                  </>
                )}

                {currentStep >= 7 && (
                  <>
                    <div className="flex justify-center">
                      <div className="w-0.5 h-3 bg-orange-300 rounded-full" />
                    </div>

                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer ${
                        currentStep >= 8 ? 'bg-orange-50 border-orange-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(7);
                      }}
                    >
                      <div className={`w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= 8 ? 'bg-orange-500' : 'bg-slate-400'
                      }`}>
                        7
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 8 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Acceso a web oficial de INHGEOMIN DUMAPE
                        </div>
                        <div className="text-xs text-slate-600">Enlace directo al portal oficial</div>
                      </div>
                      <Globe className={`w-5 h-5 ${currentStep >= 8 ? 'text-orange-600' : 'text-slate-400'}`} />
                    </div>
                  </>
                )}

                {currentStep >= 8 && (
                  <>
                    <div className="flex justify-center">
                      <div className="w-0.5 h-3 bg-orange-300 rounded-full" />
                    </div>

                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer ${
                        currentStep >= 9 ? 'bg-orange-50 border-orange-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(8);
                      }}
                    >
                      <div className={`w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= 9 ? 'bg-orange-500' : 'bg-slate-400'
                      }`}>
                        8
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 9 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Realizar trámite del ciudadano e Impresión de información
                        </div>
                        <div className="text-xs text-slate-600">Entrega al ciudadano</div>
                      </div>
                      <Printer className={`w-5 h-5 ${currentStep >= 9 ? 'text-orange-600' : 'text-slate-400'}`} />
                    </div>
                  </>
                )}

                {currentStep >= 9 && (
                  <div className="flex justify-center mt-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-bold">Fin del proceso</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {tramiteType === 'inhgeomin' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  Trámite INHGEOMIN
                </div>
              </div>

              <div className="space-y-2">
                {currentStep >= 6 && (
                  <>
                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer ${
                        currentStep >= 7 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(6);
                      }}
                    >
                      <div className={`w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= 7 ? 'bg-indigo-600' : 'bg-slate-400'
                      }`}>
                        6
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 7 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Calculadora muestra trámites INHGEOMIN
                        </div>
                        <div className="text-xs text-slate-600">Lista de trámites disponibles en oficina central</div>
                      </div>
                      <FileText className={`w-5 h-5 ${currentStep >= 7 ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </>
                )}

                {currentStep >= 7 && (
                  <>
                    <div className="flex justify-center">
                      <div className="w-0.5 h-3 bg-indigo-300 rounded-full" />
                    </div>

                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer ${
                        currentStep >= 8 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(7);
                      }}
                    >
                      <div className={`w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= 8 ? 'bg-indigo-600' : 'bg-slate-400'
                      }`}>
                        7
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 8 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Impresión de información y acceso a Pagina web oficial de INHGEOMIN, sección de tramites DUPAI
                        </div>
                        <div className="text-xs text-slate-600">Impresión de información y Enlace directo al portal web institucional</div>
                      </div>
                      <Printer className={`w-5 h-5 ${currentStep >= 8 ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </>
                )}

                {currentStep >= 8 && (
                  <>
                    <div className="flex justify-center">
                      <div className="w-0.5 h-3 bg-indigo-300 rounded-full" />
                    </div>

                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer ${
                        currentStep >= 9 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(8);
                      }}
                    >
                      <div className={`w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= 9 ? 'bg-indigo-600' : 'bg-slate-400'
                      }`}>
                        8
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 9 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Información al ciudadano
                        </div>
                        <div className="text-xs text-slate-600">Debe acudir a INHGEOMIN central en la capital</div>
                      </div>
                      <Building2 className={`w-5 h-5 ${currentStep >= 9 ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </>
                )}

                {currentStep >= 9 && (
                  <div className="flex justify-center mt-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-bold">Fin del proceso</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="text-center mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetFlow();
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Reiniciar proceso
            </button>
          </div>
          </>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-3" style={{ color: '#7EF516' }}>
          <p className="text-xs">
            Sistema de orientación para trámites mineros | INHGEOMIN | Municipalidades SIGEM
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
