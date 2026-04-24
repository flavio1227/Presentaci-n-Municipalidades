import { useState, useEffect, useRef } from 'react';
import {
  User,
  Building2,
  Calculator,
  FileText,
  CheckCircle,
  ArrowRight,
  Printer,
  AlertCircle,
  RotateCcw,
  FilePenLine,
  ClipboardCheck,
  FolderOpen,
  MapPinned,
  ScrollText,
  ShieldCheck,
  Trees,
  Scale,
  UsersRound,
  Map,
  BadgeCheck,
  PackageCheck,
  type LucideIcon,
} from 'lucide-react';

const MUNICIPAL_PERMISO_STEPS: {
  title: string;
  plain: string;
  sigem: boolean;
  icon: LucideIcon;
}[] = [
  {
    title: 'Solicitud',
    plain: 'La persona o empresa presenta la solicitud y los documentos base ante la municipalidad.',
    sigem: false,
    icon: FilePenLine,
  },
  {
    title: 'Verificación de documentos',
    plain: 'Se revisa que toda la documentación requerida esté completa y sea válida.',
    sigem: true,
    icon: ClipboardCheck,
  },
  {
    title: 'Conformación de expediente',
    plain: 'Se arma y ordena el expediente del trámite dentro del sistema.',
    sigem: true,
    icon: FolderOpen,
  },
  {
    title: 'Verificación de áreas disponibles',
    plain: 'Se consulta en mapa si el área solicitada está disponible y no choca con otras solicitudes o concesiones.',
    sigem: true,
    icon: MapPinned,
  },
  {
    title: 'Emisión de constancia',
    plain: 'Se emite la constancia que acredita el avance o resultado de esa etapa del proceso.',
    sigem: false,
    icon: ScrollText,
  },
  {
    title: 'Presentación de licencia ambiental',
    plain: 'Se recibe o verifica la licencia ambiental exigida para continuar el trámite.',
    sigem: false,
    icon: ShieldCheck,
  },
  {
    title: 'Inspección de campo',
    plain: 'Personal técnico visita el sitio para comprobar condiciones reales del área o del proyecto.',
    sigem: true,
    icon: Trees,
  },
  {
    title: 'Evaluación legal',
    plain: 'El área legal revisa que el expediente cumpla la normativa aplicable.',
    sigem: true,
    icon: Scale,
  },
  {
    title: 'Valoración',
    plain: 'Instancia que analiza el caso y emite criterio sobre el otorgamiento del permiso.',
    sigem: false,
    icon: UsersRound,
  },
  {
    title: 'Inscripción del permiso',
    plain: 'Se registra formalmente el permiso en el sistema o registro que corresponda.',
    sigem: false,
    icon: Map,
  },
  {
    title: 'Elaboración de permiso',
    plain: 'Se redacta y genera el documento oficial del permiso con sus datos definitivos.',
    sigem: true,
    icon: BadgeCheck,
  },
  {
    title: 'Entrega de permiso',
    plain: 'El ciudadano recibe el permiso ya emitido. Fin del proceso municipal de este tipo.',
    sigem: false,
    icon: PackageCheck,
  },
];

const MUNICIPAL_FLOW_END_STEP = 5 + MUNICIPAL_PERMISO_STEPS.length + 1;

