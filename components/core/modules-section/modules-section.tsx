import { Divider } from "#components/core/divider";
import { Message } from "#components/core/message";
import { Section } from "#components/core/section";
import { ModulesList } from "./modules-list";

export function ModulesSection() {
  return (
    <Section>
      <Divider>{"Доступные модули"}</Divider>
      <Message
        title={`Перечень доступных модулей регулируется выданными Вам ролями`}
      />
      <ModulesList />
    </Section>
  );
}
