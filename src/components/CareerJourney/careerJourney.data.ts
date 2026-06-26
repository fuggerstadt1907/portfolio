import { Users, Building2, Code2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StationData = {
  id: string;
  icon: LucideIcon;
  year: string;
  yearKey?: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  skillsKeys: string[];
};

export const STATIONS: StationData[] = [
  {
    id: "people",
    icon: Users,
    year: "2012–2018",
    titleKey: "career.stations.people.title",
    subtitleKey: "career.stations.people.subtitle",
    descriptionKey: "career.stations.people.description",
    skillsKeys: [
      "career.stations.people.skills.communication",
      "career.stations.people.skills.responsibility",
      "career.stations.people.skills.decisionMaking",
      "career.stations.people.skills.teamwork",
    ],
  },
  {
    id: "business",
    icon: Building2,
    year: "2018–2021",
    titleKey: "career.stations.business.title",
    subtitleKey: "career.stations.business.subtitle",
    descriptionKey: "career.stations.business.description",
    skillsKeys: [
      "career.stations.business.skills.business",
      "career.stations.business.skills.requirements",
      "career.stations.business.skills.stakeholders",
      "career.stations.business.skills.prioritization",
    ],
  },
  {
    id: "technology",
    icon: Code2,
    year: "2021–2024",
    titleKey: "career.stations.technology.title",
    subtitleKey: "career.stations.technology.subtitle",
    descriptionKey: "career.stations.technology.description",
    skillsKeys: [
      "career.stations.technology.skills.engineering",
      "career.stations.technology.skills.cloud",
      "career.stations.technology.skills.architecture",
      "career.stations.technology.skills.scaling",
    ],
  },
  {
    id: "today",
    icon: Rocket,
    year: "2024–",
    yearKey: "career.stations.today.year",
    titleKey: "career.stations.today.title",
    subtitleKey: "career.stations.today.subtitle",
    descriptionKey: "career.stations.today.description",
    skillsKeys: [
      "career.stations.today.skills.productOwnership",
      "career.stations.today.skills.discovery",
      "career.stations.today.skills.strategy",
      "career.stations.today.skills.delivery",
    ],
  },
];
