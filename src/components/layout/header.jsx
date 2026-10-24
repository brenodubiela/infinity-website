import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { HeaderShell } from "@/components/layout/header-shell";
import { DesktopNav, DesktopNavView } from "@/components/layout/desktop-nav";
import { MobileMenu, MobileMenuView } from "@/components/layout/mobile-menu";
import { Logo } from "@/components/ui/logo";
import { buttonClasses } from "@/components/ui/button";
import { companyData } from "@/data/legal-texts";
import { megaMenus, navItems } from "@/data/navigation";
import { headerCta } from "@/data/site";

export function Header() {
  const navProps = { items: navItems, menus: megaMenus };
  const mobileProps = { ...navProps, cta: headerCta, email: companyData.emailContato };

  return (
    <HeaderShell>
      <Container className="flex h-10 items-center justify-between gap-3">
        <Link href="/" className="relative z-10 shrink-0 rounded-sm" aria-label="Infinity Engenharia e Perícias, página inicial">
          <Logo variant="horizontal" tone="inherit" className="hidden w-[280px] xl:block" label="" />
          <Logo variant="reduzida" tone="inherit" className="w-[152px] xl:hidden" label="" />
        </Link>

        <Suspense fallback={<DesktopNavView {...navProps} />}>
          <DesktopNav {...navProps} />
        </Suspense>

        <div className="flex items-center gap-1">
          <Link href={headerCta.href} className={buttonClasses({ size: "sm", className: "group/btn hidden sm:inline-flex" })}>
            {headerCta.label}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.75}
              className="size-[18px] transition-transform duration-200 ease-out-expo group-hover/btn:translate-x-0.5"
            />
          </Link>
          <Suspense fallback={<MobileMenuView {...mobileProps} />}>
            <MobileMenu {...mobileProps} />
          </Suspense>
        </div>
      </Container>
    </HeaderShell>
  );
}
