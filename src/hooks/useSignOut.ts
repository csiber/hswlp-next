import { useSessionStore } from "@/state/session";
import { signOutAction } from "@/actions/sign-out.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
const useSignOut = () => {
  const { clearSession } = useSessionStore();

  const t = useTranslations('toasts')

  const signOut = async () => {
    toast.loading(t('signing_out'))
    await signOutAction();
    clearSession();
    await new Promise((resolve) => setTimeout(resolve, 200));
    toast.dismiss()
    toast.success(t('signed_out'))
  }

  return { signOut }
}

export default useSignOut;
