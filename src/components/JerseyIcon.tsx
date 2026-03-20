import React from 'react';

interface JerseyProps {
  primaryColor: string;
  secondaryColor?: string;
  pattern?: 'solid' | 'striped' | 'v-stripes';
  className?: string;
}

export const JerseyIcon = ({ 
  primaryColor, 
  secondaryColor = '#ffffff', 
  pattern = 'solid', 
  className = "w-12 h-12" 
}: JerseyProps) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Definición de la máscara para que los patrones no se salgan de la camiseta */}
      <defs>
        <mask id="jerseyMask">
          <path d="M20,25 L35,15 L45,20 L55,20 L65,15 L80,25 L85,45 L75,50 L75,85 L25,85 L25,50 L15,45 Z" fill="white" />
        </mask>
      </defs>

      {/* Silueta Base */}
      <path 
        d="M20,25 L35,15 L45,20 L55,20 L65,15 L80,25 L85,45 L75,50 L75,85 L25,85 L25,50 L15,45 Z" 
        fill={primaryColor} 
        stroke="#1e293b" 
        strokeWidth="2"
      />
      
      {/* Capa de Patrones con Máscara */}
      <g mask="url(#jerseyMask)">
        {pattern === 'striped' && (
          <g fill={secondaryColor}>
            <rect x="30" y="0" width="10" height="100" />
            <rect x="50" y="0" width="10" height="100" />
            <rect x="70" y="0" width="10" height="100" />
            <rect x="10" y="0" width="10" height="100" />
          </g>
        )}
        {pattern === 'v-stripes' && (
          <path 
            d="M0,30 L100,70 L100,85 L0,45 Z" 
            fill={secondaryColor} 
            opacity="0.9"
          />
        )}
      </g>

      {/* Detalle del Cuello y Bordes */}
      <path d="M42,20 Q50,28 58,20" fill="none" stroke="#1e293b" strokeWidth="2" />
      <path d="M25,50 L15,45 M75,50 L85,45" fill="none" stroke="#1e293b" strokeWidth="1" />
    </svg>
  );
};