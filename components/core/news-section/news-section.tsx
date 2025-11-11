import { Message } from "#components/core/message";
import { Section } from "#components/core/section";

export const NewsSection = () => {
  return (
    <Section>
      <Message
        title={`В настоящий момент, сайт находится в активной разработке`}
        subTitle={
          "По любым вопросам и предложениям обращайтесь в Центр информационных технологий"
        }
      />
    </Section>
  );
};
