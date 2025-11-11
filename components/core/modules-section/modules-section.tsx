import { Divider } from "#components/core/divider";
import { Message } from "#components/core/message";
import { Section } from "#components/core/section";
import { getAuthUser } from "#utils/cookies";
import { ModulesList } from "./modules-list";

export async function ModulesSection() {
  const user = await getAuthUser();

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
