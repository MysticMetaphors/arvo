export interface ProjectImage {
  src: string;
  caption: string;
  type?: "image" | "video";
}

export interface Project {
  title: string;
  description: string;
  images: ProjectImage[];
  url: string;
  category: string;
  tooltip: string;
  tooltip_design: "green" | "blue" | "purple" | "red";
  isGray: boolean;
  icons: string[];
}

export interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
}