export type SiteLogoProps = {
  className?: string
}

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <a href="/" className={`${className} inline-block`}>
      <div className="flex items-center gap-2">
        <span className="latty latty-logo text-sky-500"></span>
        <span className="text-lg font-bold">EditorY</span>
      </div>
    </a>
  );
}
