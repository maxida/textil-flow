interface JerseyProps {
  primaryColor: string; // Ej: '#7DD3FC' (Celeste)
  secondaryColor?: string; // Ej: '#FFFFFF' (Blanco)
  pattern?: 'solid' | 'striped' | 'v-stripes'; 
  className?: string;
}

export const JerseyIcon = ({ primaryColor, secondaryColor, pattern = 'solid', className }: JerseyProps) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Silueta de la Camiseta */}
      <path 
        d="M20,25 L35,15 L45,20 L55,20 L65,15 L80,25 L85,45 L75,50 L75,85 L25,85 L25,50 L15,45 Z" 
        fill={primaryColor} 
        stroke="#1e293b" 
        strokeWidth="2"
      />
      
      {/* Patrón de Rayas (Solo si el modelo lo requiere, como Atlético) */}
      {pattern === 'striped' && (
        <g fill={secondaryColor}>
          <rect x="35" y="20" width="8" height="65" />
          <rect x="57" y="20" width="8" height="65" />
        </g>
      )}

      {/* Detalle del Cuello */}
      <path d="M42,20 Q50,28 58,20" fill="none" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
};