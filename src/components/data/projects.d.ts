export type Project = {
    title: string;
    description: string;
    link?: string;
    image: string;
    tags: ProjectTag[];
}

export type ProjectTag = {
    name: string;
    class: string;
    icon: any;
}