import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({
  variant = "",
  size,
  className,
}: {
  variant?: "" | "link";
  size?: number;
  className?: string;
}) {
  if (variant === "link") {
    return (
      <Link href={"/"} className={cn("inline-block", className)}>
        <LogoIcon />
      </Link>
    );
  }

  return (
    <div className={cn("inline-block", className)}>
      <LogoIcon size={size} />
    </div>
  );
}

function LogoIcon({ size = 50 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 98 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_104_10"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="98"
        height="98"
      >
        <rect width="98" height="98" fill="white" />
      </mask>
      <g mask="url(#mask0_104_10)">
        <path
          d="M52.8125 28.625L62.1875 17.1875H3.5V0.3125H99.0625L44.375 69L34.625 81.125H96V98H-1.3125L52.8125 28.625Z"
          className="fill-primary"
        />
        <path
          d="M7.61914 38.707H4.72852V22.4766H7.61914V23.5605C7.87305 23.3848 8.17253 23.2188 8.51758 23.0625C8.86263 22.9062 9.23372 22.7695 9.63086 22.6523C10.028 22.5352 10.4382 22.444 10.8613 22.3789C11.2845 22.3073 11.7077 22.2715 12.1309 22.2715C13.1074 22.2715 14.0026 22.4147 14.8164 22.7012C15.6367 22.9876 16.3398 23.3913 16.9258 23.9121C17.5117 24.4329 17.9674 25.0579 18.293 25.7871C18.625 26.5098 18.791 27.3105 18.791 28.1895C18.791 29.1074 18.6185 29.9375 18.2734 30.6797C17.9284 31.4154 17.4499 32.0469 16.8379 32.5742C16.2324 33.0951 15.5098 33.4987 14.6699 33.7852C13.8366 34.0651 12.9316 34.2051 11.9551 34.2051C11.5384 34.2051 11.125 34.179 10.7148 34.127C10.3112 34.0749 9.92057 34.0033 9.54297 33.9121C9.17188 33.821 8.82031 33.7135 8.48828 33.5898C8.16276 33.4596 7.87305 33.3197 7.61914 33.1699V38.707ZM7.61914 30.377C7.91211 30.6113 8.22135 30.8099 8.54688 30.9727C8.8724 31.1354 9.20443 31.2689 9.54297 31.373C9.88151 31.4772 10.2233 31.5553 10.5684 31.6074C10.9134 31.653 11.2487 31.6758 11.5742 31.6758C12.2383 31.6758 12.8275 31.5879 13.3418 31.4121C13.8626 31.2298 14.2988 30.9824 14.6504 30.6699C15.0085 30.3574 15.2819 29.9896 15.4707 29.5664C15.6595 29.1432 15.7539 28.6842 15.7539 28.1895C15.7539 27.7272 15.6595 27.291 15.4707 26.8809C15.2884 26.4707 15.0215 26.1126 14.6699 25.8066C14.3249 25.4941 13.9049 25.25 13.4102 25.0742C12.9219 24.8919 12.3717 24.8008 11.7598 24.8008C11.3691 24.8008 10.9785 24.8398 10.5879 24.918C10.1973 24.9896 9.81966 25.0938 9.45508 25.2305C9.09701 25.3672 8.75846 25.5332 8.43945 25.7285C8.12695 25.9238 7.85352 26.1419 7.61914 26.3828V30.377ZM21.5254 22.4766H24.416V24.1367C25.054 23.6615 25.7279 23.2513 26.4375 22.9062C27.1471 22.5612 27.8535 22.2975 28.5566 22.1152L29.4062 24.7617C28.293 24.8724 27.3132 25.123 26.4668 25.5137C25.627 25.8978 24.9434 26.4414 24.416 27.1445V34H21.5254V22.4766ZM30.8711 28.2383C30.8711 27.4115 31.0371 26.6367 31.3691 25.9141C31.7077 25.1914 32.1862 24.5599 32.8047 24.0195C33.4297 23.4792 34.1816 23.0527 35.0605 22.7402C35.946 22.4277 36.9388 22.2715 38.0391 22.2715C39.1393 22.2715 40.1289 22.4277 41.0078 22.7402C41.8932 23.0527 42.6452 23.4792 43.2637 24.0195C43.8887 24.5599 44.3672 25.1914 44.6992 25.9141C45.0378 26.6367 45.207 27.4115 45.207 28.2383C45.207 29.0651 45.0378 29.8398 44.6992 30.5625C44.3672 31.2852 43.8887 31.9167 43.2637 32.457C42.6452 32.9974 41.8932 33.4238 41.0078 33.7363C40.1289 34.0488 39.1393 34.2051 38.0391 34.2051C36.9388 34.2051 35.946 34.0488 35.0605 33.7363C34.1816 33.4238 33.4297 32.9974 32.8047 32.457C32.1862 31.9167 31.7077 31.2852 31.3691 30.5625C31.0371 29.8398 30.8711 29.0651 30.8711 28.2383ZM33.9082 28.2383C33.9082 28.7005 33.9993 29.14 34.1816 29.5566C34.3704 29.9668 34.6406 30.3314 34.9922 30.6504C35.3503 30.9629 35.7832 31.2135 36.291 31.4023C36.8053 31.5846 37.388 31.6758 38.0391 31.6758C38.6901 31.6758 39.2695 31.5846 39.7773 31.4023C40.2917 31.2135 40.7246 30.9629 41.0762 30.6504C41.4342 30.3314 41.7044 29.9668 41.8867 29.5566C42.0755 29.14 42.1699 28.7005 42.1699 28.2383C42.1699 27.776 42.0755 27.3366 41.8867 26.9199C41.7044 26.5033 41.4342 26.1387 41.0762 25.8262C40.7246 25.5072 40.2917 25.2565 39.7773 25.0742C39.2695 24.8854 38.6901 24.791 38.0391 24.791C37.388 24.791 36.8053 24.8854 36.291 25.0742C35.7832 25.2565 35.3503 25.5072 34.9922 25.8262C34.6406 26.1387 34.3704 26.5033 34.1816 26.9199C33.9993 27.3366 33.9082 27.776 33.9082 28.2383Z"
          className="fill-primary"
        />
        <path
          d="M79.7949 72.2383L75.0293 66.4668H78.7207L81.6113 69.9824L84.3555 66.4668H87.959L83.4766 72.2285L88.2422 78H84.5508L81.5723 74.3965L78.8086 78H75.2051L79.7949 72.2383ZM91.8262 68.6445H89.043V66.4766H91.8262V62.8926H94.7168V66.4766H97.5V68.6445H94.7168V78H91.8262V68.6445Z"
          className="fill-primary"
        />
      </g>
    </svg>
  );
}

