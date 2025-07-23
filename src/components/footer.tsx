import Link from "next/link";
import { SiX as XIcon, SiGithub as GithubIcon } from '@icons-pack/react-simple-icons'
import ThemeSwitch from "@/components/theme-switch";
import { GITHUB_REPO_URL, SITE_NAME } from "@/constants";
import { Button } from "./ui/button";
import AgenticDevStudioLogo from "./agenticdev-studio-logo";
import { getGithubStars } from "@/utils/stats";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="border-t dark:bg-muted/30 bg-muted/60 shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-6 md:py-8">
          {/* Responsive grid with better mobile spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {/* Legal Links */}
            <div className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-foreground text-center md:text-left">{t('legal_heading')}</h3>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground text-center md:text-left">
                    {t('terms')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground text-center md:text-left">
                    {t('privacy')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-foreground text-center md:text-left">{t('company_heading')}</h3>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground text-center md:text-left">
                    {t('home')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links and Theme Switch */}
            <div className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-foreground text-center md:text-left">{t('community_heading')}</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/LubomirGeorgiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <GithubIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://x.com/LubomirGeorg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright - Optimized for mobile */}
          <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                {t('all_rights_reserved', { year: new Date().getFullYear(), siteName: SITE_NAME })}
              </p>

              <div className="flex flex-col md:flex-row items-center gap-4 md:space-x-4">
                {GITHUB_REPO_URL && (
                  <Suspense fallback={<GithubButtonFallback />}>
                    <GithubButton />
                  </Suspense>
                )}

                <div className="flex items-center gap-4">
                  <ThemeSwitch />

                  <a
                    href="https://agenticdev.agency"
                    target="_blank"
                    className="flex items-center font-medium text-sm hover:text-foreground transition-colors"
                  >
                    <span className="whitespace-nowrap">{t('created_by')}</span>
                    <AgenticDevStudioLogo className="h-7 w-7 mx-1.5" />
                    <span className="whitespace-nowrap">AgenticDev</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// This component will be wrapped in Suspense
async function GithubButton() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('footer')
  const starsCount = await getGithubStars();

  return (
    <Button variant="outline" size="sm" className="w-full md:w-auto h-9" asChild>
      <a
        href={GITHUB_REPO_URL!}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2"
      >
        <GithubIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">
          {starsCount ? t('fork_on_github_stars', { starsCount }) : t('fork_on_github')}
        </span>
      </a>
    </Button>
  );
}

// Fallback while loading stars count
function GithubButtonFallback() {
  const t = useTranslations('footer')
  return (
    <Button variant="outline" size="sm" className="w-full md:w-auto h-9" asChild>
      <a
        href={GITHUB_REPO_URL!}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2"
      >
        <GithubIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{t('fork_on_github')}</span>
      </a>
    </Button>
  );
}
