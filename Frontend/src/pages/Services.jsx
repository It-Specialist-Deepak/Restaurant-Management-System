import React from "react";
import {
  IconCookie,
  IconGauge,
  IconLock,
  IconMessage2,
  IconUser,
} from "@tabler/icons-react";
import { Container, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
 // ✅ Updated file reference

// ✅ Mock data for services
const SERVICES_DATA = [
  {
    icon: IconGauge,
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick. Regice cloaks itself with frigid air of -328 degrees Fahrenheit.",
  },
  {
    icon: IconUser,
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking. Its icy body is so cold, it will not melt even if it is immersed in magma.",
  },
  {
    icon: IconCookie,
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves.",
  },
  {
    icon: IconLock,
    title: "Secure by default",
    description:
      "Although it still can’t fly, its jumping power is outstanding. In Alola, the mushrooms on Paras don’t grow up quite right.",
  },
  {
    icon: IconMessage2,
    title: "24/7 Support",
    description:
      "Rapidash usually can be seen casually cantering in the fields and plains. Skitty is known to chase around after its own tail.",
  },
];

// ✅ Single Service Feature Component
const ServiceFeature = ({ icon: Icon, title, description }) => (
  <div>
    <ThemeIcon variant="light" size={40} radius={40}>
      <Icon size={18} stroke={1.5} />
    </ThemeIcon>
    <Text mt="sm" mb={7} fw={600}>
      {title}
    </Text>
    <Text size="sm" c="dimmed" lh={1.6}>
      {description}
    </Text>
  </div>
);

// ✅ Main Services Component
const Services = () => {
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        Integrate effortlessly with any technology stack
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs.
          This happens when hunger drives it to try biting a Steel-type Pokémon.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 50 }}
        verticalSpacing={{ base: "xl", md: 50 }}
      >
        {SERVICES_DATA.map((service, index) => (
          <ServiceFeature key={index} {...service} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Services;
