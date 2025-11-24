import React from 'react';

interface DeveloperProfileProps {
    appVersion: string;
    totalFires: number;
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ appVersion, totalFires }) => (
    <div className="info-sistema bg-gradient-to-br from-slate-900/50 to-gray-900/50 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
        <div className="space-y-4">
            {/* Información del Desarrollador */}
            <div className="pt-3 border-t border-gray-700/50">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Desarrollo
                </h4>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        CQ
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white">Camilo Quiroga</div>
                        <div className="text-xs text-gray-400">Software Engineer • Geomática</div>
                    </div>
                </div>

                {/* Tecnologías */}
                <div className="mb-3">
                    <h5 className="text-xs font-semibold text-gray-400 mb-2.5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Stack Tecnológico
                    </h5>
                    <div className="space-y-2">
                        {/* Frontend Core */}
                        <div>
                            <div className="text-xs text-gray-500 mb-1 font-medium">Frontend</div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2.5 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-md border border-blue-600/30 font-medium">React 19.1</span>
                                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30 font-medium">TypeScript 5.8</span>
                                <span className="px-2.5 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-md border border-purple-600/30 font-medium">Vite 6.3</span>
                                <span className="px-2.5 py-1 bg-cyan-600/20 text-cyan-300 text-xs rounded-md border border-cyan-600/30 font-medium">Tailwind CSS</span>
                            </div>
                        </div>
                        {/* Mapeo y Datos */}
                        <div>
                            <div className="text-xs text-gray-500 mb-1 font-medium">Mapeo & Análisis</div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2.5 py-1 bg-green-600/20 text-green-300 text-xs rounded-md border border-green-600/30 font-medium">Leaflet 1.9</span>
                                <span className="px-2.5 py-1 bg-pink-600/20 text-pink-300 text-xs rounded-md border border-pink-600/30 font-medium">Chart.js 4.4</span>
                                <span className="px-2.5 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-md border border-orange-600/30 font-medium">NASA FIRMS</span>
                            </div>
                        </div>
                        {/* Testing */}
                        <div>
                            <div className="text-xs text-gray-500 mb-1 font-medium">Testing & QA</div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2.5 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-md border border-yellow-600/30 font-medium">Vitest 3.2</span>
                                <span className="px-2.5 py-1 bg-indigo-600/20 text-indigo-300 text-xs rounded-md border border-indigo-600/30 font-medium">Testing Library</span>
                                <span className="px-2.5 py-1 bg-teal-600/20 text-teal-300 text-xs rounded-md border border-teal-600/30 font-medium">MSW 2.12</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enlaces profesionales y repositorio */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                    <a
                        href="https://github.com/camiloquirogadev/patagonia-verde"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-xs group bg-gray-800/50 px-2.5 py-1.5 rounded-md border border-gray-700/50 hover:border-gray-600"
                        aria-label="Ver repositorio en GitHub"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Repo
                    </a>
                    <a
                        href="https://www.linkedin.com/in/camilo-quiroga-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors text-xs group bg-blue-950/30 px-2.5 py-1.5 rounded-md border border-blue-900/50 hover:border-blue-700/50"
                        aria-label="Conectar en LinkedIn"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                    </a>
                    <a
                        href="mailto:quirogacamilodev@gmail.com"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-green-400 transition-colors text-xs group bg-green-950/30 px-2.5 py-1.5 rounded-md border border-green-900/50 hover:border-green-700/50"
                        aria-label="Enviar email"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                    </a>
                </div>

                {/* Estadísticas del Proyecto */}
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <h5 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Estadísticas del Proyecto
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gradient-to-br from-indigo-600/10 to-blue-600/10 rounded-lg p-2.5 border border-indigo-600/20">
                            <div className="flex items-center gap-1.5 mb-1">
                                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-gray-400">En línea desde</span>
                            </div>
                            <div className="text-sm font-bold text-indigo-300">Oct 2024</div>
                            <div className="text-xs text-gray-500">{
                                (() => {
                                    const startDate = new Date('2024-10-01');
                                    const today = new Date();
                                    const diffTime = Math.abs(today.getTime() - startDate.getTime());
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    const months = Math.floor(diffDays / 30);
                                    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
                                })()
                            }</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-lg p-2.5 border border-orange-600/20">
                            <div className="flex items-center gap-1.5 mb-1">
                                <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                </svg>
                                <span className="text-xs text-gray-400">Incendios</span>
                            </div>
                            <div className="text-sm font-bold text-orange-300">{totalFires.toLocaleString('es-AR')}</div>
                            <div className="text-xs text-gray-500">registrados</div>
                        </div>
                    </div>
                </div>

                {/* Botones de donación */}
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Apoya este Proyecto
                    </h4>
                    <p className="text-xs text-gray-400 mb-3">
                        Ayuda a mantener este proyecto activo y gratuito para todos
                    </p>
                    <div className="flex items-center gap-2">
                        <a
                            href="https://ko-fi.com/camiloquirogadev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-600/30 hover:to-orange-600/30 text-red-300 hover:text-red-200 transition-all text-xs py-2.5 px-3 rounded-lg border border-red-600/30 group shadow-lg shadow-red-600/10"
                            aria-label="Invítame un café en Ko-fi"
                        >
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
                            </svg>
                            Ko-fi
                        </a>
                        <a
                            href="https://github.com/sponsors/camiloquirogadev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-purple-300 hover:text-purple-200 transition-all text-xs py-2.5 px-3 rounded-lg border border-purple-600/30 group shadow-lg shadow-purple-600/10"
                            aria-label="Patrocinar en GitHub Sponsors"
                        >
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            Sponsor
                        </a>
                    </div>
                </div>

                {/* Versión y licencia */}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-700/30">
                    <span>v{appVersion}</span>
                    <span>MIT License</span>
                </div>
            </div>
        </div>
    </div>
);
