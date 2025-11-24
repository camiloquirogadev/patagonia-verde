import React, { useState } from 'react';

export const TheoreticalFramework: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-4 border border-indigo-700/30 backdrop-blur-sm">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
                aria-expanded={isExpanded}
            >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Marco Teórico
                </h4>
                <svg 
                    className={`w-4 h-4 text-indigo-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isExpanded && (
                <div className="space-y-4 text-xs text-gray-300 animate-fadeIn">
                    {/* Motivación y Justificación del Proyecto */}
                    <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg p-3 border border-green-700/40">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Justificación del Proyecto
                        </h5>
                        <div className="space-y-2 leading-relaxed">
                            <p>
                                Este proyecto surge de la <strong className="text-green-300">necesidad crítica</strong> de democratizar 
                                el acceso a información geoespacial sobre incendios en la región patagónica. A pesar de la disponibilidad 
                                de datos satelitales de alta calidad provistos por NASA FIRMS, su <strong className="text-yellow-300">
                                visualización y análisis</strong> requieren conocimientos técnicos especializados que limitan su uso 
                                por parte de comunidades locales, bomberos voluntarios y tomadores de decisiones.
                            </p>
                            <div className="bg-gray-900/50 rounded p-2.5 border border-gray-700/50 mt-2">
                                <div className="font-semibold text-teal-300 mb-1.5">Objetivos principales:</div>
                                <ul className="space-y-1.5">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        <span><strong className="text-white">Accesibilidad universal</strong>: Crear una plataforma 
                                        web intuitiva que permita a cualquier persona, sin conocimientos técnicos en SIG, visualizar 
                                        y comprender los datos de incendios en tiempo real.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        <span><strong className="text-white">Respuesta temprana</strong>: Facilitar la detección 
                                        inmediata de focos de incendio para optimizar los tiempos de respuesta de brigadas y 
                                        equipos de emergencia en zonas rurales y periurbanas.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        <span><strong className="text-white">Análisis temporal</strong>: Proporcionar herramientas 
                                        de visualización gráfica que permitan identificar patrones estacionales, tendencias y 
                                        áreas de mayor riesgo histórico.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        <span><strong className="text-white">Educación ambiental</strong>: Generar conciencia sobre 
                                        la magnitud y distribución espacial de los incendios en la Patagonia, promoviendo la 
                                        prevención y el uso responsable del fuego.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        <span><strong className="text-white">Open Source</strong>: Mantener el código abierto 
                                        y documentado para que pueda ser replicado, adaptado y mejorado por otras comunidades 
                                        y regiones afectadas por incendios forestales.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Impacto Social y Ambiental */}
                    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-3 border border-blue-700/40">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Impacto Social y Ambiental
                        </h5>
                        <div className="space-y-2 leading-relaxed">
                            <p>
                                La región patagónica enfrenta una <strong className="text-orange-300">creciente amenaza</strong> 
                                de incendios forestales debido al cambio climático, el aumento de temperaturas, la prolongación 
                                de períodos de sequía y la expansión de la interfaz urbano-rural. Los incendios no solo destruyen 
                                <strong className="text-red-300"> ecosistemas únicos</strong> (bosques de Nothofagus, estepas arbustivas, 
                                turberas), sino que también comprometen la seguridad de comunidades aisladas, infraestructura 
                                crítica y actividades productivas (ganadería, turismo).
                            </p>
                            <p>
                                Este proyecto busca <strong className="text-cyan-300">empoderar a las comunidades locales</strong> 
                                mediante tecnología geoespacial accesible, permitiendo que organizaciones de base, escuelas rurales, 
                                cooperativas de productores y gobiernos municipales puedan monitorear, analizar y responder 
                                proactivamente ante eventos de fuego. La información oportuna salva vidas, protege recursos 
                                naturales y reduce pérdidas económicas.
                            </p>
                        </div>
                    </div>

                    {/* Enfoque Tecnológico */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-3 border border-purple-700/40">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Decisiones Tecnológicas
                        </h5>
                        <div className="space-y-2 leading-relaxed">
                            <p>
                                La elección del stack tecnológico responde a principios de <strong className="text-purple-300">
                                rendimiento, escalabilidad y mantenibilidad</strong>:
                            </p>
                            <ul className="space-y-1.5 ml-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400">▸</span>
                                    <span><strong className="text-blue-300">React 19 + TypeScript</strong>: Framework moderno 
                                    que garantiza una experiencia de usuario fluida, tipado estático para reducir errores y 
                                    facilitar el mantenimiento colaborativo del código.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">▸</span>
                                    <span><strong className="text-green-300">Leaflet</strong>: Biblioteca de mapeo web ligera 
                                    y extensible, ideal para visualizar grandes volúmenes de datos geoespaciales sin comprometer 
                                    el rendimiento en dispositivos de gama media.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400">▸</span>
                                    <span><strong className="text-purple-300">Vite</strong>: Build tool de última generación 
                                    con hot module replacement instantáneo, reduciendo drásticamente los tiempos de desarrollo 
                                    y optimizando el bundle final.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400">▸</span>
                                    <span><strong className="text-orange-300">NASA FIRMS API</strong>: Fuente de datos oficial 
                                    y confiable, con cobertura global y actualización en tiempo cuasi-real (latencia ~3-4 horas).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400">▸</span>
                                    <span><strong className="text-pink-300">Tailwind CSS</strong>: Framework de utilidades que 
                                    permite un diseño responsive y accesible sin sacrificar la personalización visual.</span>
                                </li>
                            </ul>
                            <p className="mt-2">
                                La arquitectura es <strong className="text-cyan-300">completamente frontend</strong>, eliminando 
                                costos de infraestructura de backend y permitiendo un despliegue gratuito y sostenible mediante 
                                plataformas como Vercel o Netlify.
                            </p>
                        </div>
                    </div>

                    {/* Visión a Futuro */}
                    <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 rounded-lg p-3 border border-yellow-700/40">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Visión y Desarrollo Futuro
                        </h5>
                        <div className="space-y-2 leading-relaxed">
                            <p>
                                Este proyecto es un <strong className="text-yellow-300">punto de partida</strong>, no un producto 
                                terminado. La hoja de ruta contempla:
                            </p>
                            <ul className="space-y-1 text-gray-400">
                                <li>• <strong className="text-white">Alertas personalizadas</strong>: Notificaciones por email/SMS para áreas de interés definidas por el usuario</li>
                                <li>• <strong className="text-white">Predicción de propagación</strong>: Modelos basados en viento, topografía y tipo de combustible</li>
                                <li>• <strong className="text-white">Integración de capas adicionales</strong>: Precipitaciones, índices de sequía, cobertura vegetal (NDVI)</li>
                                <li>• <strong className="text-white">API pública</strong>: Endpoints para que otros desarrolladores construyan sobre esta plataforma</li>
                                <li>• <strong className="text-white">Versión móvil nativa</strong>: App para uso en campo sin conexión permanente</li>
                                <li>• <strong className="text-white">Colaboración ciudadana</strong>: Sistema de reportes verificados por la comunidad</li>
                            </ul>
                            <p className="mt-2 text-amber-200">
                                <strong>La meta final</strong> es convertir esta herramienta en un sistema integral de gestión 
                                de incendios colaborativo, mantenido por y para la comunidad patagónica.
                            </p>
                        </div>
                    </div>

                    {/* Sistema FIRMS */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            Sistema FIRMS (Fire Information for Resource Management System)
                        </h5>
                        <p className="leading-relaxed mb-2">
                            FIRMS es un sistema de información desarrollado por <strong className="text-blue-300">NASA</strong> que proporciona 
                            datos satelitales de detección de incendios activos en <strong className="text-orange-300">tiempo cuasi-real</strong>. 
                            Utiliza instrumentos de teledetección a bordo de satélites de observación terrestre para identificar 
                            anomalías térmicas asociadas con incendios forestales.
                        </p>
                        <div className="text-xs text-gray-400 italic">
                            Fuente: NASA Earth Science Division (2023)
                        </div>
                    </div>

                    {/* Sensores MODIS y VIIRS */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Sensores MODIS y VIIRS
                        </h5>
                        <div className="space-y-2">
                            <div>
                                <strong className="text-green-300">MODIS</strong> (Moderate Resolution Imaging Spectroradiometer): 
                                Instrumentos a bordo de los satélites Terra y Aqua, operando desde 2000 y 2002 respectivamente. 
                                Resolución espacial de <strong className="text-purple-300">1 km</strong> para detección de incendios, 
                                con cobertura global diaria.
                            </div>
                            <div>
                                <strong className="text-green-300">VIIRS</strong> (Visible Infrared Imaging Radiometer Suite): 
                                Sensor de nueva generación a bordo de Suomi-NPP y NOAA-20, con resolución mejorada de 
                                <strong className="text-purple-300"> 375 m</strong>, permitiendo detectar incendios más pequeños 
                                y con mayor precisión geográfica.
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 italic mt-2">
                            Fuente: Giglio et al. (2016), Schroeder et al. (2014)
                        </div>
                    </div>

                    {/* Principio de Detección */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            Principio de Detección Térmica
                        </h5>
                        <p className="leading-relaxed mb-2">
                            La detección se basa en el análisis de <strong className="text-orange-300">radiación infrarroja termal</strong> 
                            emitida por la superficie terrestre. Los algoritmos procesan datos de bandas espectrales específicas 
                            (3.9-4.0 µm y 10.8-12.0 µm) para identificar <strong className="text-red-300">anomalías de temperatura</strong> 
                            que superan los umbrales definidos, indicando la presencia de combustión activa.
                        </p>
                        <div className="bg-indigo-950/50 rounded p-2 border border-indigo-800/30">
                            <div className="font-semibold text-indigo-300 mb-1">Parámetros clave:</div>
                            <ul className="space-y-1 text-gray-400">
                                <li>• <strong className="text-white">Bright_ti4</strong>: Temperatura de brillo en banda 4 (K)</li>
                                <li>• <strong className="text-white">Bright_ti5</strong>: Temperatura de brillo en banda 5 (K)</li>
                                <li>• <strong className="text-white">Confidence</strong>: Nivel de confianza (nominal, low, high)</li>
                                <li>• <strong className="text-white">FRP</strong>: Potencia Radiativa del Fuego (MW)</li>
                            </ul>
                        </div>
                        <div className="text-xs text-gray-400 italic mt-2">
                            Fuente: Justice et al. (2002), Csiszar et al. (2014)
                        </div>
                    </div>

                    {/* Aplicaciones en Gestión Ambiental */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                            Aplicaciones en Gestión Ambiental
                        </h5>
                        <div className="space-y-2">
                            <p className="leading-relaxed">
                                Los datos de incendios satelitales son fundamentales para:
                            </p>
                            <ul className="space-y-1.5 ml-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400 mt-0.5">▸</span>
                                    <span><strong className="text-yellow-300">Monitoreo en tiempo real</strong>: Detección temprana 
                                    y seguimiento de eventos de combustión para respuesta rápida de emergencias.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-0.5">▸</span>
                                    <span><strong className="text-green-300">Análisis espacio-temporal</strong>: Identificación de 
                                    patrones estacionales y tendencias de largo plazo en regímenes de fuego.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-0.5">▸</span>
                                    <span><strong className="text-blue-300">Estimación de emisiones</strong>: Cuantificación de 
                                    gases de efecto invernadero y aerosoles liberados por biomasa quemada.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 mt-0.5">▸</span>
                                    <span><strong className="text-red-300">Planificación territorial</strong>: Apoyo en la toma de 
                                    decisiones para políticas de prevención y manejo de incendios forestales.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="text-xs text-gray-400 italic mt-2">
                            Fuente: van der Werf et al. (2017), Andela et al. (2019)
                        </div>
                    </div>

                    {/* Contexto Regional Patagonia */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                            Contexto Regional: Patagonia Argentina
                        </h5>
                        <p className="leading-relaxed mb-2">
                            La región patagónica presenta un régimen de incendios característico influenciado por 
                            <strong className="text-teal-300"> condiciones climáticas semi-áridas</strong>, vientos fuertes 
                            (especialmente el Zonda) y vegetación xerófila adaptada al fuego. La <strong className="text-orange-300">
                            interfaz urbano-forestal</strong> en expansión incrementa el riesgo de incendios de origen antrópico.
                        </p>
                        <p className="leading-relaxed">
                            El monitoreo satelital es crucial en esta región de <strong className="text-green-300">difícil acceso</strong> 
                            y baja densidad poblacional, donde los medios tradicionales de vigilancia son limitados. 
                            Los datos FIRMS permiten una <strong className="text-purple-300">cobertura continua</strong> del territorio 
                            para la detección temprana y respuesta coordinada.
                        </p>
                        <div className="text-xs text-gray-400 italic mt-2">
                            Fuente: Kitzberger et al. (2012), Mundo et al. (2013)
                        </div>
                    </div>

                    {/* Limitaciones y Consideraciones */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-yellow-700/30">
                        <h5 className="font-bold text-yellow-300 mb-2 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Limitaciones Metodológicas
                        </h5>
                        <ul className="space-y-1.5 text-gray-400">
                            <li>• <strong className="text-yellow-200">Cobertura nubosa</strong>: Puede impedir la detección de incendios activos</li>
                            <li>• <strong className="text-yellow-200">Resolución temporal</strong>: 1-2 pasadas diarias por sensor pueden omitir eventos breves</li>
                            <li>• <strong className="text-yellow-200">Incendios pequeños</strong>: Fuegos menores al tamaño del píxel pueden no ser detectados</li>
                            <li>• <strong className="text-yellow-200">Falsos positivos</strong>: Actividad volcánica o industrial puede generar detecciones erróneas</li>
                        </ul>
                        <div className="text-xs text-gray-400 italic mt-2">
                            Fuente: Roy et al. (2008), Schroeder et al. (2016)
                        </div>
                    </div>

                    {/* Referencias Bibliográficas */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Referencias Principales
                        </h5>
                        <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                            <p>• Giglio, L., Schroeder, W., & Justice, C. O. (2016). The collection 6 MODIS active fire detection algorithm and fire products. <em>Remote Sensing of Environment</em>, 178, 31-41.</p>
                            <p>• Schroeder, W., Oliva, P., Giglio, L., & Csiszar, I. A. (2014). The New VIIRS 375m active fire detection data product. <em>Remote Sensing of Environment</em>, 149, 262-270.</p>
                            <p>• Justice, C. O., et al. (2002). The MODIS fire products. <em>Remote Sensing of Environment</em>, 83(1-2), 244-262.</p>
                            <p>• Kitzberger, T., Brown, P. M., Heyerdahl, E. K., Swetnam, T. W., & Veblen, T. T. (2007). Contingent Pacific–Atlantic Ocean influence on multicentury wildfire synchrony. <em>PNAS</em>, 104(2), 543-548.</p>
                            <p>• van der Werf, G. R., et al. (2017). Global fire emissions estimates during 1997–2016. <em>Earth System Science Data</em>, 9(2), 697-720.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
