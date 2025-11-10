"use client";
import { useState, useEffect } from "react";

type ScrollDirection = "up" | "down" | "initial";

const threshold = 10; // Distância mínima de rolagem para detectar mudança

export function useScrollDirection(): ScrollDirection {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>("initial");

  useEffect(() => {
    // Posição da última rolagem
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      // Se o scrollY for menor que o threshold (estiver no topo), ele está 'initial'
      if (scrollY < threshold) {
        setScrollDir("initial");
        lastScrollY = scrollY > 0 ? scrollY : 0;
        return;
      }

      // Detecta a direção da rolagem
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // Ignora pequenos movimentos para evitar jittering
        return;
      }

      // Se a rolagem atual for maior que a anterior (rolando para baixo)
      if (scrollY > lastScrollY && scrollDir !== "down") {
        setScrollDir("down");
      }
      // Se a rolagem atual for menor que a anterior (rolando para cima)
      else if (scrollY < lastScrollY && scrollDir !== "up") {
        setScrollDir("up");
      }

      // Atualiza a última posição de rolagem
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDir);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return scrollDir;
}