export function FullLogo({
  variant = "",
  size,
  className,
}: {
  variant?: "" | "link";
  size?: number;
  className?: string;
}) {
  if (variant === "link") {
    return (
      <Link href={"/"} className={cn("inline-block", className)}>
        <FullLogoIcon />
      </Link>
    );
  }

  return (
    <div className={cn("inline-block", className)}>
      <FullLogoIcon size={size} />
    </div>
  );
}

function FullLogoIcon({ size = 50 }: { size?: number }) {
  return (
    <svg
      // width="686"
      // height="298"
      width={size}
      height={(298 / 686) * size + 1}
      viewBox="0 0 686 298"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_113_6"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="686"
        height="298"
      >
        <rect width="686" height="298" fill="white" />
      </mask>
      <g mask="url(#mask0_113_6)">
        <path
          d="M26.8555 256.863C28.8281 256.863 30.6152 257.156 32.2168 257.742C33.8184 258.328 35.1758 259.129 36.2891 260.145C37.4219 261.16 38.291 262.352 38.8965 263.719C39.502 265.066 39.8047 266.502 39.8047 268.025V285.838C39.8047 287.361 39.502 288.807 38.8965 290.174C38.291 291.521 37.4219 292.703 36.2891 293.719C35.1758 294.734 33.8184 295.535 32.2168 296.121C30.6152 296.707 28.8281 297 26.8555 297H17.832C15.8594 297 14.0723 296.707 12.4707 296.121C10.8691 295.535 9.50195 294.734 8.36914 293.719C7.25586 292.703 6.39648 291.521 5.79102 290.174C5.18555 288.807 4.88281 287.361 4.88281 285.838V268.025C4.88281 266.502 5.18555 265.066 5.79102 263.719C6.39648 262.352 7.25586 261.16 8.36914 260.145C9.50195 259.129 10.8691 258.328 12.4707 257.742C14.0723 257.156 15.8594 256.863 17.832 256.863H26.8555ZM32.2461 264.246L31.8359 261.785L29.9609 259.91L26.9727 259.5H16.0449V283.729H19.0918V275.086H26.9727L29.9609 274.734L31.8359 272.889L32.2461 270.369V264.246ZM28.7012 271.688L26.7969 271.98H19.0918V262.605H26.7969L28.8184 262.928L29.1113 264.656V270.047L28.7012 271.688ZM61.543 256.863C63.5156 256.863 65.3027 257.156 66.9043 257.742C68.5059 258.328 69.8633 259.129 70.9766 260.145C72.1094 261.16 72.9785 262.352 73.584 263.719C74.1895 265.066 74.4922 266.502 74.4922 268.025V285.838C74.4922 287.361 74.1895 288.807 73.584 290.174C72.9785 291.521 72.1094 292.703 70.9766 293.719C69.8633 294.734 68.5059 295.535 66.9043 296.121C65.3027 296.707 63.5156 297 61.543 297H52.5195C50.5469 297 48.7598 296.707 47.1582 296.121C45.5566 295.535 44.1895 294.734 43.0566 293.719C41.9434 292.703 41.084 291.521 40.4785 290.174C39.873 288.807 39.5703 287.361 39.5703 285.838V268.025C39.5703 266.502 39.873 265.066 40.4785 263.719C41.084 262.352 41.9434 261.16 43.0566 260.145C44.1895 259.129 45.5566 258.328 47.1582 257.742C48.7598 257.156 50.5469 256.863 52.5195 256.863H61.543ZM67.5781 264.246L67.168 261.785L65.3223 259.91L62.3047 259.5H54.4531L51.4648 259.91L49.5898 261.785L49.2383 264.246V279.012L49.5898 281.531L51.5234 283.377L54.4531 283.729H62.3047L65.3223 283.377L67.168 281.531L67.5781 279.012V264.246ZM64.0625 280.33L62.1289 280.623H54.6289L52.7246 280.33L52.2852 278.572V264.539L52.5781 262.928L54.6289 262.605H62.1289L64.1797 262.928L64.4727 264.656V278.689L64.0625 280.33ZM96.2305 256.863C98.2031 256.863 99.9902 257.156 101.592 257.742C103.193 258.328 104.551 259.129 105.664 260.145C106.797 261.16 107.666 262.352 108.271 263.719C108.877 265.066 109.18 266.502 109.18 268.025V285.838C109.18 287.361 108.877 288.807 108.271 290.174C107.666 291.521 106.797 292.703 105.664 293.719C104.551 294.734 103.193 295.535 101.592 296.121C99.9902 296.707 98.2031 297 96.2305 297H87.207C85.2344 297 83.4473 296.707 81.8457 296.121C80.2441 295.535 78.877 294.734 77.7441 293.719C76.6309 292.703 75.7715 291.521 75.166 290.174C74.5605 288.807 74.2578 287.361 74.2578 285.838V268.025C74.2578 266.502 74.5605 265.066 75.166 263.719C75.7715 262.352 76.6309 261.16 77.7441 260.145C78.877 259.129 80.2441 258.328 81.8457 257.742C83.4473 257.156 85.2344 256.863 87.207 256.863H96.2305ZM97.7246 276.492V283.729H100.83V276.17L99.8047 273.475L96.4648 272.273L99.6875 270.721L100.596 268.084V264.832L100.244 262.371L98.3105 259.91L95.3809 259.5H84.4531V283.729H87.5879V273.973H95.2051L97.2852 274.91L97.7246 276.492ZM95.2051 262.605L97.2852 263.514L97.4902 265.213V268.318L97.0508 269.93L95.2051 270.838H87.5879V262.605H95.2051ZM136.484 259.5H119.551V262.605H126.465V283.729H129.6V262.605H136.484V259.5ZM130.918 256.863C132.891 256.863 134.678 257.156 136.279 257.742C137.881 258.328 139.238 259.129 140.352 260.145C141.484 261.16 142.354 262.352 142.959 263.719C143.564 265.066 143.867 266.502 143.867 268.025V285.838C143.867 287.361 143.564 288.807 142.959 290.174C142.354 291.521 141.484 292.703 140.352 293.719C139.238 294.734 137.881 295.535 136.279 296.121C134.678 296.707 132.891 297 130.918 297H121.895C119.922 297 118.135 296.707 116.533 296.121C114.932 295.535 113.564 294.734 112.432 293.719C111.318 292.703 110.459 291.521 109.854 290.174C109.248 288.807 108.945 287.361 108.945 285.838V268.025C108.945 266.502 109.248 265.066 109.854 263.719C110.459 262.352 111.318 261.16 112.432 260.145C113.564 259.129 114.932 258.328 116.533 257.742C118.135 257.156 119.922 256.863 121.895 256.863H130.918ZM168.301 269.578H158.516V262.605H169.971V259.5H155.381V283.729H158.516V272.654H168.301V269.578ZM165.605 256.863C167.578 256.863 169.365 257.156 170.967 257.742C172.568 258.328 173.926 259.129 175.039 260.145C176.172 261.16 177.041 262.352 177.646 263.719C178.252 265.066 178.555 266.502 178.555 268.025V285.838C178.555 287.361 178.252 288.807 177.646 290.174C177.041 291.521 176.172 292.703 175.039 293.719C173.926 294.734 172.568 295.535 170.967 296.121C169.365 296.707 167.578 297 165.605 297H156.582C154.609 297 152.822 296.707 151.221 296.121C149.619 295.535 148.252 294.734 147.119 293.719C146.006 292.703 145.146 291.521 144.541 290.174C143.936 288.807 143.633 287.361 143.633 285.838V268.025C143.633 266.502 143.936 265.066 144.541 263.719C145.146 262.352 146.006 261.16 147.119 260.145C148.252 259.129 149.619 258.328 151.221 257.742C152.822 257.156 154.609 256.863 156.582 256.863H165.605ZM200.293 256.863C202.266 256.863 204.053 257.156 205.654 257.742C207.256 258.328 208.613 259.129 209.727 260.145C210.859 261.16 211.729 262.352 212.334 263.719C212.939 265.066 213.242 266.502 213.242 268.025V285.838C213.242 287.361 212.939 288.807 212.334 290.174C211.729 291.521 210.859 292.703 209.727 293.719C208.613 294.734 207.256 295.535 205.654 296.121C204.053 296.707 202.266 297 200.293 297H191.27C189.297 297 187.51 296.707 185.908 296.121C184.307 295.535 182.939 294.734 181.807 293.719C180.693 292.703 179.834 291.521 179.229 290.174C178.623 288.807 178.32 287.361 178.32 285.838V268.025C178.32 266.502 178.623 265.066 179.229 263.719C179.834 262.352 180.693 261.16 181.807 260.145C182.939 259.129 184.307 258.328 185.908 257.742C187.51 257.156 189.297 256.863 191.27 256.863H200.293ZM206.328 264.246L205.918 261.785L204.072 259.91L201.055 259.5H193.203L190.215 259.91L188.34 261.785L187.988 264.246V279.012L188.34 281.531L190.273 283.377L193.203 283.729H201.055L204.072 283.377L205.918 281.531L206.328 279.012V264.246ZM202.812 280.33L200.879 280.623H193.379L191.475 280.33L191.035 278.572V264.539L191.328 262.928L193.379 262.605H200.879L202.93 262.928L203.223 264.656V278.689L202.812 280.33ZM238.379 280.623H229.385V259.5H226.279V283.729H238.379V280.623ZM234.98 256.863C236.953 256.863 238.74 257.156 240.342 257.742C241.943 258.328 243.301 259.129 244.414 260.145C245.547 261.16 246.416 262.352 247.021 263.719C247.627 265.066 247.93 266.502 247.93 268.025V285.838C247.93 287.361 247.627 288.807 247.021 290.174C246.416 291.521 245.547 292.703 244.414 293.719C243.301 294.734 241.943 295.535 240.342 296.121C238.74 296.707 236.953 297 234.98 297H225.957C223.984 297 222.197 296.707 220.596 296.121C218.994 295.535 217.627 294.734 216.494 293.719C215.381 292.703 214.521 291.521 213.916 290.174C213.311 288.807 213.008 287.361 213.008 285.838V268.025C213.008 266.502 213.311 265.066 213.916 263.719C214.521 262.352 215.381 261.16 216.494 260.145C217.627 259.129 218.994 258.328 220.596 257.742C222.197 257.156 223.984 256.863 225.957 256.863H234.98ZM258.301 280.623V283.729H275.234V280.623H268.35V262.605H275.234V259.5H258.301V262.605H265.215V280.623H258.301ZM269.668 256.863C271.641 256.863 273.428 257.156 275.029 257.742C276.631 258.328 277.988 259.129 279.102 260.145C280.234 261.16 281.104 262.352 281.709 263.719C282.314 265.066 282.617 266.502 282.617 268.025V285.838C282.617 287.361 282.314 288.807 281.709 290.174C281.104 291.521 280.234 292.703 279.102 293.719C277.988 294.734 276.631 295.535 275.029 296.121C273.428 296.707 271.641 297 269.668 297H260.645C258.672 297 256.885 296.707 255.283 296.121C253.682 295.535 252.314 294.734 251.182 293.719C250.068 292.703 249.209 291.521 248.604 290.174C247.998 288.807 247.695 287.361 247.695 285.838V268.025C247.695 266.502 247.998 265.066 248.604 263.719C249.209 262.352 250.068 261.16 251.182 260.145C252.314 259.129 253.682 258.328 255.283 257.742C256.885 257.156 258.672 256.863 260.645 256.863H269.668ZM304.355 256.863C306.328 256.863 308.115 257.156 309.717 257.742C311.318 258.328 312.676 259.129 313.789 260.145C314.922 261.16 315.791 262.352 316.396 263.719C317.002 265.066 317.305 266.502 317.305 268.025V285.838C317.305 287.361 317.002 288.807 316.396 290.174C315.791 291.521 314.922 292.703 313.789 293.719C312.676 294.734 311.318 295.535 309.717 296.121C308.115 296.707 306.328 297 304.355 297H295.332C293.359 297 291.572 296.707 289.971 296.121C288.369 295.535 287.002 294.734 285.869 293.719C284.756 292.703 283.896 291.521 283.291 290.174C282.686 288.807 282.383 287.361 282.383 285.838V268.025C282.383 266.502 282.686 265.066 283.291 263.719C283.896 262.352 284.756 261.16 285.869 260.145C287.002 259.129 288.369 258.328 289.971 257.742C291.572 257.156 293.359 256.863 295.332 256.863H304.355ZM310.391 264.246L309.98 261.785L308.135 259.91L305.117 259.5H297.266L294.277 259.91L292.402 261.785L292.051 264.246V279.012L292.402 281.531L294.336 283.377L297.266 283.729H305.117L308.135 283.377L309.98 281.531L310.391 279.012V264.246ZM306.875 280.33L304.941 280.623H297.441L295.537 280.33L295.098 278.572V264.539L295.391 262.928L297.441 262.605H304.941L306.992 262.928L307.285 264.656V278.689L306.875 280.33ZM339.043 256.863C341.016 256.863 342.803 257.156 344.404 257.742C346.006 258.328 347.363 259.129 348.477 260.145C349.609 261.16 350.479 262.352 351.084 263.719C351.689 265.066 351.992 266.502 351.992 268.025V285.838C351.992 287.361 351.689 288.807 351.084 290.174C350.479 291.521 349.609 292.703 348.477 293.719C347.363 294.734 346.006 295.535 344.404 296.121C342.803 296.707 341.016 297 339.043 297H330.02C328.047 297 326.26 296.707 324.658 296.121C323.057 295.535 321.689 294.734 320.557 293.719C319.443 292.703 318.584 291.521 317.979 290.174C317.373 288.807 317.07 287.361 317.07 285.838V268.025C317.07 266.502 317.373 265.066 317.979 263.719C318.584 262.352 319.443 261.16 320.557 260.145C321.689 259.129 323.057 258.328 324.658 257.742C326.26 257.156 328.047 256.863 330.02 256.863H339.043ZM344.551 274.559L344.141 272.039L342.266 270.193L339.219 269.871H332.656L330.869 269.52C330.771 269.188 330.703 268.895 330.664 268.641C330.625 268.367 330.557 268.084 330.459 267.791V264.715L330.869 262.986L332.803 262.605H340.244L342.998 263.162L343.701 259.969L340.303 259.5H332.598L329.668 259.91L327.764 261.785L327.383 264.246V268.26L327.764 270.721L329.668 272.566L332.598 272.947H339.219L341.006 273.24C341.064 273.533 341.133 273.807 341.211 274.061C341.289 274.314 341.357 274.578 341.416 274.852V278.689C341.377 278.943 341.309 279.217 341.211 279.51C341.133 279.803 341.064 280.076 341.006 280.33L339.102 280.623H331.836L328.965 280.154L328.232 283.318L331.66 283.729H339.277L342.266 283.377L344.141 281.531L344.551 279.012V274.559ZM382.402 256.863C384.375 256.863 386.162 257.156 387.764 257.742C389.365 258.328 390.723 259.129 391.836 260.145C392.969 261.16 393.838 262.352 394.443 263.719C395.049 265.066 395.352 266.502 395.352 268.025V285.838C395.352 287.361 395.049 288.807 394.443 290.174C393.838 291.521 392.969 292.703 391.836 293.719C390.723 294.734 389.365 295.535 387.764 296.121C386.162 296.707 384.375 297 382.402 297H373.379C371.406 297 369.619 296.707 368.018 296.121C366.416 295.535 365.049 294.734 363.916 293.719C362.803 292.703 361.943 291.521 361.338 290.174C360.732 288.807 360.43 287.361 360.43 285.838V268.025C360.43 266.502 360.732 265.066 361.338 263.719C361.943 262.352 362.803 261.16 363.916 260.145C365.049 259.129 366.416 258.328 368.018 257.742C369.619 257.156 371.406 256.863 373.379 256.863H382.402ZM384.014 266.941V269.812H376.807L374.902 269.52L374.463 267.791V264.539L374.756 262.928L376.807 262.605H381.67L383.721 262.928L384.863 259.91L381.846 259.5H376.631L373.643 259.91L371.768 261.785L371.357 264.246V268.26L372.383 270.105L374.287 271.395L372.383 272.713L371.357 274.559V279.012L371.768 281.531L373.701 283.377L376.631 283.729H381.846L384.863 283.377L386.709 281.531L387.119 279.012V272.947L389.58 269.812H387.119V266.941H384.014ZM384.014 278.689L383.604 280.33L381.67 280.623H376.807L374.902 280.33L374.463 278.572V274.852L374.756 273.24L376.807 272.947H384.014V278.689ZM425.762 256.863C427.734 256.863 429.521 257.156 431.123 257.742C432.725 258.328 434.082 259.129 435.195 260.145C436.328 261.16 437.197 262.352 437.803 263.719C438.408 265.066 438.711 266.502 438.711 268.025V285.838C438.711 287.361 438.408 288.807 437.803 290.174C437.197 291.521 436.328 292.703 435.195 293.719C434.082 294.734 432.725 295.535 431.123 296.121C429.521 296.707 427.734 297 425.762 297H416.738C414.766 297 412.979 296.707 411.377 296.121C409.775 295.535 408.408 294.734 407.275 293.719C406.162 292.703 405.303 291.521 404.697 290.174C404.092 288.807 403.789 287.361 403.789 285.838V268.025C403.789 266.502 404.092 265.066 404.697 263.719C405.303 262.352 406.162 261.16 407.275 260.145C408.408 259.129 409.775 258.328 411.377 257.742C412.979 257.156 414.766 256.863 416.738 256.863H425.762ZM431.152 264.246L430.742 261.785L428.867 259.91L425.879 259.5H414.951V283.729H417.998V275.086H425.879L428.867 274.734L430.742 272.889L431.152 270.369V264.246ZM427.607 271.688L425.703 271.98H417.998V262.605H425.703L427.725 262.928L428.018 264.656V270.047L427.607 271.688ZM460.449 256.863C462.422 256.863 464.209 257.156 465.811 257.742C467.412 258.328 468.77 259.129 469.883 260.145C471.016 261.16 471.885 262.352 472.49 263.719C473.096 265.066 473.398 266.502 473.398 268.025V285.838C473.398 287.361 473.096 288.807 472.49 290.174C471.885 291.521 471.016 292.703 469.883 293.719C468.77 294.734 467.412 295.535 465.811 296.121C464.209 296.707 462.422 297 460.449 297H451.426C449.453 297 447.666 296.707 446.064 296.121C444.463 295.535 443.096 294.734 441.963 293.719C440.85 292.703 439.99 291.521 439.385 290.174C438.779 288.807 438.477 287.361 438.477 285.838V268.025C438.477 266.502 438.779 265.066 439.385 263.719C439.99 262.352 440.85 261.16 441.963 260.145C443.096 259.129 444.463 258.328 446.064 257.742C447.666 257.156 449.453 256.863 451.426 256.863H460.449ZM461.943 276.492V283.729H465.049V276.17L464.023 273.475L460.684 272.273L463.906 270.721L464.814 268.084V264.832L464.463 262.371L462.529 259.91L459.6 259.5H448.672V283.729H451.807V273.973H459.424L461.504 274.91L461.943 276.492ZM459.424 262.605L461.504 263.514L461.709 265.213V268.318L461.27 269.93L459.424 270.838H451.807V262.605H459.424ZM495.137 256.863C497.109 256.863 498.896 257.156 500.498 257.742C502.1 258.328 503.457 259.129 504.57 260.145C505.703 261.16 506.572 262.352 507.178 263.719C507.783 265.066 508.086 266.502 508.086 268.025V285.838C508.086 287.361 507.783 288.807 507.178 290.174C506.572 291.521 505.703 292.703 504.57 293.719C503.457 294.734 502.1 295.535 500.498 296.121C498.896 296.707 497.109 297 495.137 297H486.113C484.141 297 482.354 296.707 480.752 296.121C479.15 295.535 477.783 294.734 476.65 293.719C475.537 292.703 474.678 291.521 474.072 290.174C473.467 288.807 473.164 287.361 473.164 285.838V268.025C473.164 266.502 473.467 265.066 474.072 263.719C474.678 262.352 475.537 261.16 476.65 260.145C477.783 259.129 479.15 258.328 480.752 257.742C482.354 257.156 484.141 256.863 486.113 256.863H495.137ZM501.172 264.246L500.762 261.785L498.916 259.91L495.898 259.5H488.047L485.059 259.91L483.184 261.785L482.832 264.246V279.012L483.184 281.531L485.117 283.377L488.047 283.729H495.898L498.916 283.377L500.762 281.531L501.172 279.012V264.246ZM497.656 280.33L495.723 280.623H488.223L486.318 280.33L485.879 278.572V264.539L486.172 262.928L488.223 262.605H495.723L497.773 262.928L498.066 264.656V278.689L497.656 280.33ZM529.824 256.863C531.797 256.863 533.584 257.156 535.186 257.742C536.787 258.328 538.145 259.129 539.258 260.145C540.391 261.16 541.26 262.352 541.865 263.719C542.471 265.066 542.773 266.502 542.773 268.025V285.838C542.773 287.361 542.471 288.807 541.865 290.174C541.26 291.521 540.391 292.703 539.258 293.719C538.145 294.734 536.787 295.535 535.186 296.121C533.584 296.707 531.797 297 529.824 297H520.801C518.828 297 517.041 296.707 515.439 296.121C513.838 295.535 512.471 294.734 511.338 293.719C510.225 292.703 509.365 291.521 508.76 290.174C508.154 288.807 507.852 287.361 507.852 285.838V268.025C507.852 266.502 508.154 265.066 508.76 263.719C509.365 262.352 510.225 261.16 511.338 260.145C512.471 259.129 513.838 258.328 515.439 257.742C517.041 257.156 518.828 256.863 520.801 256.863H529.824ZM527.949 259.5V278.514L527.539 280.271L525.605 280.623H521.24V283.729H525.781L528.74 283.318L531.025 281.531V259.5H527.949ZM564.512 256.863C566.484 256.863 568.271 257.156 569.873 257.742C571.475 258.328 572.832 259.129 573.945 260.145C575.078 261.16 575.947 262.352 576.553 263.719C577.158 265.066 577.461 266.502 577.461 268.025V285.838C577.461 287.361 577.158 288.807 576.553 290.174C575.947 291.521 575.078 292.703 573.945 293.719C572.832 294.734 571.475 295.535 569.873 296.121C568.271 296.707 566.484 297 564.512 297H555.488C553.516 297 551.729 296.707 550.127 296.121C548.525 295.535 547.158 294.734 546.025 293.719C544.912 292.703 544.053 291.521 543.447 290.174C542.842 288.807 542.539 287.361 542.539 285.838V268.025C542.539 266.502 542.842 265.066 543.447 263.719C544.053 262.352 544.912 261.16 546.025 260.145C547.158 259.129 548.525 258.328 550.127 257.742C551.729 257.156 553.516 256.863 555.488 256.863H564.512ZM568.35 264.188L567.91 261.727L566.064 259.852L563.105 259.5H556.748L553.818 259.852L551.973 261.727L551.533 264.188V278.104L551.973 280.564L553.818 282.41L556.748 282.791H564.131L567.559 282.352L566.826 279.188L564.072 279.656H556.953L555.078 279.363L554.668 277.605V271.57H568.35V264.188ZM554.668 268.494V264.539L554.902 262.869L556.953 262.547H562.93L564.922 262.869L565.215 264.598V268.494H554.668ZM598.818 259.5H591.758L588.74 259.852L586.895 261.727L586.455 264.188V279.07L586.895 281.531L588.799 283.377L591.758 283.729H598.818L602.246 283.318L601.514 280.154L598.76 280.623H591.934L590 280.33L589.59 278.572V264.48L589.883 262.869L591.934 262.547H598.643L601.66 263.045L602.246 259.91L598.818 259.5ZM599.199 256.863C601.172 256.863 602.959 257.156 604.561 257.742C606.162 258.328 607.52 259.129 608.633 260.145C609.766 261.16 610.635 262.352 611.24 263.719C611.846 265.066 612.148 266.502 612.148 268.025V285.838C612.148 287.361 611.846 288.807 611.24 290.174C610.635 291.521 609.766 292.703 608.633 293.719C607.52 294.734 606.162 295.535 604.561 296.121C602.959 296.707 601.172 297 599.199 297H590.176C588.203 297 586.416 296.707 584.814 296.121C583.213 295.535 581.846 294.734 580.713 293.719C579.6 292.703 578.74 291.521 578.135 290.174C577.529 288.807 577.227 287.361 577.227 285.838V268.025C577.227 266.502 577.529 265.066 578.135 263.719C578.74 262.352 579.6 261.16 580.713 260.145C581.846 259.129 583.213 258.328 584.814 257.742C586.416 257.156 588.203 256.863 590.176 256.863H599.199ZM639.453 259.5H622.52V262.605H629.434V283.729H632.568V262.605H639.453V259.5ZM633.887 256.863C635.859 256.863 637.646 257.156 639.248 257.742C640.85 258.328 642.207 259.129 643.32 260.145C644.453 261.16 645.322 262.352 645.928 263.719C646.533 265.066 646.836 266.502 646.836 268.025V285.838C646.836 287.361 646.533 288.807 645.928 290.174C645.322 291.521 644.453 292.703 643.32 293.719C642.207 294.734 640.85 295.535 639.248 296.121C637.646 296.707 635.859 297 633.887 297H624.863C622.891 297 621.104 296.707 619.502 296.121C617.9 295.535 616.533 294.734 615.4 293.719C614.287 292.703 613.428 291.521 612.822 290.174C612.217 288.807 611.914 287.361 611.914 285.838V268.025C611.914 266.502 612.217 265.066 612.822 263.719C613.428 262.352 614.287 261.16 615.4 260.145C616.533 259.129 617.9 258.328 619.502 257.742C621.104 257.156 622.891 256.863 624.863 256.863H633.887ZM668.574 256.863C670.547 256.863 672.334 257.156 673.936 257.742C675.537 258.328 676.895 259.129 678.008 260.145C679.141 261.16 680.01 262.352 680.615 263.719C681.221 265.066 681.523 266.502 681.523 268.025V285.838C681.523 287.361 681.221 288.807 680.615 290.174C680.01 291.521 679.141 292.703 678.008 293.719C676.895 294.734 675.537 295.535 673.936 296.121C672.334 296.707 670.547 297 668.574 297H659.551C657.578 297 655.791 296.707 654.189 296.121C652.588 295.535 651.221 294.734 650.088 293.719C648.975 292.703 648.115 291.521 647.51 290.174C646.904 288.807 646.602 287.361 646.602 285.838V268.025C646.602 266.502 646.904 265.066 647.51 263.719C648.115 262.352 648.975 261.16 650.088 260.145C651.221 259.129 652.588 258.328 654.189 257.742C655.791 257.156 657.578 256.863 659.551 256.863H668.574ZM674.082 274.559L673.672 272.039L671.797 270.193L668.75 269.871H662.188L660.4 269.52C660.303 269.188 660.234 268.895 660.195 268.641C660.156 268.367 660.088 268.084 659.99 267.791V264.715L660.4 262.986L662.334 262.605H669.775L672.529 263.162L673.232 259.969L669.834 259.5H662.129L659.199 259.91L657.295 261.785L656.914 264.246V268.26L657.295 270.721L659.199 272.566L662.129 272.947H668.75L670.537 273.24C670.596 273.533 670.664 273.807 670.742 274.061C670.82 274.314 670.889 274.578 670.947 274.852V278.689C670.908 278.943 670.84 279.217 670.742 279.51C670.664 279.803 670.596 280.076 670.537 280.33L668.633 280.623H661.367L658.496 280.154L657.764 283.318L661.191 283.729H668.809L671.797 283.377L673.672 281.531L674.082 279.012V274.559Z"
          // fill="black"
          className="fill-foreground"
        />
        <path
          d="M419.355 68.8984L442.207 41.0195H299.156V-0.113281H532.09L398.789 167.312L375.023 196.867H524.625V238H287.426L419.355 68.8984Z"
          fill="#FF007A"
        />
        <path
          d="M521.625 124.375L484.062 76.3125H508.312L534.25 109.938L560.312 76.3125H584.188L545.938 124.188L585.5 174H561.188L533.375 138.875L504.938 174H481L521.625 124.375ZM629.812 93.6875H593.75V76.3125H685.688V93.6875H649.625V174H629.812V93.6875Z"
          fill="#FF007A"
        />
        <path
          d="M-0.125 76.3125H51.375C58.875 76.3125 65.375 77.125 70.875 78.75C76.375 80.375 80.9375 82.7292 84.5625 85.8125C88.1875 88.8542 90.875 92.5833 92.625 97C94.4167 101.417 95.3125 106.396 95.3125 111.938C95.3125 117.146 94.4375 121.958 92.6875 126.375C90.9375 130.792 88.25 134.625 84.625 137.875C81.0417 141.083 76.5 143.604 71 145.438C65.5 147.229 59 148.125 51.5 148.125L19.6875 148.062V174H-0.125V76.3125ZM51.875 130.938C55.625 130.938 58.8958 130.5 61.6875 129.625C64.5208 128.708 66.875 127.438 68.75 125.812C70.6667 124.146 72.0833 122.146 73 119.812C73.9583 117.438 74.4375 114.812 74.4375 111.938C74.4375 106.146 72.5417 101.646 68.75 98.4375C65 95.1875 59.375 93.5625 51.875 93.5625H19.6875V130.938H51.875ZM117 76.3125H166.688C174.188 76.3125 180.688 77.1042 186.188 78.6875C191.688 80.2292 196.25 82.4792 199.875 85.4375C203.5 88.3958 206.188 92 207.938 96.25C209.729 100.5 210.625 105.312 210.625 110.688C210.625 114.312 210.188 117.771 209.312 121.062C208.438 124.312 207.083 127.312 205.25 130.062C203.458 132.812 201.188 135.271 198.438 137.438C195.688 139.562 192.458 141.333 188.75 142.75L210 174H185.75L167.375 146.25H166.812L136.812 146.188V174H117V76.3125ZM167.188 129.062C170.938 129.062 174.208 128.625 177 127.75C179.833 126.875 182.188 125.646 184.062 124.062C185.979 122.479 187.396 120.562 188.312 118.312C189.271 116.021 189.75 113.479 189.75 110.688C189.75 105.229 187.875 101.021 184.125 98.0625C180.375 95.0625 174.729 93.5625 167.188 93.5625H136.812V129.062H167.188ZM228.375 124.875C228.375 117.5 229.729 110.75 232.438 104.625C235.146 98.5 238.938 93.25 243.812 88.875C248.729 84.4583 254.604 81.0417 261.438 78.625C268.312 76.2083 275.917 75 284.25 75C292.542 75 300.125 76.2083 307 78.625C313.875 81.0417 319.75 84.4583 324.625 88.875C329.542 93.25 333.354 98.5 336.062 104.625C338.771 110.75 340.125 117.5 340.125 124.875C340.125 132.292 338.771 139.104 336.062 145.312C333.354 151.479 329.542 156.792 324.625 161.25C319.75 165.708 313.875 169.188 307 171.688C300.125 174.146 292.542 175.375 284.25 175.375C275.917 175.375 268.312 174.146 261.438 171.688C254.604 169.188 248.729 165.708 243.812 161.25C238.938 156.792 235.146 151.479 232.438 145.312C229.729 139.104 228.375 132.292 228.375 124.875ZM248.188 124.875C248.188 129.917 249.083 134.458 250.875 138.5C252.708 142.542 255.229 146 258.438 148.875C261.688 151.708 265.5 153.896 269.875 155.438C274.292 156.979 279.083 157.75 284.25 157.75C289.417 157.75 294.188 156.979 298.562 155.438C302.979 153.896 306.792 151.708 310 148.875C313.208 146 315.729 142.542 317.562 138.5C319.396 134.458 320.312 129.917 320.312 124.875C320.312 119.833 319.396 115.312 317.562 111.312C315.729 107.312 313.208 103.938 310 101.188C306.792 98.3958 302.979 96.2708 298.562 94.8125C294.188 93.3542 289.417 92.625 284.25 92.625C279.083 92.625 274.292 93.3542 269.875 94.8125C265.5 96.2708 261.688 98.3958 258.438 101.188C255.229 103.938 252.708 107.312 250.875 111.312C249.083 115.312 248.188 119.833 248.188 124.875Z"
          fill="#FF007A"
        />
      </g>
    </svg>
  );
}
