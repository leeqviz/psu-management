import { getAuthSession } from "@/utils/auth-session";
import { Divider } from "./divider";
import { Message } from "./message";
import { ModulesList } from "./modules-list";
import { Section } from "./section";

export async function ModulesSection() {
  const user = await getAuthSession();

  return (
    <Section>
      <Divider>{"Доступные модули"}</Divider>
      <Message
        title={`Перечень доступных модулей регулируется выданными Вам ролями`}
      />
      {user ? <ModulesList /> : <Message title={"Вы не авторизованы"} />}
    </Section>
  );
}
