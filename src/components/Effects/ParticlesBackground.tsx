import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import { useTheme } from "../../context/ThemeContext";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (_container?: Container): Promise<void> => {
        // Loaded
    };

    if (!init) return null;

    const isDark = theme === 'dark';
    const primaryColor = isDark ? "#ffffff" : "#1e1b4b";
    const accentColor = "#fbbf24";
    const secondaryColor = isDark ? "#0ea5e9" : "#0284c7";

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            links: {
                                opacity: isDark ? 0.2 : 0.4,
                                color: accentColor
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: [primaryColor, accentColor, secondaryColor],
                    },
                    links: {
                        color: primaryColor,
                        distance: 200,
                        enable: true,
                        opacity: isDark ? 0.03 : 0.1,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 40,
                    },
                    opacity: {
                        value: { min: 0.05, max: isDark ? 0.2 : 0.4 },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false
                        }
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 2 },
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none"
            }}
        />
    );
};

export default ParticlesBackground;
