import { LinksSection } from "#components/core/links-section";
import { ModulesSection } from "#components/core/modules-section/modules-section";
import { NewsSection } from "#components/core/news-section/news-section";
import { TodoList } from "@/components/core/todos-section/todo-list";

export default function Home() {
  return (
    <div className="grow flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <LinksSection />
      <TodoList />
      <ModulesSection />
      <NewsSection />
    </div>
  );
}