function App() {
  const logoSplashUrl = `${import.meta.env.BASE_URL}logo-inhgeomin.svg`;
  const palette = {
    white: '#ffffff',
    dark: '#334155',
    light: '#cbd5e1',
    mid: '#94a3b8',
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [tramiteType, setTramiteType] = useState<'municipal' | 'inhgeomin' | null>(null);
  const [decisionSelection, setDecisionSelection] = useState<'municipal' | 'inhgeomin'>('municipal');
  const [showSplash, setShowSplash] = useState(true);
  const [splashStep, setSplashStep] = useState(0);
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    setDecisionSelection('municipal');
  };

  const resetToBeginning = () => {
    setCurrentStep(0);
    setTramiteType(null);
    setDecisionSelection('municipal');
    setShowSplash(true);
    setSplashStep(0);
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
    } else if (currentStep >= 5 && !tramiteType) {
      handleTramiteDecision(decisionSelection);
    } else if (tramiteType === 'inhgeomin' && currentStep >= 6 && currentStep < 9) {
      setCurrentStep(currentStep + 1);
    } else if (tramiteType === 'municipal' && currentStep >= 6 && currentStep < MUNICIPAL_FLOW_END_STEP) {
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
    if (!showSplash) {
      const handleKeyDown = (event: KeyboardEvent) => {
        const isInDecisionScreen = currentStep >= 5 && !tramiteType;
        const isInEndScreen =
          (tramiteType === 'municipal' && currentStep >= MUNICIPAL_FLOW_END_STEP) ||
          (tramiteType === 'inhgeomin' && currentStep >= 9);

        if (isInDecisionScreen && event.key === 'ArrowUp') {
          event.preventDefault();
          setDecisionSelection('municipal');
          return;
        }
        if (isInDecisionScreen && event.key === 'ArrowDown') {
          event.preventDefault();
          setDecisionSelection('inhgeomin');
          return;
        }
        if (isInEndScreen && event.key === 'ArrowDown') {
          event.preventDefault();
          resetFlow();
          return;
        }
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
  }, [currentStep, tramiteType, showSplash]);

  const handleSplashClick = () => {
    if (splashStep < 2) {
      setSplashStep(splashStep + 1);
    } else {
      setShowSplash(false);
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
    if (showSplash) return;
    let targetKey: string | null = null;
    if (!tramiteType && currentStep > 0 && currentStep <= 5) targetKey = `main-${currentStep}`;
    if (tramiteType === 'municipal' && currentStep >= 6) targetKey = `municipal-${Math.min(currentStep - 5, MUNICIPAL_PERMISO_STEPS.length)}`;
    if (tramiteType === 'inhgeomin' && currentStep >= 6 && currentStep <= 9) targetKey = `inhgeomin-${currentStep}`;
    if (!targetKey) return;
    const el = stepRefs.current[targetKey];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, tramiteType, showSplash]);

  if (showSplash) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundColor: palette.dark,
          backgroundImage: `linear-gradient(rgba(51,65,85,0.86), rgba(51,65,85,0.86)), url('${logoSplashUrl}')`,
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
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{ color: palette.white, backgroundColor: 'rgba(255,255,255,0.12)' }}
        >
          <RotateCcw size={24} />
        </button>
        <div className="text-center space-y-8">
          <h1
            className="text-6xl font-bold transition-opacity duration-1000"
            style={{
              color: palette.white,
              opacity: splashStep >= 0 ? 1 : 0
            }}
          >
            INHGEOMIN
          </h1>
          <p
            className="text-lg transition-opacity duration-1000 delay-500"
            style={{
              color: palette.light,
              opacity: splashStep >= 1 ? 1 : 0
            }}
          >
            Ordenando y modernizando la gestión minera para generar desarrollo y empleo.
          </p>
          <p
            className="text-sm animate-pulse transition-opacity duration-1000 delay-1000"
            style={{
              color: palette.mid,
              opacity: splashStep >= 2 ? 1 : 0
            }}
          >
            Haz clic en cualquier lugar para continuar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-2 px-3 relative"
      style={{ backgroundColor: palette.dark }}
      onClick={handleContainerClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          resetToBeginning();
        }}
        className="absolute top-4 right-4 p-2 rounded-full transition-colors z-50"
        style={{ color: palette.white, backgroundColor: 'rgba(255,255,255,0.12)' }}
      >
        <RotateCcw size={24} />
      </button>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold mb-1" style={{ color: palette.white }}>Flujo del Trámite Minero</h1>
          <div className="mt-1.5 inline-block px-4 py-1 rounded-full text-xs font-semibold shadow-lg" style={{ backgroundColor: palette.light, color: palette.dark }}>
            Sistema de Orientación al Ciudadano
          </div>
        </div>

        {/* Flow Container */}
        <div className="rounded-lg shadow-2xl p-4" style={{ backgroundColor: palette.white }}>
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
                    ref={(el) => {
                      stepRefs.current[`main-${step.id}`] = el;
                    }}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'shadow-md scale-[1.02]'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    } ${isCurrent ? 'ring-2 ring-offset-1' : ''}`}
                    style={isActive ? { backgroundColor: palette.light, color: palette.dark } : {}}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepClick(step.id);
                    }}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full ${
                        isActive ? '' : 'bg-white'
                      }`}
                      style={isActive ? { backgroundColor: 'rgba(51,65,85,0.2)' } : {}}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? '' : 'text-slate-400'}`} style={isActive ? { color: palette.dark } : {}} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold">PASO {step.id}</div>
                      <div className="text-sm font-medium">{step.label}</div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-30'}`} style={isActive ? { color: palette.dark } : {}} />
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div
                        className={`w-0.5 h-3 rounded-full transition-all duration-500 ${
                          currentStep > step.id ? '' : 'bg-slate-200'
                        }`}
                        style={currentStep > step.id ? { backgroundColor: palette.mid } : {}}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Decision Point */}
          {currentStep >= 5 && (
            <div className="border-t-2 pt-3" style={{ borderColor: palette.light }}>
              <div className="text-center mb-3">
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  ¿Dónde se realiza el trámite?
                </h3>
                <p className="text-slate-600 text-sm">La calculadora ha determinado la ubicación</p>
                <p className="text-slate-500 text-xs mt-1">
                  Control: ↑ Municipalidad, ↓ INHGEOMIN, → Confirmar
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {/* Municipal Option */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTramiteDecision('municipal');
                  }}
                  className="group relative overflow-hidden text-white p-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundColor: palette.dark,
                    boxShadow: decisionSelection === 'municipal' ? `0 0 0 3px ${palette.light}` : undefined,
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                  <Building2 className="w-8 h-8 mb-1.5 relative z-10" />
                  <h4 className="text-base font-bold mb-1 relative z-10">Municipalidad</h4>
                  <p className="text-sm relative z-10" style={{ color: palette.light }}>El trámite se realiza localmente</p>
                </button>

                {/* INHGEOMIN Option */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTramiteDecision('inhgeomin');
                  }}
                  className="group relative overflow-hidden text-white p-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundColor: palette.mid,
                    boxShadow: decisionSelection === 'inhgeomin' ? `0 0 0 3px ${palette.dark}` : undefined,
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                  <Building2 className="w-8 h-8 mb-1.5 relative z-10" />
                  <h4 className="text-base font-bold mb-1 relative z-10">INHGEOMIN</h4>
                  <p className="text-sm relative z-10" style={{ color: palette.white }}>Debe acudir a la capital</p>
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
              <div className="text-center mb-3 space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm" style={{ backgroundColor: palette.light, color: palette.dark }}>
                  <Building2 className="w-4 h-4" />
                  Trámite municipal · Pequeña minería y minería artesanal
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-snug px-1">
                  Otorgamiento de permisos de pequeña minería y minería artesanal
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl mx-auto">
                  Avance paso a paso. Siguiente: clic en la pantalla o tecla → / espacio. Los pasos marcados con{' '}
                  <span className="font-semibold" style={{ color: palette.dark }}>SIGEM</span> se gestionan en la plataforma SIGEM.
                </p>
                {currentStep >= 6 && currentStep < MUNICIPAL_FLOW_END_STEP && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium">
                    <span>Paso {Math.min(currentStep - 5, MUNICIPAL_PERMISO_STEPS.length)} de {MUNICIPAL_PERMISO_STEPS.length}</span>
                    <span className="text-slate-400">|</span>
                  <span style={{ color: palette.dark }}>
                      {currentStep - 5 < MUNICIPAL_PERMISO_STEPS.length ? 'Sigue el orden' : 'Resumen completo'}
                    </span>
                  </div>
                )}
              </div>

              {/* Alerta importante */}
              <div className="mb-3 p-3 border rounded-lg flex gap-3" style={{ backgroundColor: palette.white, borderColor: palette.light }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: palette.dark }} />
                <div className="text-sm leading-relaxed space-y-1" style={{ color: palette.dark }}>
                  <p className="font-semibold">Importante</p>
                  <p>
                    La alcaldía solo puede otorgar permiso sobre un área si ya existen áreas adjudicadas por el INHGEOMIN.
                    Si no, la municipalidad debe tramitar la adjudicación ante el INHGEOMIN antes de seguir.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {MUNICIPAL_PERMISO_STEPS.map((step, index) => {
                  const n = index + 1;
                  const visibleCount = Math.max(0, currentStep - 5);
                  const isRevealed = visibleCount >= n;
                  const isCurrent = visibleCount === n;
                  const Icon = step.icon;

                  if (!isRevealed) return null;

                  const rowAlign = index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';

                  return (
                    <div key={n}>
                      {index > 0 && (
                        <div className="flex justify-center my-1.5">
                          <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: palette.mid }} aria-hidden />
                        </div>
                      )}
                      <div
                        ref={(el) => {
                          stepRefs.current[`municipal-${n}`] = el;
                        }}
                        className={`flex flex-col ${rowAlign} gap-3 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer shadow-sm`}
                        style={{
                          borderColor: isCurrent ? palette.mid : palette.light,
                          backgroundColor: palette.white,
                          boxShadow: isCurrent ? `0 0 0 2px ${palette.light}` : undefined,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentStep(5 + n);
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: step.sigem ? palette.mid : palette.light,
                            color: palette.dark,
                          }}
                        >
                          <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ backgroundColor: palette.dark }}>
                              {n}
                            </span>
                            <span className="text-sm font-bold text-slate-900">{step.title}</span>
                            {step.sigem && (
                              <span className="text-[10px] uppercase tracking-wide font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: palette.mid }}>
                                En plataforma SIGEM
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.plain}</p>
                        </div>
                        <ArrowRight
                          className={`hidden md:block flex-shrink-0 w-5 h-5 mt-1 ${isCurrent ? '' : 'text-slate-300'}`}
                          style={isCurrent ? { color: palette.dark } : {}}
                        />
                      </div>
                    </div>
                  );
                })}

                {currentStep >= MUNICIPAL_FLOW_END_STEP && (
                  <div className="flex flex-col items-center mt-4 gap-2">
                    <div className="text-white px-5 py-3 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left" style={{ backgroundColor: palette.dark }}>
                      <CheckCircle className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-bold block">Fin del proceso municipal</span>
                        <span className="text-xs" style={{ color: palette.light }}>
                          Se completaron las etapas del otorgamiento (según diagrama de referencia). Use «Reiniciar» para volver al inicio.
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">Presiona ↓ para reiniciar sin mouse</p>
                  </div>
                )}

                {currentStep >= 6 && currentStep < MUNICIPAL_FLOW_END_STEP && (
                  <div className="mt-3 text-center">
                    <p className="text-slate-500 text-xs animate-pulse">
                      Clic en cualquier lugar o teclado → para ver el siguiente paso
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {tramiteType === 'inhgeomin' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm" style={{ backgroundColor: palette.light, color: palette.dark }}>
                  <Building2 className="w-4 h-4" />
                  Trámite INHGEOMIN
                </div>
              </div>

              <div className="space-y-2">
                {currentStep >= 6 && (
                  <>
                    <div
                      ref={(el) => {
                        stepRefs.current['inhgeomin-6'] = el;
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer"
                      style={{
                        backgroundColor: currentStep >= 7 ? palette.light : palette.white,
                        borderColor: currentStep >= 7 ? palette.mid : palette.light,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(6);
                      }}
                    >
                      <div
                        className="w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: currentStep >= 7 ? palette.dark : palette.mid }}
                      >
                        6
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 7 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Calculadora muestra trámites INHGEOMIN
                        </div>
                        <div className="text-xs text-slate-600">Lista de trámites disponibles en oficina central</div>
                      </div>
                      <FileText className={`w-5 h-5 ${currentStep >= 7 ? '' : 'text-slate-400'}`} style={currentStep >= 7 ? { color: palette.dark } : {}} />
                    </div>
                  </>
                )}

                {currentStep >= 7 && (
                  <>
                    <div className="flex justify-center">
                      <div className="w-0.5 h-3 rounded-full" style={{ backgroundColor: palette.mid }} />
                    </div>

                    <div
                      ref={(el) => {
                        stepRefs.current['inhgeomin-7'] = el;
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer"
                      style={{
                        backgroundColor: currentStep >= 8 ? palette.light : palette.white,
                        borderColor: currentStep >= 8 ? palette.mid : palette.light,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(7);
                      }}
                    >
                      <div
                        className="w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: currentStep >= 8 ? palette.dark : palette.mid }}
                      >
                        7
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 8 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Impresión de información y acceso a Pagina web oficial de INHGEOMIN, sección de tramites DUPAI
                        </div>
                        <div className="text-xs text-slate-600">Impresión de información y Enlace directo al portal web institucional</div>
                      </div>
                      <Printer className={`w-5 h-5 ${currentStep >= 8 ? '' : 'text-slate-400'}`} style={currentStep >= 8 ? { color: palette.dark } : {}} />
                    </div>
                  </>
                )}

                {currentStep >= 8 && (
                  <>
                    <div className="flex justify-center">
                      <div className="w-0.5 h-3 rounded-full" style={{ backgroundColor: palette.mid }} />
                    </div>

                    <div
                      ref={(el) => {
                        stepRefs.current['inhgeomin-8'] = el;
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-500 cursor-pointer"
                      style={{
                        backgroundColor: currentStep >= 9 ? palette.light : palette.white,
                        borderColor: currentStep >= 9 ? palette.mid : palette.light,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(8);
                      }}
                    >
                      <div
                        className="w-7 h-7 text-white rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: currentStep >= 9 ? palette.dark : palette.mid }}
                      >
                        8
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${currentStep >= 9 ? 'text-slate-800' : 'text-slate-500'}`}>
                          Información al ciudadano
                        </div>
                        <div className="text-xs text-slate-600">Debe acudir a INHGEOMIN central en la capital</div>
                      </div>
                      <Building2 className={`w-5 h-5 ${currentStep >= 9 ? '' : 'text-slate-400'}`} style={currentStep >= 9 ? { color: palette.dark } : {}} />
                    </div>
                  </>
                )}

                {currentStep >= 9 && (
                  <div className="flex flex-col items-center mt-3 gap-2">
                    <div className="text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2" style={{ backgroundColor: palette.dark }}>
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-bold">Fin del proceso</span>
                    </div>
                    <p className="text-xs text-slate-500">Presiona ↓ para reiniciar sin mouse</p>
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
              className="text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: palette.dark }}
            >
              Reiniciar proceso
            </button>
          </div>
          </>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-3" style={{ color: palette.light }}>
          <p className="text-xs">
            Sistema de orientación para trámites mineros | INHGEOMIN | Municipalidades SIGEM
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
