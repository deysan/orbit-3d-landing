export default function CoreFallback({ unavailable = false }: { unavailable?: boolean }) {
  return (
    <div className="core-fallback" role="img" aria-label="Static AI Core: a faceted center surrounded by three open orbital rings.">
      <svg viewBox="0 0 440 440" aria-hidden="true" fill="none">
        <path className="fallback-ring fallback-teal" d="M257 373C155 390 72 317 81 213S172 61 263 90s132 163 72 239" />
        <path className="fallback-ring fallback-violet" d="M167 307C114 251 123 143 185 111s132 29 137 119-48 130-96 126" />
        <path className="fallback-ring fallback-teal" d="M112 183C34 186 65 250 165 286s214 26 218-13-87-69-130-71" />
        <g stroke="#435762" strokeWidth="1">
          <path d="m220 154 58 32 17 62-55 44-66-21-23-59Z" fill="#283741" />
          <path d="m220 154 18 56-64 61-23-59Z" fill="#394e58" />
          <path d="m220 154 58 32-40 24Z" fill="#74bebd" />
          <path d="m238 210 57 38-55 44-66-21Z" fill="#1c2b34" />
          <path d="m278 186 17 62-57-38Z" fill="#58607c" />
          <path d="m151 212 33 8-10 51Z" fill="#5bb2aa" />
        </g>
      </svg>
      <p>{unavailable ? "A static view. The 3D demo is unavailable." : "A static preview while the 3D core loads."}</p>
    </div>
  );
}
