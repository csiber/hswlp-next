import {
  CloudIcon,
  BoltIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  CommandLineIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const features = [
  { key: "login_ready", icon: ShieldCheckIcon },
  { key: "database_email", icon: EnvelopeIcon },
  { key: "modern_stack", icon: BoltIcon },
  { key: "clean_ui", icon: SunIcon },
  { key: "edge_deploy", icon: CloudIcon },
  { key: "dev_experience", icon: CommandLineIcon },
  { key: "forms", icon: RocketLaunchIcon },
  { key: "team_ready", icon: UserGroupIcon },
];

export function Features() {
  const t = useTranslations("features");
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            {t("tagline")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.key} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                    aria-hidden="true"
                  />
                  {t(`${feature.key}.name`)}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{t(`${feature.key}.description`)}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
