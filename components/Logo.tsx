/**
 * FinKit SVG Logo.
 *
 * A compact brand mark for the sidebar, footer, and any place the FinKit
 * identity needs to appear. The design uses a stylized "F" in a rounded
 * square — financial but friendly.
 */
export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FinKit"
      role="img"
    >
      {/* Rounded square background */}
      <rect width="32" height="32" rx="8" fill="#18181b" />
      {/* Stylized "F" */}
      <path
        d="M12 8V24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 8H20.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5H18"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
