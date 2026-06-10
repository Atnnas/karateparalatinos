import Link from "next/link";
import Image from "next/image";
import { Shield, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import KPLLogo from "../../../KPLLogo.png";

export default function Footer() {
  return (
    <footer className="bg-dojo-wood border-t border-[#8B6914]/20 py-12 relative overflow-hidden shadow-wood-3d shine-sweep-wood glass-reflection-wood">
      {/* Background sutil */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B6914]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A845]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Fila Superior: Logo y Contacto */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-[#3B2210]/15">
          
          {/* Logo y Eslogan */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-14 h-14 rounded-full border-2 border-[#8B6914]/50 bg-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
              <Image
                src={KPLLogo}
                alt="Logo Karate para Latinos"
                width={56}
                height={56}
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-impact-condensed text-xl sm:text-2xl tracking-wider text-[#3B2210] group-hover:text-[#5A3A1F] transition-colors drop-shadow-[0_1px_1px_rgba(255,240,210,0.5)]">
                KARATE PARA LATINOS
              </span>
              <span className="text-[#5A3A1F]/70 text-xs font-light tracking-wide mt-0.5">
                Tradición Oriental
              </span>
            </div>
          </Link>

          {/* Contacto en Pastillas Flotantes (Sleek Badges) */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-3 text-[#3B2210]/95 relative z-10">
            <div className="flex items-center gap-2 border border-[#3B2210]/20 bg-white/30 py-1.5 px-4 rounded-full text-xs backdrop-blur-sm shadow-inner transition-all hover:border-[#3B2210]/40">
              <MapPin className="w-3.5 h-3.5 text-[#3B2210]/80" />
              <span>México</span>
            </div>
            <a 
              href="tel:+525512345678" 
              className="flex items-center gap-2 border border-[#3B2210]/20 bg-white/30 py-1.5 px-4 rounded-full text-xs backdrop-blur-sm hover:bg-white/50 hover:border-[#3B2210]/40 transition-all shadow-inner"
            >
              <Phone className="w-3.5 h-3.5 text-[#3B2210]/80" />
              <span>+52 55 1234-5678</span>
            </a>
            <a 
              href="mailto:contacto@ejemplo.com" 
              className="flex items-center gap-2 border border-[#3B2210]/20 bg-white/30 py-1.5 px-4 rounded-full text-xs backdrop-blur-sm hover:bg-white/50 hover:border-[#3B2210]/40 transition-all shadow-inner"
            >
              <Mail className="w-3.5 h-3.5 text-[#3B2210]/80" />
              <span>contacto@ejemplo.com</span>
            </a>
          </div>
        </div>

        {/* Fila Intermedia: Eslogan de Valores */}
        <div className="py-6 flex justify-center items-center border-b border-[#3B2210]/15 relative z-10">
          
          {/* Disciplina y Propósito */}
          <div className="flex items-center gap-4 text-xs text-[#3B2210]/90 font-title-serif drop-shadow-[0_1px_1px_rgba(255,240,210,0.2)]">
            <div className="flex items-center gap-1.5 font-medium">
              <Shield className="w-4 h-4 text-[#3B2210]" />
              <span>Disciplina</span>
            </div>
            <span className="text-[#3B2210]/40">•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-[#3B2210]" />
              <span>Propósito</span>
            </div>
          </div>
        </div>

        {/* Fila Inferior: Copyright */}
        <div className="pt-8 text-center relative z-10">
          <p className="text-[#3B2210]/85 text-sm sm:text-base tracking-wider drop-shadow-[0_1px_1px_rgba(255,240,210,0.3)]">
            © 2026 Karate para Latinos. Todos los derechos reservados.! <span className="text-[#3B2210] font-extrabold ml-1">KumaDev.inc</span>
          </p>
        </div>
        
      </div>
    </footer>
  );
}
